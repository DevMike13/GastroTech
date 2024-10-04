import { View, Text, SafeAreaView, TouchableOpacity, Image, TextInput, ActivityIndicator } from 'react-native'
import {React, useState, useContext} from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';

import { UserContext } from '../../../UserContext';
import { auth, firestore } from '../../../firebase';

import styles from './login.style';

const LoginScreen = ({ navigation }) => {

  const { setUser } = useContext(UserContext);

  const [isLoading, setIsLoading] = useState();
  const handleGoToForgot = () => {
    navigation.navigate('Forgot')
  };

  const handleGoToRegistration = () => {
    navigation.navigate('Register')
  };

  const handleGoToDashboard = () => {
    navigation.navigate('Dashboard')
  };  
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      const userCredential = await auth.signInWithEmailAndPassword(email, password);
      const user = userCredential.user;

      const userDoc = await firestore.collection('users').doc(user.uid).get();
      if (userDoc.exists) {
        const userData = userDoc.data();
        console.log('User data:', userData);
        setUser(userData);
        setIsLoading(false);
      } else {
          console.log('No user data found!');
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
            <Image
              source={require('../../../assets/images/login-text.png')}
              resizeMode='contain'
            />
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
              </View>
            </View>
            <View style={styles.inputContainer}>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.inInput}
                  placeholder='Password'
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={true}
                  placeholderTextColor="white"
                />
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
        </View>
      </LinearGradient>
      <Toast position="top"/>
    </SafeAreaView>
  )
}

export default LoginScreen