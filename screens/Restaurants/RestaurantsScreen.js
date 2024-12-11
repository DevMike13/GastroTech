import { View, Text, SafeAreaView, TouchableOpacity, Image, TextInput } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState, useContext, useEffect } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { DataTable } from 'react-native-paper';

import { UserContext } from '../../UserContext';
import { firestore, firebase } from '../../firebase';

import styles from './restaurant.style';

const RestaurantsScreen = ({ navigation }) => {

    const { user } = useContext(UserContext);
    const [restaurants, setRestaurants] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [status, setStatus] = useState({});

    useEffect(() => {
        const fetchRestaurants = async () => {
            try {
            const snapshot = await firestore.collection('restaurants').get();
            const restaurantData = snapshot.docs.map(doc => {
                const data = doc.data();
                return {
                    id: doc.id,
                    restaurant_name: data.restaurant_name,
                    address: data.address,
                    rtdb: data.rtdb
                };
            }); 
                setRestaurants(restaurantData);
                listenForFireStatus(restaurantData);

            } catch (error) {
                console.error('Error fetching marker data:', error);
            }
        };

        const listenForFireStatus = () => {
            // Hardcoded paths for the restaurants
            const restaurantPaths = [
                'CazaPlaza',
                'DonLauro',
                'PlazaShalom',
            ];

            restaurantPaths.forEach((restaurant) => {
                const fireRef = firebase.database().ref(`/${restaurant}/Fire`);

                fireRef.on('value', (snapshot) => {
                    const fireStatus = snapshot.val();
                    setStatus(prevStatus => ({
                        ...prevStatus,
                        [restaurant]: fireStatus || 'Loading...',
                    }));
                });
            });
        };


        fetchRestaurants(); 
        return () => {
            const restaurantPaths = [
                'CazaPlaza',
                'DonLauro',
                'PlazaShalom',
            ];

            restaurantPaths.forEach((restaurant) => {
                const fireRef = firebase.database().ref(`/${restaurant}/Fire`);
                fireRef.off('value');
            });
        };
    }, []);

    const filteredRestaurants = restaurants.filter(restaurant => {
        return (
            restaurant.restaurant_name.toLowerCase().includes(searchQuery.toLowerCase())
        );
    });
 
    return (
        <SafeAreaView style={styles.container}>
            <LinearGradient
                colors={['#11774e', '#14b045', '#0c403b']}
                locations={[0, 0.4, 1]}
                style={styles.gradientBackground}
            >
                <View style={styles.contentContainer}>
                    <View style={styles.titleContainer}>
                        <Image
                            source={require('../../assets/images/restaurant.png')}
                            resizeMode="contain"
                        />
                        <Text style={styles.titleText}>
                            Restaurants
                        </Text>
                    </View>
                    <View style={styles.searchContainer}>
                        <Ionicons name="search-outline" size={32} color="gray" />
                        <TextInput
                            placeholder='Search...'
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                            style={styles.searchInput}
                        />
                    </View> 
                </View>

                <DataTable style={{backgroundColor:'white'}}>
                    <DataTable.Header style={{backgroundColor: 'gray'}}>
                        <DataTable.Title>
                            <Text style={styles.tableTitleText}>Name</Text>
                        </DataTable.Title>
                        <DataTable.Title>
                            <Text style={styles.tableTitleText}>Address</Text>
                        </DataTable.Title>
                        <DataTable.Title>
                            <Text style={styles.tableTitleText}>Status</Text>
                        </DataTable.Title>
                    </DataTable.Header>

                    {filteredRestaurants.map(restaurantData => (
                        <DataTable.Row key={restaurantData.id}>
                            <DataTable.Cell>{restaurantData.restaurant_name}</DataTable.Cell>
                            <DataTable.Cell>{restaurantData.address}</DataTable.Cell>
                            <DataTable.Cell>
                                {status[restaurantData.rtdb] === 'Fire Detected!' 
                                ? (
                                    <Text style={styles.statusText}>
                                        Fire Detected
                                    </Text>
                                )
                                : (
                                    <Text style={styles.statusNormalText}>
                                        Normal
                                    </Text>
                                )}
                            </DataTable.Cell>
                        </DataTable.Row>
                    ))}
                </DataTable>
            </LinearGradient>
        </SafeAreaView>
    )
}

export default RestaurantsScreen