import { View, Text, TouchableOpacity, ImageBackground, Image } from 'react-native'
import React from 'react'

import { Ionicons } from '@expo/vector-icons';

import styles from './six.style';

const StepSix = ({ setStep, navigation }) => {

  const handleStepFinish = () => {
      navigation.navigate('Login')
  };
  
  const handleStepBack = () => {
      setStep((prevStep) => prevStep - 1);
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Image
            source={require('../../../assets/images/model.png')}
            resizeMode='contain'
        />
        <Text style={styles.title}>Welcome to GastroTech</Text>
        <Text style={styles.textContent}>"Welcome to GastroTech, your comprehensive solution for real-time gas and fire detection"</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleStepFinish}>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default StepSix