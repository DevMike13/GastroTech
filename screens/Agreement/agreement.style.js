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
    mainTitleText:{
        fontFamily: FONT.bold,
        paddingTop: SIZES.xxxLarge + 10,
        paddingBottom: 20,
        paddingHorizontal: SIZES.small,
        fontSize: SIZES.large,
        color: COLORS.lightWhite
    },
    headingText:{
        fontFamily: FONT.medium,
        paddingHorizontal: SIZES.small,
        paddingBottom: SIZES.medium,
        textAlign: 'justify',
        color: COLORS.lightWhite
    },
    titleText:{
        fontFamily: FONT.bold,
        paddingHorizontal: SIZES.small,
        color: COLORS.lightWhite,
        fontSize: SIZES.medium
    },
    contentText:{
        fontFamily: FONT.regular,
        paddingHorizontal: SIZES.small,
        color: COLORS.lightWhite,
        marginVertical: SIZES.medium,
        textAlign: 'justify',
    },
    buttonContainer:{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20
    },
    buttonStyle:{
        width: '50%',
        backgroundColor: COLORS.tertiary,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
        borderRadius: SIZES.large
    },
    buttonText:{
        fontFamily: FONT.bold,
        color: COLORS.lightWhite
    }
});

export default styles;
