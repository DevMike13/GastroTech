import { View, Text, SafeAreaView, TouchableOpacity, Image, TextInput, ScrollView, Modal } from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import { Ionicons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';

import { UserContext } from '../../UserContext';
import { firebase } from '../../firebase';

import styles from './list.style';

const AccountListScreen = () => {
  const [users, setUsers] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [approvalModalVisible, setApprovalModalVisible] = useState(false); 
  const [userToDelete, setUserToDelete] = useState(null);
  const [userToApprove, setUserToApprove] = useState(null);

  useEffect(() => {
    // Fetch all users from Firestore excluding the admin users
    const fetchUsers = async () => {
      try {
        const usersSnapshot = await firebase.firestore().collection('users').get();
        const userList = usersSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Filter out users with the role 'admin'
        const filteredUsers = userList.filter(user => user.userType !== 'admin');
        setUsers(filteredUsers);
      } catch (error) {
        console.error('Error fetching users:', error);
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Failed to fetch users.',
        });
      }
    };

    fetchUsers();
  }, []);

  const deleteRecord = async () => {
    try {
      if (userToDelete) {
        await firebase.firestore().collection('users').doc(userToDelete.id).delete();
        setUsers(users.filter(user => user.id !== userToDelete.id));
        setModalVisible(false);

        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: 'User deleted successfully!',
        });
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to delete user.',
      });
    }
  };

  const approveUser = async () => {
    try {
      if (userToApprove) {
        await firebase.firestore().collection('users').doc(userToApprove.id).update({
          is_approved: true,
        });

        // Update the users state to reflect the approved status
        setUsers(users.map(user => 
          user.id === userToApprove.id ? { ...user, is_approved: true } : user
        ));
        setApprovalModalVisible(false);

        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: 'User approved successfully!',
        });
      }
    } catch (error) {
      console.error('Error approving user:', error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to approve user.',
      });
    }
  };

  const handleDeletePress = (user) => {
    setUserToDelete(user);
    setModalVisible(true);
  };

  const handleApprovePress = (user) => {
    setUserToApprove(user);
    setApprovalModalVisible(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.historyContainer}>
        {users.length === 0 ? (
          <Text>No users to display.</Text>
        ) : (
          users.map((user) => (
            <View key={user.id} style={styles.userItem}>
                <View style={styles.userInfo}>
                    <Image source={require('../../assets/images/user.png')} style={styles.userImage} />
                    <View>
                        <Text style={styles.userName}>{user.fullName}</Text>
                        <Text style={styles.userEmail}>{user.email}</Text>
                    </View>
                </View>
                <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 10}}>
                  {user.is_approved === false && (
                    <TouchableOpacity
                      style={styles.approveButton}
                      onPress={() => handleApprovePress(user)}
                    >
                      <Ionicons name="checkmark-circle-outline" size={24} color="white" />
                    </TouchableOpacity>
                  )}

                  <TouchableOpacity
                      style={styles.deleteButton}
                      onPress={() => handleDeletePress(user)}
                  >
                      <Ionicons name="trash-outline" size={24} color="white" />
                  </TouchableOpacity>
                  
                </View>
            </View>
          ))
        )}
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Delete Record</Text>
            <Text style={styles.modalText}>Are you sure you want to delete this account?</Text>
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.confirmButton}
                onPress={deleteRecord}
              >
                <Text style={styles.confirmButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Approval Confirmation Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={approvalModalVisible}
        onRequestClose={() => setApprovalModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Approve Account</Text>
            <Text style={styles.modalText}>Are you sure you want to approve this account?</Text>
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setApprovalModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.confirmButton}
                onPress={approveUser}
              >
                <Text style={styles.confirmButtonText}>Approve</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Toast position="bottom" />
    </SafeAreaView>
  );
};

export default AccountListScreen;
