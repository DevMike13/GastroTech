import React, { useState, useEffect, useContext } from 'react';
import { View, Text, SafeAreaView, Image, TouchableOpacity } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import { Switch } from 'react-native-paper';

import { firebase } from '../../firebase';
import { UserContext } from '../../UserContext';

import styles from './device.style';

const DeviceScreen = ({ navigation }) => {

    const [isSprinklerOn, setIsSprinklerOn] = useState(false); // State for Sprinkler toggle
    const [isExhaustOn, setIsExhaustOn] = useState(false); // State for Exhaust toggle
    const { user } = useContext(UserContext);

    useEffect(() => {
        if (!user || !user.restaurantName) return;
    
        let sprinklerRef, exhaustRef;
    
        if (user.restaurantName === "Caza Plaza") {
          sprinklerRef = firebase.database().ref('/CazaPlaza/SprinklerState');
          exhaustRef = firebase.database().ref('/CazaPlaza/ExhaustState');
        } else if (user.restaurantName === "Plaza De Shalom") {
          sprinklerRef = firebase.database().ref('/PlazaShalom/SprinklerState');
          exhaustRef = firebase.database().ref('/PlazaShalom/ExhaustState');
        } else if (user.restaurantName === "Don Lauro Restaurant") {
          sprinklerRef = firebase.database().ref('/DonLauro/SprinklerState');
          exhaustRef = firebase.database().ref('/DonLauro/ExhaustState');
        }
    
        const fetchStates = () => {
          sprinklerRef?.on('value', (snapshot) => {
            const state = snapshot.val();
            setIsSprinklerOn(state === 'ON');
          });
    
          exhaustRef?.on('value', (snapshot) => {
            const state = snapshot.val();
            setIsExhaustOn(state === 'ON');
          });
        };
    
        fetchStates();
    
        return () => {
          sprinklerRef?.off();
          exhaustRef?.off();
        };
      }, [user]);
    
      const toggleSprinkler = async () => {
        if (!user || !user.restaurantName) return;
    
        let sprinklerRef;
    
        if (user.restaurantName === "Caza Plaza") {
          sprinklerRef = firebase.database().ref('/CazaPlaza/SprinklerState');
        } else if (user.restaurantName === "Plaza De Shalom") {
          sprinklerRef = firebase.database().ref('/PlazaShalom/SprinklerState');
        } else if (user.restaurantName === "Don Lauro Restaurant") {
          sprinklerRef = firebase.database().ref('/DonLauro/SprinklerState');
        }
    
        try {
          const newState = isSprinklerOn ? 'OFF' : 'ON';
          setIsSprinklerOn(!isSprinklerOn);
          await sprinklerRef.set(newState);
        } catch (error) {
          console.error('Error updating SprinklerState:', error);
        }
      };
    
      const toggleExhaust = async () => {
        if (!user || !user.restaurantName) return;
    
        let exhaustRef;
    
        if (user.restaurantName === "Caza Plaza") {
          exhaustRef = firebase.database().ref('/CazaPlaza/ExhaustState');
        } else if (user.restaurantName === "Plaza De Shalom") {
          exhaustRef = firebase.database().ref('/PlazaShalom/ExhaustState');
        } else if (user.restaurantName === "Don Lauro Restaurant") {
          exhaustRef = firebase.database().ref('/DonLauro/ExhaustState');
        }
    
        try {
          const newState = isExhaustOn ? 'OFF' : 'ON';
          setIsExhaustOn(!isExhaustOn);
          await exhaustRef.set(newState);
        } catch (error) {
          console.error('Error updating ExhaustState:', error);
        }
      };

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
            <View style={[styles.textContainer, { marginTop: 10}]}>
                <Text style={styles.titleText}>Activate</Text>

                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={styles.toggleText}>Water Sprinkler: </Text>
                    <Switch
                        value={isSprinklerOn}
                        onValueChange={toggleSprinkler}
                        color="#4CAF50"
                    />
                </View>
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={styles.toggleText}>Exhaust Fan: </Text>
                    <Switch
                        value={isExhaustOn}
                        onValueChange={toggleExhaust}
                        color="#FF5722"
                    />
                </View>
            </View>
        </View>
    </SafeAreaView>
  )
}

export default DeviceScreen