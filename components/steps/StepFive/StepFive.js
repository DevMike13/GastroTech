import { View, Text, TouchableOpacity, ImageBackground, Image } from 'react-native'
import React from 'react'

import { Ionicons } from '@expo/vector-icons';

import styles from './five.style';

const StepFive = ({ setStep, navigation }) => {
  
  const handleSkip = () => {
    navigation.navigate('Login')
  };

  const handleStepComplete = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const handleStepBack = () => {
      setStep((prevStep) => prevStep - 1);
  };
  return (
    <View style={styles.container}>
      <View style={styles.skipButtonContainer}>
        <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
          <Text style={styles.buttonText}>Skip</Text>
          <Ionicons name="play-forward" size={20} color="white" />
        </TouchableOpacity>
      </View>
      <View style={styles.contentContainer}>
        <Image
            source={require('../../../assets/images/troubleshooting.png')}
            resizeMode='contain'
        />
        <Text style={styles.title}>Troubleshooting</Text>
        <Text style={styles.textContent}>"If you encounter any issues, please refer to the troubleshooting section for assistance"</Text>
      </View>
      <View style={styles.bulletContainer}>
        <Ionicons name="ellipse" size={20} color="white" />
        <Ionicons name="ellipse" size={20} color="white" />
        <Ionicons name="ellipse" size={20} color="white" />
        <Ionicons name="ellipse" size={20} color="white" />
        <Ionicons name="ellipse" size={20} color="gray" />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleStepBack}>
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleStepComplete}>
          <Text style={styles.buttonText}>Finish</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default StepFive