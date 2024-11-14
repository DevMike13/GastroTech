import { View, Text, TouchableOpacity, ImageBackground, Image, ActivityIndicator } from 'react-native'
import React, { useEffect, useState, useRef, useContext }from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { Menu, Provider } from 'react-native-paper';

import { UserContext } from '../UserContext';
import { auth, firestore } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

import { FONT, SIZES, COLORS } from "../assets/theme/theme";

const Stack = createStackNavigator();

import GuideScreen from '../screens/Guide/GuideScreen';
import LoginScreen from '../screens/Auth/Login/LoginScreen';
import RegisterScreen from '../screens/Auth/Register/RegisterScreen';
import ForgotPasswordScreen from '../screens/Auth/ForgotPassword/ForgotPasswordScreen';
import DashboardScreen from '../screens/Dashboard/User/DashboardScreen';
import AdminDashboardScreen from '../screens/Dashboard/Admin/AdminDashboardScreen';
import DeviceScreen from '../screens/Device/DeviceScreen';
import AboutScreen from '../screens/About/AboutScreen';
import PrivacyPolicyScreen from '../screens/About/PrivacyPolicy/PrivacyPolicyScreen';
import SystemScreen from '../screens/About/System/SystemScreen';
import AccountScreen from '../screens/Account/AccountScreen';
import FAQScreen from '../screens/FAQ/FAQScreen';
import UserReportScreen from '../screens/Reports/User/UserReportScreen';
import LocationsScreen from '../screens/Locations/LocationsScreen';
import RestaurantsScreen from '../screens/Restaurants/RestaurantsScreen';
import SprinklerScreen from '../screens/Sprinkler/SprinklerScreen';
import HistoryScreen from '../screens/History/HistoryScreen';
import AccountSettingScreen from '../screens/AccountSettings/AccountSettingScreen';
import AccountListScreen from '../screens/AccountList/AccountListScreen';
import AdminReportScreen from '../screens/Reports/Admin/AdminReportScreen';
import AdminCazaReportScreen from '../screens/Reports/Admin/Caza/AdminCazaReportScreen';
import AdminLauroReportScreen from '../screens/Reports/Admin/Lauro/AdminLauroReportScreen';
import AdminShalomReportScreen from '../screens/Reports/Admin/Shalom/AdminShalomReportScreen';

const AppNavigator = () => {
    
    const [menuVisible, setMenuVisible] = useState(false);
    const [menuVisibleSprinkler, setMenuVisibleSprinkler] = useState(false);
    const { user, setUser } = useContext(UserContext);
    const [initializing, setInitializing] = useState(true);
    const [userRole, setUserRole] = useState(null);
    const [loading, setLoading] = useState(true);

    const openMenu = () => setMenuVisible(true);
    const closeMenu = () => setMenuVisible(false);

    const openMenuSprinkler = () => setMenuVisibleSprinkler(true);
    const closeMenuSprinkler = () => setMenuVisibleSprinkler(false);

    useEffect(() => {
        const checkStoredUser = async () => {
          try {
            const storedUser = await AsyncStorage.getItem('user');
            console.log('Stored User:', storedUser);  // Check what is stored
            if (storedUser) {
              const parsedUser = JSON.parse(storedUser);
              setUser(parsedUser);
              setUserRole(parsedUser.userType);
            }
          } catch (error) {
            console.error('Error fetching stored user:', error);
          }
          setInitializing(false); // Set initializing to false once data is fetched
        };
    
        checkStoredUser();
    
        const unsubscribe = auth.onAuthStateChanged(async (authUser) => {
          if (authUser) {
            try {
              const userRef = doc(firestore, 'users', authUser.uid);
              const userDoc = await getDoc(userRef);
    
              if (userDoc.exists()) {
                const userData = userDoc.data();
                await AsyncStorage.setItem('user', JSON.stringify({
                  uid: authUser.uid,
                  email: authUser.email,
                  ...userData,
                }));
    
                setUser({
                  uid: authUser.uid,
                  email: authUser.email,
                  ...userData,
                });
    
                setUserRole(userData.userType);
              } else {
                setUser(null);
                setUserRole(null);
              }
            } catch (error) {
              console.error('Error fetching user data:', error);
              setUser(null);
              setUserRole(null);
            }
          } else {
            setUser(null);
            setUserRole(null);
          }
    
          setInitializing(false); // Once auth state change completes, stop initializing
        });
    
        return () => unsubscribe();
      }, []);
    
  

    return (
        <Provider>
            <NavigationContainer>
                <Stack.Navigator>
                    {
                        user && userRole  ? (
                            <>
                                {userRole === 'admin' ? (
                                    <>
                                        <Stack.Screen 
                                            name="AdminDashboard" 
                                            component={AdminDashboardScreen} 
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
                                                )
                                            })}
                                        />
                                        <Stack.Screen 
                                            name="Locations" 
                                            component={LocationsScreen} 
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
                                                            Locations
                                                        </Text>
                                                    </TouchableOpacity>
                                                )
                                            })}
                                        />
                                        <Stack.Screen 
                                            name="Restaurants" 
                                            component={RestaurantsScreen} 
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
                                                            Restaurants
                                                        </Text>
                                                    </TouchableOpacity>
                                                )
                                            })}
                                        />

                                        <Stack.Screen 
                                            name="AdminReports" 
                                            component={AdminReportScreen} 
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
                                        
                                        <Stack.Screen 
                                            name="AdminReportCaza" 
                                            component={AdminCazaReportScreen} 
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
                                                            Caza Plaza Reports
                                                        </Text>
                                                    </TouchableOpacity>
                                                )
                                            })}
                                        />

                                        <Stack.Screen 
                                            name="AdminReportLauro" 
                                            component={AdminLauroReportScreen} 
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
                                                            Don Lauro Reports
                                                        </Text>
                                                    </TouchableOpacity>
                                                )
                                            })}
                                        />

                                        <Stack.Screen 
                                            name="AdminReportShalom" 
                                            component={AdminShalomReportScreen} 
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
                                                            Plaza De Shalom Reports
                                                        </Text>
                                                    </TouchableOpacity>
                                                )
                                            })}
                                        />

                                        <Stack.Screen 
                                            name="History" 
                                            component={HistoryScreen} 
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
                                                            History
                                                        </Text>
                                                    </TouchableOpacity>
                                                )
                                            })}
                                        />

                                        <Stack.Screen 
                                            name="AccountList" 
                                            component={AccountListScreen} 
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
                                                            Accounts
                                                        </Text>
                                                    </TouchableOpacity>
                                                )
                                            })}
                                        />
                                    </>
                                ) : (
                                    <>
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
                                                            // statusBarHeight={75}
                                                            statusBarHeight={25}
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
                                            name="Sprinkler" 
                                            component={SprinklerScreen} 
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
                                                            visible={menuVisibleSprinkler}
                                                            onDismiss={closeMenuSprinkler}
                                                            // statusBarHeight={75}
                                                            statusBarHeight={25}
                                                            anchor={
                                                            <TouchableOpacity onPress={openMenuSprinkler} style={{ paddingHorizontal: 10 }}>
                                                                <Ionicons name="ellipsis-vertical" size={32} color="white" />
                                                            </TouchableOpacity>
                                                            }
                                                        >
                                                            <Menu.Item 
                                                                leadingIcon="access-point-network"
                                                                rippleColor={COLORS.gray4}
                                                                onPress={() => { 
                                                                    closeMenuSprinkler(); 
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
                                                                    closeMenuSprinkler();
                                                                    navigation.navigate('Account'); 
                                                                }} 
                                                                title="Account" 
                                                            />
                                                            <Menu.Item 
                                                                leadingIcon="chart-line"
                                                                rippleColor={COLORS.gray4}
                                                                titleStyle={{ fontFamily: FONT.medium, fontSize: SIZES.medium }}
                                                                onPress={() => { 
                                                                    closeMenuSprinkler(); 
                                                                    navigation.navigate('UserReports');
                                                                }} 
                                                                title="Reports" 
                                                            />
                                                            <Menu.Item 
                                                                leadingIcon="chat-question-outline"
                                                                rippleColor={COLORS.gray4}
                                                                titleStyle={{ fontFamily: FONT.medium, fontSize: SIZES.medium }}
                                                                onPress={() => { 
                                                                    closeMenuSprinkler(); 
                                                                    navigation.navigate('FAQ');
                                                                }} 
                                                                title="FAQ" 
                                                            />
                                                            <Menu.Item 
                                                                leadingIcon="information-outline"
                                                                rippleColor={COLORS.gray4}
                                                                titleStyle={{ fontFamily: FONT.medium, fontSize: SIZES.medium }}
                                                                onPress={() => { 
                                                                    closeMenuSprinkler(); 
                                                                    navigation.navigate('About');
                                                                }} 
                                                                title="About" 
                                                            />
                                                        </Menu>
                                                    </View>
                                                ),
                                            })}
                                        />
                                    </>
                                )}
                                
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
                                <Stack.Screen 
                                    name="AccountSettings" 
                                    component={AccountSettingScreen} 
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
                                                    Account Settings
                                                </Text>
                                            </TouchableOpacity>
                                        )
                                    })}
                                />
                            </>
                        ) : (
                            <>
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
                            </>     
                        )
                    }
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    );
};

export default AppNavigator;