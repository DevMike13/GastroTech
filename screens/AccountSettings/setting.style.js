import { StyleSheet, Platform, StatusBar, Dimensions } from "react-native";

import { COLORS, FONT, SIZES, SHADOWS } from "../../assets/theme/theme";

const styles = StyleSheet.create({
    container:{
        flex: 1
    },
    gradientBackground:{
        height: '100%',
        paddingHorizontal: SIZES.xxSmall
    },
    contentContainer:{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: SIZES.xxxLarge
    },
    mainContent:{
        position: 'relative',
        marginTop: 'auto',
        backgroundColor: COLORS.white,
        width: '90%',
        height: '80%',
        display: 'flex',
        alignItems: 'center',
        borderTopStartRadius: SIZES.medium,
        borderTopEndRadius: SIZES.medium
    },
    editableContainer:{
        display: 'flex',
        alignItems: 'center',
        marginTop: -50
    },
    usernameText:{
        fontFamily: FONT.bold,
        fontSize: SIZES.medium,
        marginTop: 20,
        color: COLORS.tertiary
    },
    editButton:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        gap: SIZES.xxSmall,
        marginTop: SIZES.large,
        backgroundColor: COLORS.gray,
        paddingHorizontal: 20,
        paddingVertical: 2,
        borderRadius: SIZES.small
    },
    editButtonText:{
        fontFamily: FONT.bold,
        fontSize: SIZES.medium,
        color: COLORS.lightWhite
    },
    buttonContainer:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: SIZES.medium,
        marginTop: SIZES.large
    },
    saveButton:{
        backgroundColor: COLORS.gray,
        paddingHorizontal: 20,
        paddingVertical: 2,
        borderRadius: SIZES.small
    },
    saveButtonText:{
        fontFamily: FONT.medium,
        color: COLORS.lightWhite
    },
    cancelEditButtonText:{
        fontFamily: FONT.medium,
        color: COLORS.tertiary
    },
    emailContainer:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    userEmailText:{
        fontFamily: FONT.regular,
        fontSize: SIZES.small,
        color: 'blue'
    },

    changePasswordButton:{
        marginTop: 'auto',
        backgroundColor: COLORS.tertiary,
        width: '70%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: SIZES.large,
        marginBottom: SIZES.large
    },
    changePasswordButtonText:{
        fontFamily: FONT.medium,
        fontSize: SIZES.medium,
    },
    inputContainer:{
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        marginTop: SIZES.large,
        height: 55,
    },
    inputWrapper: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        borderColor: '#ccc',
        borderWidth: 1,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: SIZES.medium,
        height: "100%",
        marginBottom: 10,
    },
    inInput: {
        fontFamily: FONT.regular,
        width: "80%",
        height: "100%",
        color: 'black',
        paddingHorizontal: SIZES.medium,
    },
    // MODAL
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 0,
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: '90%',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20
    },
    modalButtonCancel: {
        backgroundColor: '#f44336',
        padding: 10,
        borderRadius: 5,
        marginRight: 10,
    },
    modalButtonSave: {
        backgroundColor: '#4CAF50',
        padding: 10,
        borderRadius: 5,
    },
    modalButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    
    
});

export default styles;
