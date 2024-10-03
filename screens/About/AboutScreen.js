import { View, Text, SafeAreaView, Image, TouchableOpacity } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';

import styles from './about.style';

const AboutScreen = ({ navigation }) => {

    const handleGoToPrivacyPolicy = () => {
        navigation.navigate('PrivacyPolicy')
    }

    const handleGoToSystem = () => {
        navigation.navigate('System')
    }

  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.contentContainer}>
            <View style={styles.logoContainer}>
                <Image
                    source={require('../../assets/images/fire.png')}
                    resizeMode='contain'
                    style={styles.logoImage}
                />
                <Text style={styles.logoText}>GastroTech</Text>
            </View>
            
            <View style={styles.textContainer}>
                <Text style={styles.titleText}>About this app</Text>
                <Text style={styles.versionTitle}>Version</Text>
                <Text style={styles.versionText}>v1.0.0</Text>
                <TouchableOpacity onPress={handleGoToPrivacyPolicy}>
                    <Text style={styles.buttonText}>Privacy Policy</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleGoToSystem}>
                    <Text style={styles.buttonText}>System</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.socialsContainer}>
                <Text style={styles.titleText}>Contact Us</Text>
                <View style={styles.socialButtonContainer}>
                    <TouchableOpacity>
                        <Image
                            source={require('../../assets/images/facebook.png')}
                            resizeMode='contain'
                            style={styles.socialImage}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image
                            source={require('../../assets/images/instagram.png')}
                            resizeMode='contain'
                            style={styles.socialImage}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.socialButtonContainer}>
                    <TouchableOpacity>
                        <Image
                            source={require('../../assets/images/call.png')}
                            resizeMode='contain'
                            style={styles.socialImage}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image
                            source={require('../../assets/images/gmail.png')}
                            resizeMode='contain'
                            style={styles.socialImage}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    </SafeAreaView>
  )
}

export default AboutScreen