import { View, Text, SafeAreaView, Image, TouchableOpacity, ActivityIndicator } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState, useContext, useEffect } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { Video } from 'expo-av';

import { firebase } from '../../firebase';
import { UserContext } from '../../UserContext';

import styles from './sprinkler.style';

const SprinklerScreen = ({ navigation }) => {
    const { user } = useContext(UserContext);
    console.log(user);

    const [countdown, setCountdown] = useState(0);
    const [sprinkler, setSprinkler] = useState(null);
    const [loading, setLoading] = useState(true);

    const handleGoToDashboard = () => {
        navigation.navigate('Dashboard');
    }

    useEffect(() => {
        const countdownRef = firebase.database().ref('/CazaPlaza/Countdown');
        const sprinklerRef = firebase.database().ref('/CazaPlaza/SprinklerState');

        setLoading(true);

        countdownRef.on('value', (snapshot) => {
            try {
                const countdownValue = snapshot.val();
                setCountdown(countdownValue);
                setLoading(false);
            } catch (error) {
                console.error('Error reading countdown:', error);
                setLoading(false);
            }
        });

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

        return () => {
            countdownRef.off();
            sprinklerRef.off();
        };
    }, []);

    const toggleSprinkler = () => {
        const newSprinklerState = sprinkler === "ON" ? "OFF" : "ON";
        firebase.database().ref('/CazaPlaza/SprinklerState').set(newSprinklerState);
        setSprinkler(newSprinklerState);
    };

    const updateSprinklerState = async () => {
        try {
          const sprinklerStateRef = firebase.database().ref('/CazaPlaza/SprinklerState');
          const countdownStateRef = firebase.database().ref('/CazaPlaza/Countdown');
          await sprinklerStateRef.set('ON');
          await countdownStateRef.set(0);
        } catch (error) {
          console.error("Error updating SprinklerState:", error);
        }
    };

  return (
    <SafeAreaView style={styles.container}>
        <LinearGradient
            colors={['#11774e', '#14b045', '#0c403b']}
            locations={[0, 0.4, 1]}
            style={styles.gradientBackground}
        >
            {
                countdown > 0 && sprinkler == "OFF" ? (
                    <View style={styles.contentContainer}>
                        <Image
                            source={require('../../assets/images/emergency.png')}
                            resizeMode='contain'
                            style={styles.emergencyImage}
                        />
                        <Text style={styles.contentText}>
                            The water sprinkler will automatically activated in ({countdown}) seconds.
                        </Text>
                        <View style={styles.outerCircle}>
                            <View style={styles.innerCircle}>
                                <Text style={styles.counterText}>
                                    {countdown}s
                                </Text>
                            </View>
                        </View>
                        <Text style={styles.contentText}>
                            Or
                        </Text>
                        <TouchableOpacity style={styles.button} onPress={updateSprinklerState}>
                            <Text style={styles.buttonText}>Proceed</Text>
                        </TouchableOpacity>
                    </View>
                ) : countdown === 0 && sprinkler === "ON" || sprinkler === "OFF" ? (
                    <View style={styles.sprinklerContentContainer}>
                        {
                            sprinkler === "ON" ? (
                                <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 50}}>
                                    <Video
                                        source={require('../../assets/images/sprinkler.mp4')}
                                        style={{ width: 100, height: 100, marginBottom: -90, zIndex: 100}}
                                        isLooping={true}
                                        resizeMode="contain"
                                        shouldPlay={true}
                                    />
                                    <Image
                                        source={require('../../assets/images/sprinkler.png')}
                                        resizeMode='contain'
                                        style={{ width: 500, height: 280 }}
                                    />
                                </View>
                            ) : (
                                <Image
                                    source={require('../../assets/images/sprinkler.png')}
                                    resizeMode='contain'
                                    style={styles.sprinklerImage}
                                />
                            )
                        }
                        
                        {
                            loading ? (
                                <ActivityIndicator size="small" color="#fffffff" />
                            ) : (
                                <Text style={styles.sprinklerContentText}>
                                    {sprinkler == "ON" ? "Sprinkler Activated." : "Sprinkler Deactivated."}
                                </Text>
                            )
                        }
                        
                        {
                            loading ? (
                                <ActivityIndicator size="small" color="#fffffff" />
                            ) : (
                                <TouchableOpacity style={styles.button} onPress={toggleSprinkler}>
                                    <Text style={styles.buttonText}>{sprinkler == "ON" ? "OFF" : "ON"}</Text>
                                </TouchableOpacity>
                            )
                        }
                        
                    </View>
                ) : (
                    <></>
                )
            }
            
            
            <View style={styles.modelContainer}>
                <Image
                    source={require('../../assets/images/model.png')}
                    resizeMode='contain'
                    style={styles.modelImage}
                />
                <TouchableOpacity style={styles.homeButton} onPress={handleGoToDashboard}>
                    <Ionicons name="home" size={32} color="white" />
                </TouchableOpacity>
            </View>
        </LinearGradient>
    </SafeAreaView>
  )
}

export default SprinklerScreen