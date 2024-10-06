import { View, Text, SafeAreaView, TouchableOpacity, Image } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState, useContext, useEffect } from 'react'
import MapView, { Marker } from 'react-native-maps';

import { UserContext } from '../../UserContext';
import { firestore } from '../../firebase';

import styles from './location.style';

const LocationsScreen = ({ navigation }) => {
    const { user } = useContext(UserContext);
    // console.log(user);

    const [markers, setMarkers] = useState([]);

    useEffect(() => {
        const fetchMarkers = async () => {
            try {
            const snapshot = await firestore.collection('restaurants').get();
            const markerData = snapshot.docs.map(doc => {
                const data = doc.data();
                return {
                    id: doc.id,
                    restaurant_name: data.restaurant_name,
                    address: data.address,
                    marker: data.marker
                };
            });
                setMarkers(markerData);
                // console.log(markerData);
            } catch (error) {
                console.error('Error fetching marker data:', error);
            }
        };

        fetchMarkers(); 
    }, []);

    const images = {
        'r0W9Sr5ltJRpT8NjMKax': require('../../assets/images/plaza-shalom.jpg'),
        'cTWSFTphhd4mpsSxxgo1': require('../../assets/images/caza-plaza.jpg'),
        '2SXijMaEWGrWXch8BK5F': require('../../assets/images/don-lauro.jpg'),
    };

    return (
        <SafeAreaView style={styles.container}>
            <LinearGradient
                colors={['#11774e', '#14b045', '#0c403b']}
                locations={[0, 0.4, 1]}
                style={styles.gradientBackground}
            >
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: 13.9619,
                        longitude: 121.5260,
                        latitudeDelta: 0.008,
                        longitudeDelta: 0.008,
                    }}
                >
                    {markers.map((markerData, index) => (
                        markerData.marker && (
                            <Marker
                                key={markerData.id}
                                coordinate={{
                                    latitude: markerData.marker.latitude,
                                    longitude: markerData.marker.longitude,
                                }}
                                title={markerData.restaurant_name}
                                description={markerData.address}
                            >
                                <View style={styles.markerContainer}>
                                    <Image
                                        source={images[markerData.id]}
                                        style={styles.markerImage} 
                                        resizeMode="contain"
                                    />
                                </View> 
                            </Marker>
                        )
                    ))}
                </MapView>
            </LinearGradient>
        </SafeAreaView>
    )
}

export default LocationsScreen