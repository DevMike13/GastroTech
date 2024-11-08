import { View, Text, SafeAreaView, TouchableOpacity, Image, TextInput } from 'react-native'
import {React, useState, useContext, useEffect} from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { firebase } from '../../../firebase';

import { UserContext } from '../../../UserContext';

import styles from './addash.style';

const AdminDashboardScreen = ({ navigation }) => {

    const { user } = useContext(UserContext);
    const handleGoToLocations = () => {
        navigation.navigate('Locations');
    }

    const handleGoToHistory = async () => {
        try {
            const querySnapshot = await firebase.firestore()
                .collection('fire_detection_records')
                .where('status', '==', 'new')
                .get();
    
            const batch = firebase.firestore().batch();
    
            querySnapshot.forEach((doc) => {
                batch.update(doc.ref, { status: 'old' });
            });
    
            await batch.commit();
    
            navigation.navigate('History');
        } catch (error) {
            console.error("Error updating records status: ", error);
        }
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

    const [fireDetectedCount, setFireDetectedCount] = useState(0);
    const [newStatusCount, setNewStatusCount] = useState(0);
    const [statuses, setStatuses] = useState({
        CazaPlaza: 'No Detection',
        PlazaShalom: 'No Detection',
        DonLauro: 'No Detection'
    });

    useEffect(() => {
        const statusRefs = [
            { name: 'CazaPlaza', ref: firebase.database().ref('CazaPlaza/Fire') },
            { name: 'PlazaShalom', ref: firebase.database().ref('PlazaShalom/Fire') },
            { name: 'DonLauro', ref: firebase.database().ref('DonLauro/Fire') }
        ];

        const listenForStatusChanges = () => {
            statusRefs.forEach(({ name, ref }) => {
                ref.on('value', (snapshot) => {
                    const statusValue = snapshot.val() === 'Fire Detected' ? 'Fire Detected' : 'No Detection';
                    setStatuses((prevStatuses) => ({
                        ...prevStatuses,
                        [name]: statusValue,
                    }));
                });
            });
        };
       
        listenForStatusChanges(); 

        return () => {
            statusRefs.forEach(({ ref }) => ref.off('value'));
        };
    }, []);

    useEffect(() => {
        const count = Object.values(statuses).filter(status => status === 'Fire Detected').length;
        setFireDetectedCount(count);
    }, [statuses]);

    useEffect(() => {
        const unsubscribe = firebase.firestore()
            .collection('fire_detection_records')
            .where('status', '==', 'new')
            .onSnapshot(snapshot => {
                setNewStatusCount(snapshot.size);
            });
        return () => unsubscribe();
    }, []);

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
                    {
                        fireDetectedCount > 0 ? (
                            <Text style={styles.navigationCount}>
                                {fireDetectedCount}
                            </Text>
                        ) : (
                            <></>
                        )
                    }
                    
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
                <TouchableOpacity style={styles.navigationButton} onPress={handleGoToHistory}>
                    {
                        newStatusCount > 0 ? (
                            <Text style={styles.navigationCount}>
                                {newStatusCount}
                            </Text>
                        ) : (
                            <></>
                        )
                    }
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

export default AdminDashboardScreen