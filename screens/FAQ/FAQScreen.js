import { View, Text, SafeAreaView, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { List } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

import styles from './faq.style';

const FAQScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.contentContainer}>
            <ScrollView>
                <List.AccordionGroup>
                    <List.Accordion title="1. What is GastroTech?" id="1" titleNumberOfLines={2}>
                        <Text style={styles.answerText}>
                            GastroTech is a smart Android-based gas and fire detection system designed to monitor and prevent fire hazards in restaurant environments. It uses a combination of sensors like gas detectors, flame sensors, and temperature sensors to detect fire or gas leaks in real time and notify the appropriate authorities for immediate action.
                        </Text>
                    </List.Accordion>
                    <List.Accordion title="2. How does the GastroTech system detect gas leaks?" id="2" titleNumberOfLines={2}>
                        <Text style={styles.answerText}>
                        GastroTech utilizes the MQ Gas Sensor, which can detect harmful gases like smoke, carbon monoxide, and liquefied petroleum gas (LPG). When dangerous gas levels are detected, the system triggers alarms, activates exhaust fans, and sends SMS notifications to the Bureau of Fire Protection (BFP).
                        </Text>
                    </List.Accordion>
                    <List.Accordion title="3. What kind of sensors are used in the GastroTech system?" id="3" titleNumberOfLines={2}>
                        <Text style={styles.answerText}>
                            The GastroTech system uses various sensors, including:
                        </Text>
                        <Text style={styles.answerText}>
                            - MQ Gas Sensor for detecting smoke, carbon monoxide, LPG, and other gases.
                        </Text>
                        <Text style={styles.answerText}>
                            - DHT22 Temperature Sensor for real-time monitoring of temperature.
                        </Text>
                        <Text style={styles.answerText}>
                            - LM393 Flame Detection Sensor to identify fire incidents and activate safety measures like water sprinklers
                        </Text>
                    </List.Accordion>
                    <List.Accordion title="4. How does the system respond to fire or gas detection?" id="4" titleNumberOfLines={2}>
                        <Text style={styles.answerText}>
                            When the system detects a fire or gas leak, it sends an automatic alert via SMS to the nearest fire station and designated contacts. The system can also activate water sprinklers and exhaust fans to mitigate the detected hazard.
                        </Text>
                    </List.Accordion>
                    <List.Accordion title="5. Can GastroTech be monitored remotely?" id="5" titleNumberOfLines={2}>
                        <Text style={styles.answerText}>
                            Yes, GastroTech offers a mobile application that allows restaurant owners and managers to monitor the system remotely. They can view gas levels, temperature, and fire statuses in real time, and receive notifications of any hazards via the app.
                        </Text>
                    </List.Accordion>
                    <List.Accordion title="6. What happens if the Wi-Fi connection fails?" id="6" titleNumberOfLines={2}>
                        <Text style={styles.answerText}>
                            GastroTech relies on a stable Wi-Fi connection for remote monitoring and alerting via the mobile application. If the connection is lost, the system will continue to function locally, triggering alarms and activating safety measures like sprinklers and fans. However, remote monitoring and alerts via SMS will be unavailable without Wi-Fi.
                        </Text>
                    </List.Accordion>
                    <List.Accordion title="7. How are alerts communicated in case of an emergency?" id="7" titleNumberOfLines={2}>
                        <Text style={styles.answerText}>
                            The system sends SMS notifications with the restaurant's location to the Bureau of Fire Protection (BFP). The system can also make direct calls to emergency contacts for immediate intervention.
                        </Text>
                    </List.Accordion>
                    <List.Accordion title="8. Does GastroTech support manual intervention in emergencies?" id="8" titleNumberOfLines={2}>
                        <Text style={styles.answerText}>
                            Yes, GastroTech includes a manual override option where users can activate water sprinklers or exhaust fans through the mobile app in case of emergencies.
                        </Text>
                    </List.Accordion>
                    <List.Accordion title="9. How does the system handle different gas detection thresholds?" id="9" titleNumberOfLines={2}>
                        <Text style={styles.answerText}>
                            The system monitors gas levels within specified thresholds (20%-30% ppm for gas detection). When gas concentrations exceed safe limits, alarms are triggered and preventive actions are taken automatically.
                        </Text>
                    </List.Accordion>
                    <List.Accordion title="10. What kind of establishments is GastroTech suitable for?" id="10" titleNumberOfLines={2}>
                        <Text style={styles.answerText}>
                            GastroTech is primarily designed for restaurant environments, where there are high risks of gas leaks and fires due to cooking operations. It can be adapted for similar settings like commercial kitchens or other industries where gas and fire hazards are a concern.
                        </Text>
                    </List.Accordion>
                </List.AccordionGroup>
            </ScrollView>
        </View>
    </SafeAreaView>
  )
}

export default FAQScreen