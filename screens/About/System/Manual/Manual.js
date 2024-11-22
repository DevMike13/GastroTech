import { View, Text, SafeAreaView, Image, TouchableOpacity, ScrollView, Dimensions } from 'react-native'
import React, { useState } from 'react'

import styles from './manual.style';

const Manual = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.contentContainer}>
            <View>
                <Text style={styles.titleText}>Device Parts</Text>
                <Image
                    source={require('../../../../assets/images/device-parts-one.png')}
                    resizeMode='contain'
                    style={{ width: "100%", height: 220}}
                />
                <Image
                    source={require('../../../../assets/images/device-parts-two.png')}
                    resizeMode='contain'
                    style={{ width: "100%", height: 220}}
                />
                <Text style={styles.textStyle}>
                    The GastroTech device includes various
                    components designed for efficient fire
                    and gas detection. Key parts are labeled
                    in the diagram.
                </Text>
                <Text style={styles.textStyleTwo}>
                    <Text style={styles.textBoldStyle}>16x2 LCD Display:</Text> Provides real-time 
                    status updates on the system's operations.
                </Text>
                <Text style={styles.textStyleTwo}>
                    <Text style={styles.textBoldStyle}>MQ Gas Sensor:</Text> Detects the presence of 
                    hazardous gases in the environment.
                </Text>
                <Text style={styles.textStyleTwo}>
                    <Text style={styles.textBoldStyle}>DHT22 Temperature Sensor:</Text> Monitors 
                    temperature levels to detect anomalies.
                </Text>
                <Text style={styles.textStyleTwo}>
                    <Text style={styles.textBoldStyle}>LM393 Flame Sensor:</Text> Identifies flames to
                    provide an early warning of fire.
                </Text>
                <Text style={styles.textStyleTwo}>
                    <Text style={styles.textBoldStyle}>SIM800L GSM Module:</Text> Facilitates SMS 
                    notifications for emergency alerts.
                </Text>
                <Text style={styles.textStyleTwo}>
                    <Text style={styles.textBoldStyle}>Buzzer:</Text> Emits an audible alert during
                    emergencies.
                </Text>
                <Text style={styles.textStyleTwo}>
                    <Text style={styles.textBoldStyle}>Switch for Exhaust and Sprinkler:</Text> Activates 
                    the exhaust and Sprinkler
                    system to mitigate smoke, gas, and fire.
                </Text>
                <Text style={styles.textStyleTwo}>
                    <Text style={styles.textBoldStyle}>Exhaust Fan:</Text> Helps in ventilating smoke 
                    and gases out of the area.
                </Text>
                <Text style={styles.textStyleTwo}>
                    <Text style={styles.textBoldStyle}>Water Pump:</Text> Supplies water to the 
                    sprinkler system for fire suppression.
                </Text>
                <Text style={styles.textStyleTwo}>
                    <Text style={styles.textBoldStyle}>Sprinkler Head and Water Sensor:</Text>
                    Components of the automated sprinkler
                    system for active fire control.

                </Text>
                <Text style={styles.textStyleTwo}>
                    <Text style={styles.textBoldStyle}>Sprinkler Head and Water Sensor:</Text>
                    Components of the automated sprinkler
                    system for active fire control.

                </Text>
            </View>
            <View style={{ marginTop: 20 }}>
                <Text style={styles.titleText}>Device Placement</Text>
                <Image
                    source={require('../../../../assets/images/device-placement.png')}
                    resizeMode='contain'
                    style={{ width: "100%", height: 220}}
                />
                <Text style={styles.textStyleTwo}>
                    <Text style={styles.textBoldStyle}>Ceiling Installation:</Text> Position the sprinkler 
                    head and exhaust fan on the ceiling for 
                    optimal smoke and gas removal. Maintain
                    at least 1.5 to 1.8 meters between the 
                    sprinkler head and any cooking appliances.
                </Text>
                <Text style={styles.textStyleTwo}>
                    <Text style={styles.textBoldStyle}>Wall Installation:</Text> Mount the device control 
                    panel on a wall at a height of 30 cm from
                    the floor for easy accessibility.
                </Text>
                <Text style={styles.textStyleTwo}>
                    <Text style={styles.textBoldStyle}>Exhaust Placement:</Text> Align the exhaust system 
                    above cooking equipment for efficient ventilation.

                </Text>
            </View>
            <View style={{ marginTop: 20 }}>
                <Text style={styles.titleText}>Safety Status Levels</Text>
                <Image
                    source={require('../../../../assets/images/mobile-one.png')}
                    resizeMode='contain'
                    style={{ width: "100%", height: 320}}
                />
                <Text style={styles.textBoldStyle}>Categories:</Text>
                <Text style={styles.textStyleTwo}>
                    <Text style={styles.textBoldStyle}>- Normal:</Text> Safe levels within the 20%–30% 
                    threshold.
                </Text>
                <Text style={styles.textStyleTwo}>
                    <Text style={styles.textBoldStyle}>- Out of Range:</Text> Levels slightly beyond the
                        normal threshold, requiring attention.

                </Text>
                <Text style={styles.textStyleTwo}>
                    <Text style={styles.textBoldStyle}>- High:</Text> Dangerous levels significantly 
                    exceeding the threshold, requiring
                    immediate action.
                </Text>
                <Text style={styles.textStyleTwo}>
                    <Text style={styles.textBoldStyle}>Temperature:</Text> Monitors the ambient temperature
                    and categorizes it as:
                </Text>
                <Text style={styles.textStyleTwo}>
                    <Text style={styles.textBoldStyle}>- Normal:</Text> Within the safe range of 20°C to 35°C.
                </Text>
                <Text style={styles.textStyleTwo}>
                    <Text style={styles.textBoldStyle}>- Out of Range:</Text> Temperatures slightly outside 
                    the range, signaling potential overheating.


                </Text>
                <Text style={styles.textStyleTwo}>
                    <Text style={styles.textBoldStyle}>- High:</Text> Significantly elevated temperatures that
                    may indicate a fire hazard.
                </Text>

                <Text style={styles.textStyleTwo}>
                    <Text style={styles.textBoldStyle}>Fire:</Text> Detects the presence of fire and displays the 
status as either "No Detection" (safe) or an alert if 
flames are identified.

                </Text>
            </View>

            <View style={{ marginTop: 20 }}>
                <Text style={styles.titleText}>Automatic Activation</Text>
                <Image
                    source={require('../../../../assets/images/mobile-two.png')}
                    resizeMode='contain'
                    style={{ width: "100%", height: 320}}
                />
                <Text style={styles.textStyleTwo}>
                    <Text style={styles.textBoldStyle}>Override Alert:</Text> This alert indicates that the 
                        water sprinkler will automatically activate after a 
                        10-second countdown. If the user does
                        not respond to the alert, the system will
                        still activate once the countdown ends.

                </Text>
            </View>

            <View style={{ marginTop: 20, marginBottom: 20 }}>
                <Text style={styles.titleText}>Manual Activation</Text>
                <Image
                    source={require('../../../../assets/images/manual-control.png')}
                    resizeMode='contain'
                    style={{ width: "100%", height: 320}}
                />
            </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Manual