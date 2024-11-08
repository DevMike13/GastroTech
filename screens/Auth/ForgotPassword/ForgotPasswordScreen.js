import { View, Text, SafeAreaView, TouchableOpacity, Image, TextInput } from 'react-native'
import {React, useState} from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';

import { firebase } from '../../../firebase';

import styles from './forgot.style';

const ForgotPasswordScreen = ({ navigation }) => {

    const [email, setEmail] = useState('');

    const handleGoToLogin = () => {
        navigation.navigate('Login')
    };

    const handleResetPassword = async () => {
      try {
        await firebase.auth().sendPasswordResetEmail(email);
        Toast.show({
          type: 'success',
          text1: 'Password Reset Email Sent',
          text2: 'Please check your email to reset your password.',
          visibilityTime: 3000,
        });
        navigation.goBack();
      } catch (error) {
        Toast.show({
          type: 'error',
          text1: 'Password Reset Failed',
          text2: 'An error occurred while sending the reset email.',
          visibilityTime: 3000,
        });
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
              source={require('../../../assets/images/logo.png')}
              resizeMode='contain'
              style={styles.logoImage}
            />
            <View style={styles.textContainer}>
                <Text style={styles.titleText}>Forgot your password?</Text>
                <Text style={styles.subTitleText}>Please, enter your email address below to receive your user and a new password.</Text>
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
                  <Ionicons name="at-outline" size={28} color="white" />
                </View>
              </View>
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
              <Text style={styles.buttonText}>Reset Password</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonCancel} onPress={handleGoToLogin}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  )
}

export default ForgotPasswordScreen