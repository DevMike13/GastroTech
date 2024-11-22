import { View, Text, SafeAreaView, TouchableOpacity, Image, TextInput, ScrollView, Modal } from 'react-native'
import React, { useState, useContext, useEffect } from 'react'
import { Ionicons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';

import { UserContext } from '../../UserContext';
import { firebase } from '../../firebase';

import styles from './notification.style';

const NotificationScreen = () => {
    const [historyRecords, setHistoryRecords] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState(null);
    const { user } = useContext(UserContext);
    
    useEffect(() => {
        const fetchHistoryRecords = async () => {
            try {
                const records = [];
                const querySnapshot = await firebase.firestore()
                    .collection('notifications')
                    .where('restaurant_name', '==', user.restaurantName)
                    .orderBy('date_time', 'desc') // Order by date_time in descending order
                    .get();
                
                querySnapshot.forEach((doc) => {
                    const data = doc.data();
                    records.push({
                        id: doc.id,
                        ...data,
                        date_time: data.date_time?.toDate()
                    });
                });
                
                setHistoryRecords(records);
            } catch (error) {
                console.error("Error fetching history records: ", error);
            }
        };

        fetchHistoryRecords();
    }, [user.restaurantName]);

    const showDeleteConfirmation = (record) => {
        setSelectedRecord(record);
        setModalVisible(true);
    };

    const deleteRecord = async () => {
        if (!selectedRecord) return;

        try {
            await firebase.firestore().collection('notifications').doc(selectedRecord.id).delete();
            setHistoryRecords((prevRecords) => prevRecords.filter((rec) => rec.id !== selectedRecord.id));
            setModalVisible(false);
            setSelectedRecord(null);
            Toast.show({
                type: 'success',
                text1: 'History Deleted',
                text2: 'Record deleted successfully!',
                visibilityTime: 3000,
            });
        } catch (error) {
            console.error("Error deleting record: ", error);
            Toast.show({
                type: 'error',
                text1: 'Deletion Failed',
                text2: 'Failed to delete!',
                visibilityTime: 3000,
            });
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.historyContainer}>
                {historyRecords.length > 0 ? (
                    historyRecords.map((record) => (
                        <View style={styles.contentContainer} key={record.id}>
                            <View>
                                <Text style={styles.recordDateText}>{record.date_time ? record.date_time.toLocaleDateString() : 'N/A'}</Text>
                                <Text style={styles.recordNameText}>{record.restaurant_name}</Text>
                                <Text style={styles.recordAddressText} numberOfLines={1} ellipsizeMode="tail">{record.Address}</Text>
                            </View>
                            <View>
                                <Text style={styles.recordTimeText}>
                                    {record.date_time
                                        ? new Date(record.date_time).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
                                        : 'N/A'}
                                </Text>
                                <Text style={styles.recordWhatText}>
                                    {record.fire_status}
                                </Text>
                            </View>

                            <TouchableOpacity style={styles.deleteButton} onPress={() => showDeleteConfirmation(record)}>
                                <Ionicons name="trash-outline" size={22} color="white" />
                            </TouchableOpacity>
                        </View>
                    ))
                ) : (
                    <View style={styles.noDataContainer}>
                        <Text style={styles.noDataText}>No Data Found</Text>
                    </View>
                )}
            </ScrollView>

            {/* Modal for delete confirmation */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Delete Record</Text>
                        <Text style={styles.modalText}>Are you sure you want to delete this record?</Text>
                        <View style={styles.modalButtonContainer}>
                            <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
                                <Text style={styles.cancelButtonText}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.confirmButton} onPress={deleteRecord}>
                                <Text style={styles.confirmButtonText}>Delete</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
            
            <Toast position="bottom" />
        </SafeAreaView>
    )
}

export default NotificationScreen
