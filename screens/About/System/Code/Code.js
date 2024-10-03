import { View, Text, SafeAreaView, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

import styles from './code.style';

const Code = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <Text>SYSTEM CODE</Text>
      </View>
    </SafeAreaView>
  )
}

export default Code