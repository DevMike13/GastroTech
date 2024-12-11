import { View, Text, SafeAreaView, TouchableOpacity, Image, TextInput, ActivityIndicator } from 'react-native'
import {React, useState, useContext, useEffect, useCallback } from 'react'
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

import { firebase } from '../../../firebase';
import { UserContext } from '../../../UserContext';

import styles from './param.style';

const LauroParamScreen = ({ navigation }) => {
    const [temperature, setTemperature] = useState(null);
    const [smoke, setSmoke] = useState(null);
    const [gas, setGas] = useState(null);
    const [fire, setFire] = useState(null);
    const [countdown, setCountdown] = useState(0);
    const [loading, setLoading] = useState(true);
    const [sprinkler, setSprinkler] = useState(null);
    const { user } = useContext(UserContext);

    const handleGoToSprinkler = () => {
        navigation.navigate('Sprinkler');
    }
    
    useEffect(() => {
        
        if (!user || !user.restaurantName) return;
    
        let temperatureRef, smokeRef, gasRef, fireRef, countRef, sprinklerRef;
        
        temperatureRef = firebase.database().ref('/DonLauro/Temperature');
        smokeRef = firebase.database().ref('/DonLauro/Smoke');
        gasRef = firebase.database().ref('/DonLauro/Gas');
        fireRef = firebase.database().ref('/DonLauro/Fire');
        countRef = firebase.database().ref('/DonLauro/Countdown');
        sprinklerRef = firebase.database().ref('/DonLauro/SprinklerState');
        
        setLoading(true);
    
        if (temperatureRef) {
            // Listen for changes in Temperature data
            temperatureRef.on('value', (snapshot) => {
                try {
                    const temperatureValue = snapshot.val();
                    setTemperature(temperatureValue);
                    setLoading(false);
                } catch (error) {
                    console.error('Error reading temperature:', error);
                    setLoading(false);
                }
            });
        }
    
        if (smokeRef) {
            // Listen for changes in Smoke data
            smokeRef.on('value', (snapshot) => {
                try {
                    const smokeValue = snapshot.val();
                    setSmoke(smokeValue);
                    setLoading(false);
                } catch (error) {
                    console.error('Error reading smoke:', error);
                    setLoading(false);
                }
            });
        }
    
        if (gasRef) {
            // Listen for changes in Gas data
            gasRef.on('value', (snapshot) => {
                try {
                    const gasValue = snapshot.val();
                    setGas(gasValue);
                    setLoading(false);
                } catch (error) {
                    console.error('Error reading gas:', error);
                    setLoading(false);
                }
            });
        }
    
        if (fireRef) {
            // Listen for changes in Fire data
            fireRef.on('value', (snapshot) => {
                try {
                    const fireValue = snapshot.val();
                    setFire(fireValue);
                    setLoading(false);
                } catch (error) {
                    console.error('Error reading fire:', error);
                    setLoading(false);
                }
            });
        }

        if (countRef) {
            // Listen for changes in Fire data
            countRef.on('value', (snapshot) => {
                try {
                    const countValue = snapshot.val();
                    setCountdown(countValue);
                    setLoading(false);
                } catch (error) {
                    console.error('Error reading countdown:', error);
                    setLoading(false);
                }
            });
        }
       
        if (sprinklerRef) {
            // Listen for changes in Fire data
            sprinklerRef.on('value', (snapshot) => {
                try {
                    const sprinklerValue = snapshot.val();
                    setSprinkler(sprinklerValue);
                    setLoading(false);
                } catch (error) {
                    console.error('Error reading sprinkler:', error);
                    setLoading(false);
                }
            });
        }
    
        return () => {
            if (temperatureRef) temperatureRef.off();
            if (smokeRef) smokeRef.off();
            if (gasRef) gasRef.off();
            if (fireRef) fireRef.off();
            if (countRef) countRef.off();
            if (sprinklerRef) sprinklerRef.off();
        };
    }, [user]);
    
    const getTemperatureTextColor = () => {
        if (temperature > 30) {
            return '#FF474D';
        } else if (temperature < 15) {
            return 'lightblue';
        } else {
            return '#90EE90'; 
        }
    };

    const getGasTextColor = () => {
        if (gas > 70) {
            return '#FF474D';
        } else {
            return '#90EE90'; 
        }
    };

    const getFireTextColor = () => {
        if (fire == 'No Detection') {
            return '#90EE90';
        } else {
            return '#FF474D'; 
        }
    };

    const getSmokeTextColor = () => {
        if (smoke == 'No Detection') {
            return '#90EE90';
        } else {
            return '#FF474D'; 
        }
    };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#11774e', '#14b045', '#0c403b']}
        locations={[0, 0.4, 1]}
        style={styles.gradientBackground}
      >
        <View style={styles.navigationButtonContainer}>
            <TouchableOpacity style={styles.navigationButton}>
                <Image
                    source={require('../../../assets/images/smoke.png')}
                    resizeMode='contain'
                    style={styles.buttonIcon}
                />
               <View style={styles.buttonTextContainer}>
                    <Text style={styles.buttonTitleText}>
                        Smoke
                    </Text>
                    {
                        loading ? (
                            <ActivityIndicator size="small" color="#fffffff" />
                        ) : (
                            <Text style={[styles.buttonStatusText, {color: getSmokeTextColor()}]}>
                                {smoke}
                            </Text>
                        )
                    }
                    
               </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.navigationButton}>
                <Image
                    source={require('../../../assets/images/co2.png')}
                    resizeMode='contain'
                    style={styles.buttonIcon}
                />
               <View style={styles.buttonTextContainer}>
                    <Text style={styles.buttonTitleText}>
                        Gas Level
                    </Text>
                    {
                        loading ? (
                            <ActivityIndicator size="small" color="#fffffff" />
                        ) : (
                            <Text style={styles.buttonStatusText}>
                                {gas !== null && gas !== undefined ? `${gas.toFixed(1)}%` : 'N/A'}
                            </Text>
                        )
                    }
                    
                    <Text style={[styles.buttonStatusText, {color: getGasTextColor()}]}>
                        {
                            gas > 70
                            ? 'High'
                            : 'Normal'
                        }
                    </Text>
               </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.navigationButton}>
                <Image
                    source={require('../../../assets/images/temperature.png')}
                    resizeMode='contain'
                    style={styles.buttonIcon}
                />
               <View style={styles.buttonTextContainer}>
                    <Text style={styles.buttonTitleText}>
                        Temperature
                    </Text>
                    {
                        loading ? (
                            <ActivityIndicator size="small" color="#fffffff" />
                        ) : (
                            <Text style={styles.buttonStatusText}>
                                {temperature}°C 
                            </Text>
                        )
                    }
                    
                    <Text style={[styles.buttonStatusText, {color: getTemperatureTextColor()}]}>
                        {
                            temperature < 15
                            ? 'Very Low'
                            : temperature >= 20 && temperature <= 24
                            ? 'Normal'
                            : temperature > 30
                            ? 'Very High'
                            : 'Very High'
                        }
                    </Text>
               </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.navigationButton}>
                <Image
                    source={require('../../../assets/images/fire.png')}
                    resizeMode='contain'
                    style={styles.buttonIcon}
                />
               <View style={styles.buttonTextContainer}>
                    <Text style={styles.buttonTitleText}>
                        Fire
                    </Text>
                    {
                        loading ? (
                            <ActivityIndicator size="small" color="#fffffff" />
                        ) : (
                            <Text style={[styles.buttonStatusText, {color: getFireTextColor()}]}>
                                {fire} 
                            </Text>
                        )
                    }
                    
               </View>
            </TouchableOpacity>

            <View style={styles.modelContainer}>
                <Image
                    source={require('../../../assets/images/model.png')}
                    resizeMode='contain'
                    style={styles.modelImage}
                />
            </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  )
}

export default LauroParamScreen