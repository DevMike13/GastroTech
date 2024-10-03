import { View, Text, TouchableOpacity, ImageBackground, Image } from 'react-native'
import React, { useEffect, useState, useRef }from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { Menu, Provider } from 'react-native-paper';

import { FONT, SIZES, COLORS } from "../assets/theme/theme";

const Stack = createStackNavigator();

import GuideScreen from '../screens/Guide/GuideScreen';
import LoginScreen from '../screens/Auth/Login/LoginScreen';
import RegisterScreen from '../screens/Auth/Register/RegisterScreen';
import ForgotPasswordScreen from '../screens/Auth/ForgotPassword/ForgotPasswordScreen';
import DashboardScreen from '../screens/Dashboard/User/DashboardScreen';
import DeviceScreen from '../screens/Device/DeviceScreen';
import AboutScreen from '../screens/About/AboutScreen';
import PrivacyPolicyScreen from '../screens/About/PrivacyPolicy/PrivacyPolicyScreen';
import SystemScreen from '../screens/About/System/SystemScreen';
import AccountScreen from '../screens/Account/AccountScreen';
import FAQScreen from '../screens/FAQ/FAQScreen';
import UserReportScreen from '../screens/Reports/User/UserReportScreen';

const AppNavigator = () => {
    
    const [menuVisible, setMenuVisible] = useState(false);

    const openMenu = () => setMenuVisible(true);
    const closeMenu = () => setMenuVisible(false);

    return (
        <Provider>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen 
                        name="Guide" 
                        component={GuideScreen} 
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen 
                        name="Login" 
                        component={LoginScreen} 
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen 
                        name="Register" 
                        component={RegisterScreen} 
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen 
                        name="Forgot" 
                        component={ForgotPasswordScreen} 
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen 
                        name="Dashboard" 
                        component={DashboardScreen} 
                        options={({ navigation }) => ({
                            headerShown: true,
                            headerTitle: '',
                            headerShadowVisible: true,
                            headerStyle: {
                                backgroundColor: '#11774e'
                            },
                            headerLeft: () => (
                                <TouchableOpacity style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 10 }}>
                                    <Image
                                        source={require('../assets/images/fire-dash.png')}
                                        resizeMode='cover'
                                        style={{ width: 50, height: 50 }}
                                    />
                                    <Text style={{ fontFamily: FONT.bold, fontSize: SIZES.large, color: COLORS.white }}>
                                        GastroTech
                                    </Text>
                                </TouchableOpacity>
                            ),
                            headerRight: () => (
                                <View style={{ display: 'flex', flexDirection: 'row' }}>
                                    <TouchableOpacity style={{ paddingHorizontal: 10 }} >
                                        <Ionicons name="notifications" size={32} color="white" />
                                    </TouchableOpacity>
                                
                                    <Menu
                                        visible={menuVisible}
                                        onDismiss={closeMenu}
                                        statusBarHeight={75}
                                        anchor={
                                        <TouchableOpacity onPress={openMenu} style={{ paddingHorizontal: 10 }}>
                                            <Ionicons name="ellipsis-vertical" size={32} color="white" />
                                        </TouchableOpacity>
                                        }
                                    >
                                        <Menu.Item 
                                            leadingIcon="access-point-network"
                                            rippleColor={COLORS.gray4}
                                            onPress={() => { 
                                                closeMenu(); 
                                                navigation.navigate('Device'); 
                                            }} 
                                            titleStyle={{ fontFamily: FONT.medium, fontSize: SIZES.medium }}
                                            title="Device" 
                                        />
                                        <Menu.Item 
                                            leadingIcon="account-outline"
                                            rippleColor={COLORS.gray4}
                                            titleStyle={{ fontFamily: FONT.medium, fontSize: SIZES.medium }}
                                            onPress={() => { 
                                                closeMenu();
                                                navigation.navigate('Account'); 
                                             }} 
                                            title="Account" 
                                        />
                                        <Menu.Item 
                                            leadingIcon="chart-line"
                                            rippleColor={COLORS.gray4}
                                            titleStyle={{ fontFamily: FONT.medium, fontSize: SIZES.medium }}
                                            onPress={() => { 
                                                closeMenu(); 
                                                navigation.navigate('UserReports');
                                            }} 
                                            title="Reports" 
                                        />
                                        <Menu.Item 
                                            leadingIcon="chat-question-outline"
                                            rippleColor={COLORS.gray4}
                                            titleStyle={{ fontFamily: FONT.medium, fontSize: SIZES.medium }}
                                            onPress={() => { 
                                                closeMenu(); 
                                                navigation.navigate('FAQ');
                                            }} 
                                            title="FAQ" 
                                        />
                                        <Menu.Item 
                                            leadingIcon="information-outline"
                                            rippleColor={COLORS.gray4}
                                            titleStyle={{ fontFamily: FONT.medium, fontSize: SIZES.medium }}
                                            onPress={() => { 
                                                closeMenu(); 
                                                navigation.navigate('About');
                                            }} 
                                            title="About" 
                                        />
                                    </Menu>
                                </View>
                            ),
                        })}
                    />
                    <Stack.Screen 
                        name="Device" 
                        component={DeviceScreen} 
                        options={({ navigation }) => ({
                            headerShown: true,
                            headerTitle: '',
                            headerShadowVisible: true,
                            headerStyle: {
                                backgroundColor: '#11774e'
                            },
                            headerLeft: () => (
                                <TouchableOpacity style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 10, gap: SIZES.small }} onPress={() => navigation.goBack()}>
                                    <Ionicons name="arrow-back-outline" size={32} color="white" />
                                    <Text style={{ fontFamily: FONT.bold, fontSize: SIZES.large, color: COLORS.white }}>
                                        GastroTech
                                    </Text>
                                </TouchableOpacity>
                            )
                        })}
                    />
                    <Stack.Screen 
                        name="About" 
                        component={AboutScreen} 
                        options={({ navigation }) => ({
                            headerShown: true,
                            headerTitle: '',
                            headerShadowVisible: true,
                            headerStyle: {
                                backgroundColor: '#11774e'
                            },
                            headerLeft: () => (
                                <TouchableOpacity style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 10, gap: SIZES.small }} onPress={() => navigation.goBack()}>
                                    <Ionicons name="arrow-back-outline" size={32} color="white" />
                                    <Text style={{ fontFamily: FONT.bold, fontSize: SIZES.large, color: COLORS.white }}>
                                        About
                                    </Text>
                                </TouchableOpacity>
                            )
                        })}
                    />
                    <Stack.Screen 
                        name="PrivacyPolicy" 
                        component={PrivacyPolicyScreen} 
                        options={({ navigation }) => ({
                            headerShown: true,
                            headerTitle: '',
                            headerShadowVisible: true,
                            headerStyle: {
                                backgroundColor: '#11774e'
                            },
                            headerLeft: () => (
                                <TouchableOpacity style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 10, gap: SIZES.small }} onPress={() => navigation.goBack()}>
                                    <Ionicons name="arrow-back-outline" size={32} color="white" />
                                    <Text style={{ fontFamily: FONT.bold, fontSize: SIZES.large, color: COLORS.white }}>
                                        Privacy Policy
                                    </Text>
                                </TouchableOpacity>
                            )
                        })}
                    />
                    <Stack.Screen 
                        name="System" 
                        component={SystemScreen} 
                        options={({ navigation }) => ({
                            headerShown: true,
                            headerTitle: '',
                            headerShadowVisible: true,
                            headerStyle: {
                                backgroundColor: '#11774e'
                            },
                            headerLeft: () => (
                                <TouchableOpacity style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 10, gap: SIZES.small }} onPress={() => navigation.goBack()}>
                                    <Ionicons name="arrow-back-outline" size={32} color="white" />
                                    <Text style={{ fontFamily: FONT.bold, fontSize: SIZES.large, color: COLORS.white }}>
                                        System Information
                                    </Text>
                                </TouchableOpacity>
                            )
                        })}
                    />
                    <Stack.Screen 
                        name="Account" 
                        component={AccountScreen} 
                        options={({ navigation }) => ({
                            headerShown: true,
                            headerTitle: '',
                            headerShadowVisible: true,
                            headerStyle: {
                                backgroundColor: '#11774e'
                            },
                            headerLeft: () => (
                                <TouchableOpacity style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 10, gap: SIZES.small }} onPress={() => navigation.goBack()}>
                                    <Ionicons name="arrow-back-outline" size={32} color="white" />
                                    <Text style={{ fontFamily: FONT.bold, fontSize: SIZES.large, color: COLORS.white }}>
                                        Account
                                    </Text>
                                </TouchableOpacity>
                            )
                        })}
                    />
                    <Stack.Screen 
                        name="FAQ" 
                        component={FAQScreen} 
                        options={({ navigation }) => ({
                            headerShown: true,
                            headerTitle: '',
                            headerShadowVisible: true,
                            headerStyle: {
                                backgroundColor: '#11774e'
                            },
                            headerLeft: () => (
                                <TouchableOpacity style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 10, gap: SIZES.small }} onPress={() => navigation.goBack()}>
                                    <Ionicons name="arrow-back-outline" size={32} color="white" />
                                    <Text style={{ fontFamily: FONT.bold, fontSize: SIZES.large, color: COLORS.white }}>
                                        FAQ
                                    </Text>
                                </TouchableOpacity>
                            )
                        })}
                    />
                    <Stack.Screen 
                        name="UserReports" 
                        component={UserReportScreen} 
                        options={({ navigation }) => ({
                            headerShown: true,
                            headerTitle: '',
                            headerShadowVisible: true,
                            headerStyle: {
                                backgroundColor: '#11774e'
                            },
                            headerLeft: () => (
                                <TouchableOpacity style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 10, gap: SIZES.small }} onPress={() => navigation.goBack()}>
                                    <Ionicons name="arrow-back-outline" size={32} color="white" />
                                    <Text style={{ fontFamily: FONT.bold, fontSize: SIZES.large, color: COLORS.white }}>
                                        Reports
                                    </Text>
                                </TouchableOpacity>
                            )
                        })}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    );
};

export default AppNavigator;