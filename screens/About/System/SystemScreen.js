import { View, Text, SafeAreaView, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient';

import styles from './system.style';

import Tabs from './Tabs/tabs';
import Circuit from './Circuit/Circuit';
import Code from './Code/Code';

const tabList = ["Circuit Information", "System Code"];

const SystemScreen = ({ navigation }) => {

  const [activeTab, setActiveTab] = useState(tabList[0]);

  const displayTabContent = () => {
    switch (activeTab) {
      case "Circuit Information":
        return <Circuit
          title='Circuit Information'
        />
      case "System Code":
        return <Code
          title='System Code'
        />
      default:
      break;
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.logoContainer}>
          <Image
            source={require('../../../assets/images/fire.png')}
            resizeMode='contain'
            style={styles.logoImage}
          />
          <Text style={styles.logoText}>GastroTech</Text>
        </View>
        <Tabs 
          tabs={tabList}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        {displayTabContent()}
      </View>
    </SafeAreaView>
  )
}

export default SystemScreen