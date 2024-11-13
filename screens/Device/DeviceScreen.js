import { View, Text, SafeAreaView, Image, TouchableOpacity } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';

import styles from './device.style';

const DeviceScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.contentContainer}>
            <Image
                source={require('../../assets/images/connected.png')}
                resizeMode='contain'
                style={styles.logoImage}
            />
            <View style={styles.textContainer}>
                <Text style={styles.titleText}>How to connect?</Text>
                <Text style={styles.bulletText}>1. Click the connect button.</Text>
                <Text style={styles.bulletText}>2. Wait until you see the indication Connected.</Text>
                <Text style={styles.bulletText}>3. If it's not connecting, please check wifi/data connections.</Text>
                <Text style={styles.bulletText}>4. If it's still the same, contact us.</Text>
            </View>
            {/* <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Connect</Text>
                </TouchableOpacity>
            </View> */}
        </View>
    </SafeAreaView>
  )
}

export default DeviceScreen