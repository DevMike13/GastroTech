import { View, Text, SafeAreaView, TouchableOpacity, Image, TextInput } from 'react-native'
import {React, useState} from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

import styles from './register.style';

const RegisterScreen = () => {
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
            <View style={styles.inputContainer}>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.inInput}
                  placeholder='Email'
                //   value={email}
                //   onChangeText={setEmail}
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
                //   value={password}
                //   onChangeText={setPassword}
                  secureTextEntry={true}
                  placeholderTextColor="white"
                />
              </View>
            </View>
          </View>
          <View style={styles.forgotContainer}>
            <TouchableOpacity style={styles.forgotButtonWrapper}>
              <Text style={styles.forgotText}>
                Forgot Password?
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>
              Don't have an account?
            </Text>
            <TouchableOpacity>
              <Text style={styles.signupButtonText}>
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  )
}

export default RegisterScreen