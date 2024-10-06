import { View, Text, SafeAreaView, TouchableOpacity, Image, TextInput } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState, useContext, useEffect } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { DataTable } from 'react-native-paper';

import { UserContext } from '../../UserContext';
import { firestore } from '../../firebase';

import styles from './restaurant.style';

const RestaurantsScreen = ({ navigation }) => {

    const { user } = useContext(UserContext);
    const [restaurants, setRestaurants] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchRestaurants = async () => {
            try {
            const snapshot = await firestore.collection('restaurants').get();
            const restaurantData = snapshot.docs.map(doc => {
                const data = doc.data();
                return {
                    id: doc.id,
                    restaurant_name: data.restaurant_name,
                    address: data.address
                };
            });
                setRestaurants(restaurantData);
                // console.log(restaurantData);

            } catch (error) {
                console.error('Error fetching marker data:', error);
            }
        };

        fetchRestaurants(); 
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
                    </DataTable.Header>

                    {filteredRestaurants.map(restaurantData => (
                        <DataTable.Row key={restaurantData.id}>
                            <DataTable.Cell>{restaurantData.restaurant_name}</DataTable.Cell>
                            <DataTable.Cell>{restaurantData.address}</DataTable.Cell>
                        </DataTable.Row>
                    ))}
                </DataTable>
            </LinearGradient>
        </SafeAreaView>
    )
}

export default RestaurantsScreen