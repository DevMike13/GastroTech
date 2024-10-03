import { View, Text, SafeAreaView, Image, TouchableOpacity, ScrollView } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';

import styles from './privacy.style';

const PrivacyPolicyScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.contentContainer}>
            <ScrollView contentContainerStyle={styles.scrollViewStyle}>
                <Text style={styles.titleText}>Privacy Policy</Text>
                <Text style={styles.contentText}>
                    Privacy Policy for GastroTech: A Smart Android-Based Gas and Fire Detection System
                </Text>
                <Text style={styles.contentText}>
                    Effective Date: [Insert Date]
                </Text>
                <Text style={styles.contentText}>
                    1. Introduction
                    This Privacy Policy explains how GastroTech ("we," "our," or "the System") collects, uses, discloses, and protects the personal information of users ("you") when you use the GastroTech application and system. The purpose of this system is to monitor fire hazards, detect gas leaks, and ensure the safety of users through real-time alerts and notifications. By using GastroTech, you agree to the collection and use of your data in accordance with this Privacy Policy.
                </Text>
                <Text style={styles.contentText}>
                    2. Information We Collect
                    GastroTech collects various types of data to provide a safe and efficient service. This includes:
                </Text>
                <Text style={styles.contentSubText}>
                    a. Personal Information:
                </Text>
                <Text style={styles.contentInnerSubText}>
                    - User Profile Data: Information you provide when registering for the application, including your name, contact details (phone number and email), and restaurant location.
                </Text>
                <Text style={styles.contentInnerSubText}>
                    - Emergency Contacts: Phone numbers and contact information for emergency alerts and notifications.
                </Text>
                
                <Text style={styles.contentSubText}>
                    b. Device and System Data:
                </Text>
                <Text style={styles.contentInnerSubText}>
                    - Device Information: Technical information about your device, such as the model, operating system, IP address, and mobile network information.
                </Text>
                <Text style={styles.contentInnerSubText}>
                    - Sensor Data: Information collected from hardware sensors like the MQ Gas Sensor, flame sensor, and temperature sensors, including gas levels, fire detection, and environmental conditions.
                </Text>
                <Text style={styles.contentInnerSubText}>
                    - Location Data: The GPS coordinates of the restaurant or establishment for accurate reporting during emergencies.
                </Text>

                <Text style={styles.contentSubText}>
                    c. Usage Data:
                </Text>
                <Text style={styles.contentInnerSubText}>
                    - App Interactions: Details on how you interact with the mobile application, including logins, access times, and features used.
                </Text>
                
                <Text style={styles.contentText}>
                    3. How We Use Your Information
                    We use the collected data for the following purposes:
                </Text>

                <Text style={styles.contentSubText}>
                    a. To Provide and Improve Our Services:
                </Text>
                <Text style={styles.contentInnerSubText}>
                    - Monitor gas levels, fire incidents, and temperature to ensure safe restaurant operations.
                </Text>
                <Text style={styles.contentInnerSubText}>
                    - Enable real-time alerts to the Bureau of Fire Protection (BFP) and designated emergency contacts.
                </Text>
                <Text style={styles.contentInnerSubText}>
                    - Allow users to remotely control and monitor the system via the mobile app.
                </Text>

                <Text style={styles.contentSubText}>
                    b. To Communicate with You:
                </Text>
                <Text style={styles.contentInnerSubText}>
                    - Send SMS notifications and direct calls in case of emergency situations.
                </Text>
                <Text style={styles.contentInnerSubText}>
                    - Provide updates and critical alerts related to GastroTech's functionality.
                </Text>
               
                <Text style={styles.contentSubText}>
                    c. To Maintain and Improve the Application:
                </Text>
                <Text style={styles.contentInnerSubText}>
                    - Analyze usage patterns to improve app performance and optimize the user experience.
                </Text>
                <Text style={styles.contentInnerSubText}>
                    - Monitor system reliability and detect and prevent technical issues.
                </Text>

                <Text style={styles.contentText}>
                    4. Data Sharing and Disclosure
                    We do not sell or rent your personal information. However, we may share your data in the following cases:
                </Text>
                <Text style={styles.contentSubText}>
                    a. With Emergency Services:
                </Text>
                <Text style={styles.contentInnerSubText}>
                    - In the event of a detected gas leak or fire, we share your location and contact information with emergency services like the Bureau of Fire Protection (BFP).
                </Text>

                <Text style={styles.contentSubText}>
                    b. With Third-Party Service Providers:
                </Text>
                <Text style={styles.contentInnerSubText}>
                    - We may engage trusted third-party service providers to assist in app hosting, data processing, or customer support. These providers will have access to personal information only to perform these tasks on our behalf.
                </Text>

                <Text style={styles.contentSubText}>
                    c. Legal Obligations:
                </Text>
                <Text style={styles.contentInnerSubText}>
                    - We may disclose your personal information when required by law, regulation, or legal process to protect our legal rights or in the case of fraud or security concerns.
                </Text>
                
                <Text style={styles.contentText}>
                    5. Data Retention
                    We retain your personal information for as long as necessary to provide our services and comply with legal obligations. Once your information is no longer needed, it will be securely deleted.
                </Text>

                <Text style={styles.contentText}>
                    6. Security of Your Information
                    We prioritize the security of your data and implement industry-standard measures to protect against unauthorized access, disclosure, or destruction of personal information. However, no method of transmission over the Internet or electronic storage is completely secure, and we cannot guarantee absolute security.
                </Text>

                <Text style={styles.contentText}>
                    7. User Rights
                    You have the right to:
                </Text>
                <Text style={styles.contentInnerSubText}>
                    - Access, update, or delete your persona
                </Text>
            </ScrollView>
        </View>
    </SafeAreaView>
  )
}

export default PrivacyPolicyScreen