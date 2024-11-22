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
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: SIZES.large
    },
    logoImage:{
        width: 250,
        height: 250,
        marginBottom: SIZES.medium
    },
    textContainer:{
        width: '100%',
    },
    titleText:{
        fontFamily: FONT.bold,
        fontSize: SIZES.large,
        color: COLORS.tertiary
    },
    bulletText:{
        fontFamily: FONT.regular,
        color: COLORS.gray4,
        marginTop: SIZES.small
    },
    buttonContainer:{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: SIZES.xxLarge,
        paddingHorizontal: SIZES.large
    },
    button:{
        textAlign: 'center',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: SIZES.large,
        paddingVertical: SIZES.xSmall,
        backgroundColor: COLORS.tertiary,
        borderRadius: SIZES.xxxLarge
    },
    buttonText:{
        fontFamily: FONT.bold,
        color: COLORS.primary,
        fontSize: SIZES.large,
    },
    toggleText:{
        fontFamily: FONT.bold,
    }
});

export default styles;
