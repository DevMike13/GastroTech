import { StyleSheet, Platform, StatusBar, Dimensions } from "react-native";

import { COLORS, FONT, SIZES, SHADOWS } from "../../assets/theme/theme";

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: COLORS.lightWhite
    },
    historyContainer:{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 20
    },
    contentContainer:{
        width: '95%',
        height: 'auto',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: SIZES.xxSmall,
        padding: 10,
        marginBottom: SIZES.large,
        backgroundColor: COLORS.lightWhite,
        borderRadius: SIZES.small,
        ...SHADOWS.large
    },
    recordAddressText: {
        fontFamily: FONT.regular,
        fontSize: SIZES.xSmall,
        maxWidth: 150
    },
    recordNameText:{
        fontFamily: FONT.regular,
    },
    recordDateText: {
        fontFamily: FONT.bold,
        fontSize: SIZES.medium
    },
    recordTimeText: {
        fontFamily: FONT.bold,
        fontSize: SIZES.medium
    },
    recordWhatText:{
        fontFamily: FONT.regular,
        backgroundColor: 'red',
        color: COLORS.white,
        paddingHorizontal: 5,
        paddingVertical: 2,
        borderRadius: SIZES.xxSmall
    },
    deleteButton:{
        backgroundColor: 'red',
        padding: 5,
        borderRadius: SIZES.large

    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: '80%',
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    modalText: {
        fontSize: 16,
        marginBottom: 20,
        textAlign: 'center',
    },
    modalButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    cancelButton: {
        padding: 10,
        backgroundColor: 'gray',
        borderRadius: 5,
        marginRight: 10,
    },
    confirmButton: {
        padding: 10,
        backgroundColor: 'red',
        borderRadius: 5,
    },
    cancelButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    confirmButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    
    
});

export default styles;
