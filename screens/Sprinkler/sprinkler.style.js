import { StyleSheet, Platform, StatusBar } from "react-native";

import { COLORS, FONT, SIZES, SHADOWS } from "../../assets/theme/theme";

const styles = StyleSheet.create({
    container:{
        flex: 1,
        // paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    gradientBackground:{
        height: '100%'
    },
    contentContainer:{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: SIZES.xxLarge,
        gap: SIZES.xxLarge
    },
    sprinklerContentContainer:{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: SIZES.xxLarge,
        gap: SIZES.medium
    },
    emergencyImage: {
        width: 80,
        height: 80,
    },
    sprinklerImage: {
        width: '80%'
    },
    sprinklerContentText:{
        fontFamily: FONT.medium,
        color: COLORS.white,
        paddingHorizontal: SIZES.xxxLarge,
        fontSize: SIZES.medium,
        fontStyle: 'italic'
    },
    contentText:{
        fontFamily: FONT.medium,
        color: COLORS.white,
        paddingHorizontal: SIZES.xxxLarge,
        fontSize: SIZES.medium
    },
    outerCircle:{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 90,
        height: 90,
        borderRadius: 200,
        backgroundColor: COLORS.white
    },
    innerCircle:{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 80,
        height: 80,
        borderRadius: 200,
        backgroundColor: COLORS.white,
        borderWidth: 5,
        borderColor: 'red'
    },
    counterText:{
        fontFamily: FONT.bold,
        color: COLORS.tertiary,
        fontSize: SIZES.large
    },
    button:{
        textAlign: 'center',
        width: '70%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: SIZES.large,
        paddingVertical: SIZES.xSmall,
        backgroundColor: COLORS.tertiary,
        borderRadius: SIZES.xxxLarge
    },
    buttonText:{
        fontFamily: FONT.medium,
        color: COLORS.white,
        fontSize: SIZES.medium
    },
    modelContainer:{
        width: '100%',
        position: 'absolute',
        bottom: 0
    },
    modelImage:{
        width: 200,
        height: 200
    },
    homeButton:{
        position: 'absolute',
        left: 190,
        top: 100
    }
});

export default styles;
