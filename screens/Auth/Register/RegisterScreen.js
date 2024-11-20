import { View, Text, SafeAreaView, TouchableOpacity, Image, TextInput, KeyboardAvoidingView, ScrollView, Platform, ActivityIndicator } from 'react-native';
import React, { useState, useContext, useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';
import { SelectList } from 'react-native-dropdown-select-list';

import { auth, firestore } from '../../../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

import { UserContext } from '../../../UserContext';
import { usePushNotification } from '../../../useNotification';

import styles from './register.style';
import { COLORS, FONT } from '../../../assets/theme/theme';

const RegisterScreen = ({ navigation }) => {

    const [isLoading, setIsLoading] = useState();
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    const restaurants = [
        {key: '1', value: 'Caza Plaza'},
        {key: '2', value: 'Plaza De Shalom'},
        {key: '3', value: 'Don Lauro Restaurant'},
    ];
    
    const [fullName, setFullName] = useState('');
    const [restaurantName, setRestaurantName] = useState('Caza Plaza');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [mobileNo, setMobileNo] = useState('');
    const [password, setPassword] = useState('');
    const { registerAndStorePushToken } = usePushNotification();

    const { setUser } = useContext(UserContext);

    const handleGoToLogin = () => {
        navigation.navigate('Login');
    };
    
    useEffect(() => {
        setRestaurantName('Caza Plaza');
    }, []);

    const handleSignUp = async () => {
        try {
            setIsLoading(true);
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            console.log('User registered successfully:', user);

            registerAndStorePushToken(restaurantName);

            await setDoc(doc(firestore, 'users', user.uid), {
                fullName,
                restaurantName,
                address,
                email,
                mobileNo,
                userType: 'user'
            });

            await AsyncStorage.setItem('user', JSON.stringify({
                uid: user.uid,
                fullName,
                restaurantName,
                address,
                email,
                mobileNo,
                userType: 'user'
            }));

            setUser({
                uid: user.uid,
                fullName,
                restaurantName,
                address,
                email,
                mobileNo,
                userType: 'user'
            });

           

            Toast.show({
                type: 'success',
                text1: 'Success',
                text2: 'User registered successfully',
                visibilityTime: 3000,
            });
            setIsLoading(false);
            // Optionally navigate to the home screen or another screen after registration
            // navigation.navigate('Home'); // Uncomment if needed
        } catch (error) {
            
            Toast.show({
                type: 'error',
                text1: 'Error Registration',
                text2: error.message,
                visibilityTime: 3000,
            });
            // console.error('Error during sign up:', error.message);
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
                                        <View>
                                            <Ionicons name="person-outline" size={28} color="white" />
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.dropdownInput}>
                                    <SelectList
                                        setSelected={(val) => setRestaurantName(val)}
                                        data={restaurants} 
                                        search={false}
                                        save="value"
                                        placeholder='Ex: Caza Plaza'
                                        defaultOption={{ key: '1', value: 'Caza Plaza' }}
                                        fontFamily={FONT.regular}
                                        inputStyles={{ color: COLORS.white}}
                                        dropdownTextStyles={{ color: COLORS.white}}
                                    />
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
                                        <View>
                                            <Ionicons name="location-outline" size={28} color="white" />
                                        </View>
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
                                        <View>
                                            <Ionicons name="at-outline" size={28} color="white" />
                                        </View>
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
                                        <View>
                                            <Ionicons name="call-outline" size={28} color="white" />
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
                            <View style={styles.buttonContainer}>
                                <TouchableOpacity style={styles.button} onPress={handleSignUp}>
                                    {
                                        isLoading ? (
                                            <ActivityIndicator color="white" size="small" />
                                        ) : (
                                            <Text style={styles.buttonText}>Sign Up</Text>
                                        )
                                    }
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
