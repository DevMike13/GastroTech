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
    navigationButtonContainer:{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        marginTop: SIZES.xxxLarge,
        gap: SIZES.medium,
        paddingHorizontal: SIZES.xxLarge
    },
    navigationButton:{
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        paddingVertical: SIZES.small,
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
        fontFamily: FONT.medium,
        fontSize: SIZES.medium,
        color: COLORS.gray2
    },
    buttonStatusText:{
        fontFamily: FONT.bold,
        fontSize: SIZES.large,
        color: COLORS.white
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
    fireDetectionContainer:{
        width: 'auto',
        height: 100,
        position: 'absolute',
        top: 0,
        left: 180,
        borderRadius: SIZES.small,
        backgroundColor: COLORS.white
    },
    emergencyImage:{
        width: 80,
        height: 80,
        margin: SIZES.small
    },
    tailContainer:{
        width: '100%',
        height: '100%',
        position: 'relative'
    },
    tail:{
        position: 'absolute',
        bottom: 20,
        left: -20,
        width: 0,
        height: 0,
        borderLeftWidth: 20,
        borderRightWidth: 0,
        borderTopWidth: 20,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderTopColor: COLORS.white
    }
});

export default styles;
