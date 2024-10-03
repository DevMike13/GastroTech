import { View, Text, SafeAreaView, TouchableOpacity, Image, TextInput } from 'react-native'
import {React, useState} from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

import styles from './forgot.style';

const ForgotPasswordScreen = ({ navigation }) => {

    const [email, setEmail] = useState('');

    const handleGoToLogin = () => {
        navigation.navigate('Login')
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
              </View>
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={handleGoToLogin}>
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