import { StyleSheet, Platform, StatusBar } from "react-native";

import { COLORS, FONT, SIZES, SHADOWS } from "../../../assets/theme/theme";

const styles = StyleSheet.create({
    container:{
        flex: 1
    },
    gradientBackground:{
        height: '100%',
        width: '100%'
    },
    navigationCount:{
        backgroundColor : 'red',
        paddingVertical: 2,
        paddingHorizontal: SIZES.xxSmall,
        borderRadius: SIZES.xLarge,
        color: COLORS.white,
        fontSize: SIZES.medium,
        position: 'absolute',
        right: 0,
        top: -10
    },
    navigationButtonContainer:{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        paddingTop: SIZES.xxxLarge,
        gap: SIZES.xLarge,
        paddingHorizontal: SIZES.xxLarge
    },
    navigationButtonInnerContainer:{
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    navigationButton:{
        width: '45%',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        gap: SIZES.small,
        paddingVertical: SIZES.small,
        paddingHorizontal: SIZES.medium,
        borderRadius: SIZES.large,
        backgroundColor: COLORS.gray4
    },
    buttonIcon:{
        width: 80,
        height: 80
    },
    buttonTextContainer:{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    },
    buttonTitleText:{
        fontFamily: FONT.bold,
        fontSize: SIZES.medium,
        color: COLORS.white
    },
    modelContainer:{
        width: '100%',
        height: 'auto',
        marginTop: 'auto'
    },
    modelImage:{
        width: 200,
        height: 180,
    },
    // Modal Specific Styles
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // semi-transparent background
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    modalContent: {
        backgroundColor: '#fff',
        width: '80%',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 10,
    },
    modalText: {
        fontFamily: FONT.medium,
        fontSize: 14,
        color: '#444',
        textAlign: 'center',
        marginBottom: 20,
    },
    modalButton: {
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 100,
        paddingHorizontal: 30,
        paddingVertical: 8
    },
    modalButtonText: {
        fontFamily: FONT.medium,
        fontSize: 16
    },
    modalTitleText:{
        fontFamily: FONT.bold,
        fontSize: SIZES.medium,
        marginBottom: SIZES.large
    }
});

export default styles;
