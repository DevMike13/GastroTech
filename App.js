import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import AppNavigator from './navigation/AppNavigator';
import React, { useState, useContext, useEffect } from 'react'
import { useFonts } from 'expo-font';
import * as Notifications from 'expo-notifications';

import { UserProvider } from './UserContext';
import { usePushNotification } from "./useNotification";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
  }),
});

const App = () => {

  useEffect(() => {
    // Request permissions for notifications
    const registerForPushNotificationsAsync = async () => {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== 'granted') {
        console.log('Permission to receive push notifications denied.');
        return;
      }
    };

    registerForPushNotificationsAsync();
  }, []);

  const { expoPushToken } = usePushNotification();

  useEffect(() => {
    const notificationListener = Notifications.addNotificationResponseReceivedListener((response) => {
      const temperatureValue = response.notification.request.content.data.temperature;
      // Handle the temperature value here when the app is launched from a push notification.
      console.log(`Received push notification with temperature: ${temperatureValue}`);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
    };
  }, []);

  const [loaded] = useFonts({
    "DMBold": require('./assets/fonts/DMSans-Bold.ttf'),
    "DMMedium": require('./assets/fonts/DMSans-Medium.ttf'),
    "DMRegular": require('./assets/fonts/DMSans-Regular.ttf'),
  });
  if (!loaded) {
    return null;
  }
  return (
    <UserProvider>
      <AppNavigator />
    </UserProvider>
  );
  
};

export default App;

