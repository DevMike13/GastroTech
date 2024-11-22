import { View, Text, SafeAreaView, ActivityIndicator, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState, useEffect, useContext } from 'react';

import { UserContext } from '../../UserContext';

import styles from './guide.style';

import Stepper from '../../components/Stepper';

const GuideScreen = ({ navigation }) => {
  const { user } = useContext(UserContext);
  
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Image
          source={require('../../assets/images/logo.png')}
          resizeMode='contain'
          style={{ width: 200 }}
        />
      </SafeAreaView>
    );
  }

  // After the delay, render the actual content
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
  );
};

export default GuideScreen;
