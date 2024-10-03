import { View, Text, SafeAreaView, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

import styles from './account.style';

const AccountScreen = () => {
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
            <Text style={styles.usernameText}>Hello, User!</Text>
            <Text style={styles.userEmailText}>user123@gmail.com</Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button}>
                    <Ionicons name="settings-outline" size={30} color="black" />
                    <Text style={styles.buttonText}>Account Settings</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
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