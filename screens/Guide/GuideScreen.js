import { View, Text, SafeAreaView } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState, useContext } from 'react'

import { UserContext } from '../../UserContext';

import styles from './guide.style';

import Stepper from '../../components/Stepper'

const GuideScreen = ({ navigation }) => {
  const { user } = useContext(UserContext);
  console.log(user);
  return (
    <SafeAreaView style={styles.container}>
        <LinearGradient
            colors={['#11774e', '#14b045', '#0c403b']}
            locations={[0, 0.4, 1]}
            style={styles.gradientBackground}
        >
            <Stepper navigation={navigation} />
        </LinearGradient>
    </SafeAreaView>
  )
}

export default GuideScreen