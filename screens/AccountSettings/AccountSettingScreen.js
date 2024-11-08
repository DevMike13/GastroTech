import { View, Text, SafeAreaView, TouchableOpacity, Image, TextInput, Modal, Alert } from 'react-native';
import React, { useState, useContext } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Toast from 'react-native-toast-message';
import { UserContext } from '../../UserContext';
import { firebase } from '../../firebase';
import styles from './setting.style';

const AccountSettingScreen = () => {
    const { user, setUser } = useContext(UserContext);
    const [editableUsername, setEditableUsername] = useState(user?.fullName || '');
    const [isEditing, setIsEditing] = useState(false);

    // Change password modal states
    const [isChangePasswordModalVisible, setIsChangePasswordModalVisible] = useState(false);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');

    const [isOldPasswordVisible, setIsOldPasswordVisible] = useState(false);
    const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false);
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
    const togglePasswordVisibility = () => {
        setIsOldPasswordVisible(!isOldPasswordVisible);
    };

    const toggleNewPasswordVisibility = () => {
        setIsNewPasswordVisible(!isNewPasswordVisible);
    };

    const toggleConfirmPasswordVisibility = () => {
        setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
    };

    const handleSaveUsername = async () => {
        if (editableUsername.trim() === '') {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Username cannot be empty!',
            });
            return;
        }

        try {
            const userRef = firebase.firestore().collection('users').doc(user?.uid); 
            await userRef.update({
                fullName: editableUsername,
            });

            setUser((prevUser) => ({
                ...prevUser,
                fullName: editableUsername,
            }));

            setIsEditing(false);

            Toast.show({
                type: 'success',
                text1: 'Success',
                text2: 'Username updated successfully!',
            });
        } catch (error) {
            console.error("Error updating username: ", error);
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Failed to update username.',
            });
        }
    };

    const handleCancelEdit = () => {
        setEditableUsername(user?.fullName || '');
        setIsEditing(false);
    };

    const handleChangePassword = async () => {
        if (newPassword !== confirmNewPassword) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'New password and confirm password do not match!',
            });
            return;
        }

        if (newPassword.length < 6) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Password must be at least 6 characters long!',
            });
            return;
        }

        const userCredential = firebase.auth().currentUser;

        try {
            
            const cred = firebase.auth.EmailAuthProvider.credential(userCredential.email, oldPassword);
            await userCredential.reauthenticateWithCredential(cred);

            await userCredential.updatePassword(newPassword);

            setIsChangePasswordModalVisible(false); 

            Toast.show({
                type: 'success',
                text1: 'Success',
                text2: 'Password updated successfully!',
            });

            setOldPassword('');
            setNewPassword('');
            setConfirmNewPassword('');
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Failed to update password. Please check your old password.',
            });
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <LinearGradient
                colors={['#11774e', '#14b045', '#0c403b']}
                locations={[0, 0.4, 1]}
                style={styles.gradientBackground}
            >
                <View style={styles.contentContainer}>
                    <View style={styles.mainContent}>
                        <View style={styles.editableContainer}>
                            <Image
                                source={require('../../assets/images/user.png')}
                                resizeMode='contain'
                                style={styles.userImage}
                            />
                            
                            <View style={styles.usernameContainer}>
                                {isEditing ? (
                                    <TextInput
                                        style={styles.usernameTextInput}
                                        value={editableUsername}
                                        onChangeText={setEditableUsername}
                                        autoFocus
                                    />
                                ) : (
                                    <Text style={styles.usernameText}>Hello, {user?.fullName}!</Text>
                                )}
                            </View>

                            <View style={styles.emailContainer}>
                                <Ionicons name="at-outline" size={24} color="blue" />
                                <Text style={styles.userEmailText}>{user?.email}</Text>
                            </View>
                            
                            {isEditing ? (
                                <View style={styles.buttonContainer}>
                                    <TouchableOpacity style={styles.saveButton} onPress={handleSaveUsername}>
                                        <Text style={styles.saveButtonText}>Save</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.cancelEditButton} onPress={handleCancelEdit}>
                                        <Text style={styles.cancelEditButtonText}>Cancel</Text>
                                    </TouchableOpacity>
                                </View>
                            ) : (
                                <TouchableOpacity style={styles.editButton} onPress={() => setIsEditing(true)}>
                                    <Ionicons name="pencil-outline" size={20} color="white" />
                                    <Text style={styles.editButtonText}>Edit</Text>
                                </TouchableOpacity>
                            )}
                        </View>

                        <TouchableOpacity
                            style={styles.changePasswordButton}
                            onPress={() => setIsChangePasswordModalVisible(true)}
                        >
                            <Text style={styles.changePasswordButtonText}>Change Password</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </LinearGradient>

            {/* Change Password Modal */}
            <Modal
                visible={isChangePasswordModalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setIsChangePasswordModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Change Password</Text>
                        
                        <View style={styles.inputContainer}>
                            <View style={styles.inputWrapper}>
                                <TextInput
                                    style={styles.inInput}
                                    placeholder="Old Password"
                                    value={oldPassword}
                                    onChangeText={setOldPassword}
                                    secureTextEntry={!isOldPasswordVisible}
                                    placeholderTextColor="black"
                                />
                                <TouchableOpacity onPress={togglePasswordVisibility} style={styles.iconContainer}>
                                    <Ionicons name={isOldPasswordVisible ? 'eye-outline' : 'eye-off-outline'} size={28} color="black" />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.inputContainer}>
                            <View style={styles.inputWrapper}>
                                <TextInput
                                    style={styles.inInput}
                                    placeholder="New Password"
                                    value={newPassword}
                                    onChangeText={setNewPassword}
                                    secureTextEntry={!isNewPasswordVisible}
                                    placeholderTextColor="black"
                                />
                                <TouchableOpacity onPress={toggleNewPasswordVisibility} style={styles.iconContainer}>
                                    <Ionicons name={isNewPasswordVisible ? 'eye-outline' : 'eye-off-outline'} size={28} color="black" />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.inputContainer}>
                            <View style={styles.inputWrapper}>
                                <TextInput
                                    style={styles.inInput}
                                    placeholder="Confirm New Password"
                                    value={confirmNewPassword}
                                    onChangeText={setConfirmNewPassword}
                                    secureTextEntry={!isConfirmPasswordVisible}
                                    placeholderTextColor="black"
                                />
                                <TouchableOpacity onPress={toggleConfirmPasswordVisibility} style={styles.iconContainer}>
                                    <Ionicons name={isConfirmPasswordVisible ? 'eye-outline' : 'eye-off-outline'} size={28} color="black" />
                                </TouchableOpacity>
                            </View>
                        </View>
                        
                        <View style={styles.modalButtons}>
                            <TouchableOpacity
                                style={styles.modalButtonCancel}
                                onPress={() => setIsChangePasswordModalVisible(false)}
                            >
                                <Text style={styles.modalButtonText}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.modalButtonSave}
                                onPress={handleChangePassword}
                            >
                                <Text style={styles.modalButtonText}>Save</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                {isChangePasswordModalVisible && (
                    <Toast position="top" />
                )}

                
            </Modal>
            
           {
            isChangePasswordModalVisible == true ? (
                <></>
            ) : (
                <Toast position="top" />
            )
           }
            
        </SafeAreaView>
    );
}

export default AccountSettingScreen;
