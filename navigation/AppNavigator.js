import { View, Text, TouchableOpacity, ImageBackground, Image } from 'react-native'
import React, { useEffect, useState, useRef }from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

import { FONT, SIZES, COLORS } from "../assets/theme/theme";

const Stack = createStackNavigator();

import GuideScreen from '../screens/Guide/GuideScreen';
import LoginScreen from '../screens/Auth/Login/LoginScreen';
import RegisterScreen from '../screens/Auth/Register/RegisterScreen';
import DashboardScreen from '../screens/Dashboard/DashboardScreen';

const AppNavigator = () => {
    
    return (
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
                                <TouchableOpacity style={{ paddingHorizontal: 10 }}>
                                    <Ionicons name="notifications" size={32} color="white" />
                                </TouchableOpacity>
                                <TouchableOpacity style={{ paddingHorizontal: 10 }}>
                                    <Ionicons name="ellipsis-vertical" size={32} color="white" />
                                </TouchableOpacity>
                            </View>
                        ),
                    })}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;