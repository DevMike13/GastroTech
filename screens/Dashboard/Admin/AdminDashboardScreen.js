import { View, Text, SafeAreaView, TouchableOpacity, Image, TextInput } from 'react-native'
import {React, useState, useContext} from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

import { UserContext } from '../../../UserContext';

import styles from './addash.style';

const AdminDashboardScreen = ({ navigation }) => {

    const { user } = useContext(UserContext);
    const handleGoToLocations = () => {
        navigation.navigate('Locations');
    }

    const handleGoToRestaurants = () => {
        navigation.navigate('Restaurants');
    }

    const handleGoToAccount = () => {
        navigation.navigate('Account');
    }

    const handleGoToAbout = () => {
        navigation.navigate('About');
    }
  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#11774e', '#14b045', '#0c403b']}
        locations={[0, 0.4, 1]}
        style={styles.gradientBackground}
      >
        <View style={styles.navigationButtonContainer}>
            <View style={styles.navigationButtonInnerContainer}>
                <TouchableOpacity style={styles.navigationButton} onPress={handleGoToRestaurants}>
                    <Image
                        source={require('../../../assets/images/restaurant.png')}
                        resizeMode='contain'
                        style={styles.buttonIcon}
                    />
                    <View style={styles.buttonTextContainer}>
                        <Text style={styles.buttonTitleText}>
                            Restaurants
                        </Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.navigationButton} onPress={handleGoToLocations}>
                    <Image
                        source={require('../../../assets/images/map.png')}
                        resizeMode='contain'
                        style={styles.buttonIcon}
                    />
                    <View style={styles.buttonTextContainer}>
                        <Text style={styles.buttonTitleText}>
                            Locations
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={styles.navigationButtonInnerContainer}>
                <TouchableOpacity style={styles.navigationButton}>
                    <Image
                        source={require('../../../assets/images/history.png')}
                        resizeMode='contain'
                        style={styles.buttonIcon}
                    />
                    <View style={styles.buttonTextContainer}>
                        <Text style={styles.buttonTitleText}>
                            History
                        </Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.navigationButton}>
                    <Image
                        source={require('../../../assets/images/manual-book.png')}
                        resizeMode='contain'
                        style={styles.buttonIcon}
                    />
                    <View style={styles.buttonTextContainer}>
                        <Text style={styles.buttonTitleText}>
                            Reports
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={styles.navigationButtonInnerContainer}>
                <TouchableOpacity style={styles.navigationButton} onPress={handleGoToAccount}>
                    <Image
                        source={require('../../../assets/images/goal.png')}
                        resizeMode='contain'
                        style={styles.buttonIcon}
                    />
                    <View style={styles.buttonTextContainer}>
                        <Text style={styles.buttonTitleText}>
                            Settings
                        </Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.navigationButton} onPress={handleGoToAbout}>
                    <Image
                        source={require('../../../assets/images/phone-book.png')}
                        resizeMode='contain'
                        style={styles.buttonIcon}
                    />
                    <View style={styles.buttonTextContainer}>
                        <Text style={styles.buttonTitleText}>
                            Contact Us
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
            
            
        </View>
        <View style={styles.modelContainer}>
            <Image
                source={require('../../../assets/images/model.png')}
                resizeMode='contain'
                style={styles.modelImage}
            />
        </View>
      </LinearGradient>
    </SafeAreaView>
  )
}

export default AdminDashboardScreen