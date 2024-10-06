import { StyleSheet, Platform, StatusBar } from "react-native";

import { COLORS, FONT, SIZES, SHADOWS } from "../../../assets/theme/theme";

const styles = StyleSheet.create({
    container:{
        flex: 1,
        // paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        height: '100%',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        gap: SIZES.xxxLarge
    },
    gradientBackground:{
        height: '100%',
        width: '100%'
    },
    logoImage:{
        width: 150,
        height: 150
    },
    contentContainer:{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        width: '100%',
        paddingHorizontal: SIZES.large,
        marginTop: SIZES.xxxLarge,
        gap: SIZES.large
    },
    textContainer:{
        display: 'flex',
        flexDirection: 'column',
        gap: SIZES.medium
    },
    titleText:{
        fontFamily: FONT.bold,
        fontSize: SIZES.large,
        color: COLORS.white,
    },
    subTitleText:{
        fontFamily: FONT.bold,
        color: COLORS.white
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
        gap: SIZES.medium,
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
    buttonCancel:{
        textAlign: 'center',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: SIZES.large,
        paddingVertical: SIZES.xSmall,
        backgroundColor: COLORS.gray4,
        borderRadius: SIZES.xxxLarge
    },
    buttonText:{
        fontFamily: FONT.bold,
        color: COLORS.primary,
        fontSize: SIZES.large,
    }
});

export default styles;
