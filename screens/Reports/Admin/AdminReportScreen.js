import { View, Text, SafeAreaView, TouchableOpacity, Image, TextInput } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState, useContext, useEffect } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { DataTable } from 'react-native-paper';

import { UserContext } from '../../../UserContext';
import { firestore, firebase } from '../../../firebase';

import styles from './admin-report.style';

const AdminReportScreen = ({ navigation }) => {

    const { user } = useContext(UserContext);
    const [restaurants, setRestaurants] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [status, setStatus] = useState({});

    const handleGoToCazaReport = () => {
        navigation.navigate("AdminReportCaza")
    }
    const handleGoToLauroReport = () => {
        navigation.navigate("AdminReportLauro")
    }
    const handleGoToShalomReport = () => {
        navigation.navigate("AdminReportShalom")
    }

    const handleGoToCazaParam = () => {
        navigation.navigate("CazaParam")
    }

    const handleGoToLauroParam = () => {
        navigation.navigate("LauroParam")
    }

    const handleGoToShalomParam = () => {
        navigation.navigate("ShalomParam")
    }

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

        const listenForFireStatus = (restaurantData) => {
            restaurantData.forEach(restaurant => {
                const fireRef = firebase.database().ref(`${restaurant.rtdb}/Fire`);

                fireRef.on('value', (snapshot) => {
                    const fireStatus = snapshot.val();
                    setStatus(prevStatus => ({
                        ...prevStatus,
                        [restaurant.rtdb]: fireStatus || 'Loading...',
                    }));
                });
            });
        };


        fetchRestaurants(); 
        return () => {
            restaurants.forEach(restaurant => {
                const fireRef = firebase.database().ref(`${restaurant.rtdb}/Fire`);
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
                            source={require('../../../assets/images/manual-book.png')}
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
                            <Text style={styles.tableTitleText}>Reports</Text>
                        </DataTable.Title>
                        <DataTable.Title>
                            <Text style={styles.tableTitleText}>Parameters</Text>
                        </DataTable.Title>
                    </DataTable.Header>

                    {filteredRestaurants.map(restaurantData => (
                        <DataTable.Row key={restaurantData.id}>
                            <DataTable.Cell>{restaurantData.restaurant_name}</DataTable.Cell>
                            <DataTable.Cell>
                                {restaurantData.restaurant_name === "Caza Plaza" ? (
                                    <TouchableOpacity style={styles.viewButton} onPress={handleGoToCazaReport}>
                                        <Text style={styles.viewButtonText}>View</Text>
                                    </TouchableOpacity>
                                ) : restaurantData.restaurant_name === "Don Lauro Restaurant" ? (
                                    <TouchableOpacity style={styles.viewButton} onPress={handleGoToLauroReport}>
                                        <Text style={styles.viewButtonText}>View</Text>
                                    </TouchableOpacity>
                                ) : restaurantData.restaurant_name === "Plaza De Shalom" ? (
                                    <TouchableOpacity style={styles.viewButton} onPress={handleGoToShalomReport}>
                                        <Text style={styles.viewButtonText}>View</Text>
                                    </TouchableOpacity>
                                ) : (
                                    <></>
                                )}
                            </DataTable.Cell>
                            <DataTable.Cell>
                                {restaurantData.restaurant_name === "Caza Plaza" ? (
                                    <TouchableOpacity style={styles.viewButton} onPress={handleGoToCazaParam}>
                                        <Text style={styles.viewButtonText}>View</Text>
                                    </TouchableOpacity>
                                ) : restaurantData.restaurant_name === "Don Lauro Restaurant" ? (
                                    <TouchableOpacity style={styles.viewButton} onPress={handleGoToLauroParam}>
                                        <Text style={styles.viewButtonText}>View</Text>
                                    </TouchableOpacity>
                                ) : restaurantData.restaurant_name === "Plaza De Shalom" ? (
                                    <TouchableOpacity style={styles.viewButton} onPress={handleGoToShalomParam}>
                                        <Text style={styles.viewButtonText}>View</Text>
                                    </TouchableOpacity>
                                ) : (
                                    <></>
                                )}
                            </DataTable.Cell>
                        </DataTable.Row>
                    ))}
                </DataTable>
            </LinearGradient>
        </SafeAreaView>
  )
}

export default AdminReportScreen