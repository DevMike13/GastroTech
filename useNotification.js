import { useState, useRef, useEffect } from "react";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { firebase } from './firebase';
import Constants from "expo-constants";
import { Platform } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const usePushNotification = () => {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldPlaySound: true,
      shouldShowAlert: true,
      shouldSetBadge: false,
    }),
  });

  // Initialize expoPushToken and notification using useState
  const [expoPushToken, setExpoPushToken] = useState(undefined);
  const [notification, setNotification] = useState(undefined);

  const notificationListener = useRef();
  const responseListener = useRef();

  async function registerForPushNotificationsAsync() {
    let token;
    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification");
        return;
      }

      token = await Notifications.getExpoPushTokenAsync({
        projectId: Constants.expoConfig.extra.eas.projectId,
      });
    } else {
      alert("Must be using a physical device for Push notifications");
    }

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    // Set the expoPushToken using the setter function
    setExpoPushToken(token);

    return token;
  }
  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => {
      // Set the expoPushToken using the setter function
      setExpoPushToken(token);
    });

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        // Set the notification using the setter function
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );

      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  // Function to store the device token in Firestore along with restaurantName
  // Function to store or update the device token in Firestore along with restaurantName
const storeDeviceTokenInFirestore = async (token, restaurantName) => {
    try {
      const db = firebase.firestore();
      const deviceTokensRef = db.collection('deviceTokens');
  
      // Convert the token to a string before storing it in AsyncStorage
      const tokenString = token.data;
  
      // Always store the token in AsyncStorage
      await AsyncStorage.setItem('expoPushToken', tokenString);
  
      // Check if the token already exists in Firestore
      const querySnapshot = await deviceTokensRef.where('token.data', '==', tokenString).get();
  
      if (querySnapshot.empty) {
        // The token is not found in Firestore, store it
        await deviceTokensRef.add({
          token: token,
          restaurantName: restaurantName, // Store the restaurantName along with the token
        });
  
        console.log('Device Token stored in Firestore:', tokenString);
      } else {
        // If the token already exists, update the restaurantName
        querySnapshot.forEach(async (doc) => {
          await doc.ref.update({
            restaurantName: restaurantName, // Update the restaurantName field
          });
        });
  
        console.log('Device Token already exists. Updated restaurantName:', tokenString);
      }
    } catch (error) {
      console.error('Error storing or updating device token in Firestore:', error);
    }
  };
  

  // Function to trigger push notification registration and storage
  const registerAndStorePushToken = async (restaurantName) => {
    const token = await registerForPushNotificationsAsync();
    if (token) {
      setExpoPushToken(token);
      storeDeviceTokenInFirestore(token, restaurantName);
    }
  };


  return {
    expoPushToken,
    notification,
    registerAndStorePushToken, // Expose the function to be used elsewhere
  };
};
