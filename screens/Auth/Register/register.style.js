import { StyleSheet, Platform, StatusBar } from "react-native";

import { COLORS, FONT, SIZES, SHADOWS } from "../../../assets/theme/theme";

const styles = StyleSheet.create({
    container:{
        flex: 1,
        // paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    keyboardAvoid:{
        flex: 1
    },
    scrollView:{
        flexGrow: 1
    },
    gradientBackground:{
        height: '100%',
        width: '100%'
    },
    contentContainer:{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: SIZES.large
    },
    logoImage:{
        width: 150,
        height: 150
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
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        justifyContent: "center",
        alignItems: "center",
        borderRadius: SIZES.medium,
        height: "100%",
        color: COLORS.white
    },
    inInput: {
        fontFamily: FONT.regular,
        width: "100%",
        height: "100%",
        paddingHorizontal: SIZES.medium,
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
    signupContainer:{
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: SIZES.small,
        gap: SIZES.xxSmall
    },
    signupText:{
        fontFamily: FONT.medium,
        color: COLORS.white,
    },
    signupButtonText:{
        fontFamily: FONT.medium,
        color: 'blue',
        textDecorationLine: 'underline'
    }
});

export default styles;
