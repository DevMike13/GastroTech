import React, { useEffect, useState, useRef }from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

import GuideScreen from '../screens/Guide/GuideScreen';
import LoginScreen from '../screens/Auth/Login/LoginScreen';

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
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;