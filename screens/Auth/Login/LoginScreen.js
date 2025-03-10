import { View, Text, SafeAreaView, TouchableOpacity, Image, TextInput, ActivityIndicator } from 'react-native'
import {React, useState, useContext, useEffect} from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';
import * as Notifications from "expo-notifications";

import { UserContext } from '../../../UserContext';
import { auth, firestore } from '../../../firebase';
import { usePushNotification } from '../../../useNotification';

import styles from './login.style';

const LoginScreen = ({ navigation }) => {

  const { user, setUser } = useContext(UserContext);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const [isLoading, setIsLoading] = useState();
  const handleGoToForgot = () => {
    navigation.navigate('Forgot')
  };

  const handleGoToRegistration = () => {
    navigation.navigate('Register')
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleGoToAgreement = () => {
    navigation.navigate('Agreement')
  };  

  const handleGoToDashboard = () => {
    navigation.navigate('Dashboard')
  };  


  const { registerAndStorePushToken } = usePushNotification();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      const userCredential = await auth.signInWithEmailAndPassword(email, password);
      const userCre = userCredential.user;

      const userDoc = await firestore.collection('users').doc(userCre.uid).get();
      if (userDoc.exists) {
        const userData = userDoc.data();
        console.log('User data:', userData);

        if (!userData.is_approved) {
          await AsyncStorage.removeItem('user');
          setUser(null);
          
          Toast.show({
              type: 'error',
              text1: 'Account not approved',
              text2: 'Your account is pending approval. Please contact support.',
              visibilityTime: 3000,
          });
          setIsLoading(false); 
          return; 
        } 
        setUser(userData);
        await AsyncStorage.setItem('user', JSON.stringify({ uid: userCre.uid, email: userCre.email, ...userData }));

        registerAndStorePushToken(userData.restaurantName);
        

        setIsLoading(false);
       

      } else {
          console.log('No user data found!');
          Toast.show({
            type: 'error',
            text1: 'Login Failed',
            text2: 'Please check your username and password.',
            visibilityTime: 3000,
          });
          setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      Toast.show({
        type: 'error',
        text1: 'Login Failed',
        text2: 'Please check your username and password.',
        visibilityTime: 3000,
      });
      setIsLoading(false);
    }
  };
  

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#11774e', '#14b045', '#0c403b']}
        locations={[0, 0.4, 1]}
        style={styles.gradientBackground}
      >
        <View style={styles.container}>
          <View style={styles.contentContainer}>
            <View style={{ width: '90%', height: 200, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Image
                source={require('../../../assets/images/logo.png')}
                resizeMode='contain'
                style={{ width: 200}}
              />
            </View>
            
            <View style={styles.inputContainer}>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.inInput}
                  placeholder='Email'
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  textContentType='emailAddress'
                  placeholderTextColor="white"
                />
                <View>
                  <Ionicons name="person-outline" size={28} color="white" />
                </View>
              </View>
            </View>
            <View style={styles.inputContainer}>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.inInput}
                  placeholder='Password'
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!isPasswordVisible}
                  placeholderTextColor="white"
                />
                <TouchableOpacity onPress={togglePasswordVisibility} style={styles.iconContainer}>
                  <Ionicons name={isPasswordVisible ? 'eye-outline' : 'eye-off-outline'} size={28} color="white" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.forgotContainer}>
            <TouchableOpacity style={styles.forgotButtonWrapper} onPress={handleGoToForgot}>
              <Text style={styles.forgotText}>
                Forgot Password?
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
              
              {
                isLoading ? (
                  <ActivityIndicator color="white" size="small" />
                ) : (
                <Text style={styles.buttonText}>Login</Text>
                )
              }
            </TouchableOpacity>
          </View>
          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>
              Don't have an account?
            </Text>
            <TouchableOpacity onPress={handleGoToRegistration}>
              <Text style={styles.signupButtonText}>
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.agreementContainer}>
            <TouchableOpacity onPress={handleGoToAgreement}>
              <Text style={styles.agreementText}>
                Non-disclosure Agreement
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
      <Toast position="top"/>
    </SafeAreaView>
  )
}

export default LoginScreen