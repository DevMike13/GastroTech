import { View, Text, SafeAreaView, TouchableOpacity, Image, TextInput } from 'react-native'
import {React, useState} from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

import styles from './dashboard.style';

const DashboardScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#11774e', '#14b045', '#0c403b']}
        locations={[0, 0.4, 1]}
        style={styles.gradientBackground}
      >
        <View style={styles.navigationButtonContainer}>
            <TouchableOpacity style={styles.navigationButton}>
                <Image
                    source={require('../../../assets/images/smoke.png')}
                    resizeMode='contain'
                    style={styles.buttonIcon}
                />
               <View style={styles.buttonTextContainer}>
                    <Text style={styles.buttonTitleText}>
                        Smoke
                    </Text>
                    <Text style={styles.buttonStatusText}>
                        No Detection
                    </Text>
               </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.navigationButton}>
                <Image
                    source={require('../../../assets/images/co2.png')}
                    resizeMode='contain'
                    style={styles.buttonIcon}
                />
               <View style={styles.buttonTextContainer}>
                    <Text style={styles.buttonTitleText}>
                        Gas Level
                    </Text>
                    <Text style={styles.buttonStatusText}>
                        10%
                    </Text>
                    <Text style={styles.buttonStatusText}>
                        Normal
                    </Text>
               </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.navigationButton}>
                <Image
                    source={require('../../../assets/images/temperature.png')}
                    resizeMode='contain'
                    style={styles.buttonIcon}
                />
               <View style={styles.buttonTextContainer}>
                    <Text style={styles.buttonTitleText}>
                        Temperature
                    </Text>
                    <Text style={styles.buttonStatusText}>
                        17°C
                    </Text>
                    <Text style={styles.buttonStatusText}>
                        Normal
                    </Text>
               </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.navigationButton}>
                <Image
                    source={require('../../../assets/images/fire.png')}
                    resizeMode='contain'
                    style={styles.buttonIcon}
                />
               <View style={styles.buttonTextContainer}>
                    <Text style={styles.buttonTitleText}>
                        Fire
                    </Text>
                    <Text style={styles.buttonStatusText}>
                        No Detection
                    </Text>
               </View>
            </TouchableOpacity>
        </View>
        <View style={styles.modelContainer}>
            <Image
                source={require('../../../assets/images/model.png')}
                resizeMode='contain'
                style={styles.modelImage}
            />
        </View>
      </LinearGradient>
    </SafeAreaView>
  )
}

export default DashboardScreen