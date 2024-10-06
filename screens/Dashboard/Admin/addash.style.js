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
        position: 'absolute',
        bottom: 0
    },
    modelImage:{
        width: 200,
        height: 200
    }
});

export default styles;
