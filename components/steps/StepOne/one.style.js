import { StyleSheet, Platform, StatusBar } from "react-native";

import { COLORS, FONT, SIZES, SHADOWS } from "../../../assets/theme/theme";

const styles = StyleSheet.create({
    container:{
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: SIZES.xxxLarge
        
    },
    contentContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    title:{
        fontFamily: FONT.bold,
        color: COLORS.primary,
        fontSize: SIZES.large,
        marginTop: SIZES.large,
        marginBottom: SIZES.medium
    },
    textContent:{
        fontFamily: FONT.regular,
        color: COLORS.primary,
        fontSize: SIZES.medium,
        textAlign: 'center',
        paddingHorizontal: SIZES.small
    },
    skipButtonContainer:{
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        position: 'absolute',
        top: SIZES.xLarge,
        paddingHorizontal: SIZES.xLarge
    },
    skipButton:{
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: SIZES.xxSmall,
        paddingHorizontal: SIZES.large,
        paddingVertical: SIZES.xSmall
    },
    bulletContainer:{
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: SIZES.xLarge,
        gap: SIZES.xxSmall
    },
    buttonContainer:{
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        position: 'absolute',
        bottom: SIZES.xLarge,
        paddingHorizontal: SIZES.xLarge
    },
    button:{
        textAlign: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: SIZES.large,
        paddingVertical: SIZES.xSmall
    },
    buttonText:{
        fontFamily: FONT.bold,
        color: COLORS.primary,
        fontSize: SIZES.large,
    }
});

export default styles;
