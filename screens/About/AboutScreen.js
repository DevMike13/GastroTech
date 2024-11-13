import { View, Text, SafeAreaView, Image, TouchableOpacity, Linking } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import Toast from 'react-native-toast-message';

import styles from './about.style';

const AboutScreen = ({ navigation }) => {

    const handleGoToPrivacyPolicy = () => {
        navigation.navigate('PrivacyPolicy')
    }

    const handleGoToSystem = () => {
        navigation.navigate('System')
    }

    const handleEmailPress = () => {
        Linking.openURL('mailto:firealert298@gmail.com?subject=Support%20Request&body=Hello%20GastroTech%20Support,');
    }

    const handlePhonePress = () => {
        Linking.openURL('tel:+639707612396');
    }

    const handleFacebookPress = async () => {
        const facebookUrl = 'fb:/profile.php?id=61568296270873'; // Opens the Facebook app if installed
        const webUrl = 'https://www.facebook.com/profile.php?id=61568296270873'; // Fallback to browser if app is not available

        try {
            const supported = await Linking.canOpenURL(facebookUrl);
            if (supported) {
                await Linking.openURL(facebookUrl);
            } else {
                await Linking.openURL(webUrl);
            }
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Unable to open Facebook page.',
            });
        }
    };

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
                    <TouchableOpacity onPress={handleFacebookPress}>
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
                <View style={styles.socialButtonContainer} >
                    <TouchableOpacity onPress={handlePhonePress}>
                        <Image
                            source={require('../../assets/images/call.png')}
                            resizeMode='contain'
                            style={styles.socialImage}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleEmailPress}>
                        <Image
                            source={require('../../assets/images/gmail.png')}
                            resizeMode='contain'
                            style={styles.socialImage}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
        <Toast position="top" />
    </SafeAreaView>
  )
}

export default AboutScreen