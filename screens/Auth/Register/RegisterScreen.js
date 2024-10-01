import { View, Text, SafeAreaView, TouchableOpacity, Image, TextInput, KeyboardAvoidingView, ScrollView, Platform } from 'react-native'
import {React, useState} from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

import styles from './register.style';

const RegisterScreen = ({navigation}) => {

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
        <KeyboardAvoidingView
          behavior={Platform.OS === 'android' ? 'padding' : 'height'}
          style={styles.keyboardAvoid}
        >
            <ScrollView contentContainerStyle={styles.scrollView}>
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
                                placeholder='Full Name'
                                // value={email}
                                // onChangeText={setEmail}
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
                                placeholder='Restaurant Name'
                                // value={email}
                                // onChangeText={setEmail}
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
                                placeholder='Address'
                                // value={email}
                                // onChangeText={setEmail}
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
                                placeholder='Email'
                                // value={email}
                                // onChangeText={setEmail}
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
                                placeholder='Mobile No.'
                                // value={email}
                                // onChangeText={setEmail}
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
                                // value={email}
                                // onChangeText={setEmail}
                                secureTextEntry={true}
                                placeholderTextColor="white"
                                />
                            </View>
                        </View>
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.signupContainer}>
                        <Text style={styles.signupText}>
                            Already have an account?
                        </Text>
                        <TouchableOpacity onPress={handleGoToLogin}>
                        <Text style={styles.signupButtonText}>
                            Login
                        </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
      </LinearGradient>
    </SafeAreaView>
  )
}

export default RegisterScreen