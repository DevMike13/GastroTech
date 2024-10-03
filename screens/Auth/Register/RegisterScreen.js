import { View, Text, SafeAreaView, TouchableOpacity, Image, TextInput, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import React, { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';

import { auth, firestore } from '../../../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

import styles from './register.style';

const RegisterScreen = ({ navigation }) => {
    const [fullName, setFullName] = useState('');
    const [restaurantName, setRestaurantName] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [mobileNo, setMobileNo] = useState('');
    const [password, setPassword] = useState('');

    const handleGoToLogin = () => {
        navigation.navigate('Login');
    };

    const handleSignUp = async () => {
        try {
           
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            await setDoc(doc(firestore, 'users', user.uid), {
                fullName,
                restaurantName,
                address,
                email,
                mobileNo,
                userType: 'user'
            });

            console.log('User registered successfully:', user);
            Toast.show({
                type: 'success',
                text1: 'Success',
                text2: 'User registered successfully',
                visibilityTime: 3000,
            });
            // Optionally navigate to the home screen or another screen after registration
            // navigation.navigate('Home'); // Uncomment if needed
        } catch (error) {
            setError(error.message); // Handle errors
            console.error('Error during sign up:', error.message);
        }
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
                                            value={fullName}
                                            onChangeText={setFullName}
                                            placeholderTextColor="white"
                                        />
                                    </View>
                                </View>
                                <View style={styles.inputContainer}>
                                    <View style={styles.inputWrapper}>
                                        <TextInput
                                            style={styles.inInput}
                                            placeholder='Restaurant Name'
                                            value={restaurantName}
                                            onChangeText={setRestaurantName}
                                            placeholderTextColor="white"
                                        />
                                    </View>
                                </View>
                                <View style={styles.inputContainer}>
                                    <View style={styles.inputWrapper}>
                                        <TextInput
                                            style={styles.inInput}
                                            placeholder='Address'
                                            value={address}
                                            onChangeText={setAddress}
                                            placeholderTextColor="white"
                                        />
                                    </View>
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
                                <View style={styles.inputContainer}>
                                    <View style={styles.inputWrapper}>
                                        <TextInput
                                            style={styles.inInput}
                                            placeholder='Mobile No.'
                                            value={mobileNo}
                                            onChangeText={setMobileNo}
                                            keyboardType="phone-pad"
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
                            <View style={styles.buttonContainer}>
                                <TouchableOpacity style={styles.button} onPress={handleSignUp}>
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
            <Toast position="top"/>
        </SafeAreaView>
    );
};

export default RegisterScreen;
