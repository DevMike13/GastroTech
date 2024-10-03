import { View, Text, SafeAreaView, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

import styles from './circuit.style';

const Circuit = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <Text>CIRCUIT DETAILS</Text>
      </View>
    </SafeAreaView>
  )
}

export default Circuit