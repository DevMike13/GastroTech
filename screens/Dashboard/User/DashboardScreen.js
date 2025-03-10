import { View, Text, SafeAreaView, TouchableOpacity, Image, TextInput, ActivityIndicator, Modal } from 'react-native'
import {React, useState, useContext, useEffect, useCallback } from 'react'
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

import { firebase } from '../../../firebase';
import { UserContext } from '../../../UserContext';

import styles from './dashboard.style';

const DashboardScreen = ({ navigation }) => {
    const [gasModal, setGasModal] = useState(false);
    const [smokeModal, setSmokeModal] = useState(false);
    const [tempModal, setTempModal] = useState(false);

    const [allModal, setAllModal] = useState(false);
    
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
        
        if (user.restaurantName === "Caza Plaza") {
            temperatureRef = firebase.database().ref('/CazaPlaza/Temperature');
            smokeRef = firebase.database().ref('/CazaPlaza/Smoke');
            gasRef = firebase.database().ref('/CazaPlaza/Gas');
            fireRef = firebase.database().ref('/CazaPlaza/Fire');
            countRef = firebase.database().ref('/CazaPlaza/Countdown');
            sprinklerRef = firebase.database().ref('/CazaPlaza/SprinklerState');
        } else if (user.restaurantName === "Plaza De Shalom") {
            temperatureRef = firebase.database().ref('/PlazaShalom/Temperature');
            smokeRef = firebase.database().ref('/PlazaShalom/Smoke');
            gasRef = firebase.database().ref('/PlazaShalom/Gas');
            fireRef = firebase.database().ref('/PlazaShalom/Fire');
            countRef = firebase.database().ref('/PlazaShalom/Countdown');
            sprinklerRef = firebase.database().ref('/PlazaShalom/SprinklerState');
        } else if (user.restaurantName === "Don Lauro Restaurant") {
            temperatureRef = firebase.database().ref('/DonLauro/Temperature');
            smokeRef = firebase.database().ref('/DonLauro/Smoke');
            gasRef = firebase.database().ref('/DonLauro/Gas');
            fireRef = firebase.database().ref('/DonLauro/Fire');
            countRef = firebase.database().ref('/DonLauro/Countdown');
            sprinklerRef = firebase.database().ref('/DonLauro/SprinklerState');
        }
    
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

    useEffect(() => {
        // Check conditions
        if (smoke === "Smoke Detected!") {
            setSmokeModal(true);
        } else {
            setSmokeModal(false);
        }

        if (gas > 30) {
            setGasModal(true);
        }  else {
            setGasModal(false);
        }
        
        if (temperature > 40) {
            setTempModal(true);
        } else {
            setTempModal(false);
        }

        if(smoke === "Smoke Detected!" && gas > 30 && temperature > 40){
            setAllModal(true);
        } else {
            setAllModal(false);
        }
        
    }, [smoke, gas, temperature]);

    const closeGasModal = () => {
        navigation.navigate('Device');
        setGasModal(false);
    };

    const closeSmokeModal = () => {
        navigation.navigate('Device');
        setSmokeModal(false);
    };

    const closeTempModal = () => {
        navigation.navigate('Device');
        setTempModal(false);
    };

    const closeAllModal = () => {
        navigation.navigate('Device');
        setAllModal(false);
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
                {
                    fire == "Fire Detected!" || countdown != 0 || sprinkler !== "OFF" ? (
                        <TouchableOpacity style={styles.fireDetectionContainer} onPress={handleGoToSprinkler}>
                            {/* <View > */}
                                <View style={styles.tailContainer}>
                                    <Image
                                        source={require('../../../assets/images/emergency.png')}
                                        resizeMode='contain'
                                        style={styles.emergencyImage}
                                    />
                                    <View style={styles.tail} />
                                </View>
                            {/* </View> */}
                        </TouchableOpacity>
                    ) : (
                        <></>
                    )
                }
            
            </View>
        </View>
        <Modal
            transparent={true}
            visible={gasModal}
            animationType="fade"
            onRequestClose={() => setGasModal(false)}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitleText}>Gas Alert</Text>
                    <Text style={styles.modalText}>Gas is Increasing Please Activate Exhaust Fan and Check your Surroundings!!!</Text>
                    <TouchableOpacity style={styles.modalButton}>
                        <Text style={styles.modalButtonText} onPress={closeGasModal}>Ok</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal> 

        <Modal
            transparent={true}
            visible={smokeModal}
            animationType="fade"
            onRequestClose={() => setSmokeModal(false)}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitleText}>Smoke Alert</Text>
                    <Text style={styles.modalText}>Smoke is Increasing Please Activate Exhaust Fan and Check your Surroundings!!!</Text>
                    <TouchableOpacity style={styles.modalButton}>
                        <Text style={styles.modalButtonText} onPress={closeSmokeModal}>Ok</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>

        <Modal
            transparent={true}
            visible={tempModal}
            animationType="fade"
            onRequestClose={() => setTempModal(false)}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitleText}>Temperature Alert</Text>
                    <Text style={styles.modalText}>Temperature is Increasing Please Activate Exhaust Fan and Check your Surroundings!!!</Text>
                    <TouchableOpacity style={styles.modalButton}>
                        <Text style={styles.modalButtonText} onPress={closeTempModal}>Ok</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>

        <Modal
            transparent={true}
            visible={allModal}
            animationType="fade"
            onRequestClose={() => setAllModal(false)}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitleText}>Emergency Alert</Text>
                    <Text style={styles.modalText}>Smoke, Gas and Temperature is Increasing please Check your Surroundings!!!</Text>
                    <TouchableOpacity style={styles.modalButton}>
                        <Text style={styles.modalButtonText} onPress={closeAllModal}>Ok</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
      </LinearGradient>
    </SafeAreaView>
  )
}

export default DashboardScreen