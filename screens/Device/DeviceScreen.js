import { View, Text, SafeAreaView, Image } from 'react-native'
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
            <Text>DEVICE</Text>
        </View>
    </SafeAreaView>
  )
}

export default DeviceScreen