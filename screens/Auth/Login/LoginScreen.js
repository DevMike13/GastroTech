import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient';

import styles from './login.style';

const LoginScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#11774e', '#14b045', '#0c403b']}
        locations={[0, 0.4, 1]}
        style={styles.gradientBackground}
      >
      <View>
        <Text>LoginScreen</Text>
      </View>
      </LinearGradient>
    </SafeAreaView>
  )
}

export default LoginScreen