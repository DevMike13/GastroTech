import { View, Text, SafeAreaView, Image, TouchableOpacity } from 'react-native'
import React, { useState, useContext } from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

import { UserContext } from '../../UserContext';
import styles from './account.style';

import { auth } from '../../firebase';

const AccountScreen = ({ navigation }) => {

  const { user, setUser } = useContext(UserContext);
  console.log(user);

  const handleLogout = async () => {
    try {
      await auth.signOut(); 
      setUser(null);
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    } catch (error) {
      console.error('Error logging out: ', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.logoContainer}>
          <Image
            source={require('../../assets/images/fire.png')}
            resizeMode='contain'
            style={styles.logoImage}
          />
          <Text style={styles.logoText}>GastroTech</Text>
        </View>
        <View style={styles.accountContainer}>
            <Text style={styles.usernameText}>Hello, {user?.fullName}!</Text>
            <Text style={styles.userEmailText}>{user?.email}</Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button}>
                    <Ionicons name="settings-outline" size={30} color="black" />
                    <Text style={styles.buttonText}>Account Settings</Text>
                </TouchableOpacity>
                {
                  user?.userType == 'admin' ? (
                    <TouchableOpacity style={styles.button}>
                      <Ionicons name="people-outline" size={30} color="black" />
                      <Text style={styles.buttonText}>Account List</Text>
                    </TouchableOpacity>
                  ) : (
                    <></>
                  )
                }
                <TouchableOpacity style={styles.button} onPress={handleLogout}>
                    <Ionicons name="log-out-outline" size={30} color="black" />
                    <Text style={styles.buttonText}>Logout</Text>
                </TouchableOpacity>
            </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default AccountScreen