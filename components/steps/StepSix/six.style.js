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
    buttonContainer:{
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: SIZES.xLarge,
        paddingHorizontal: SIZES.xLarge,
    },
    button:{
        textAlign: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.tertiary,
        paddingHorizontal: SIZES.xxxLarge,
        paddingVertical: SIZES.xSmall,
        borderRadius: SIZES.xxxLarge
    },
    buttonText:{
        fontFamily: FONT.bold,
        color: COLORS.primary,
        fontSize: SIZES.large,
    }
});

export default styles;
