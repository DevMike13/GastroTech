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
    contentContainer:{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: SIZES.xLarge,
        paddingHorizontal: SIZES.small,
        gap: SIZES.xxxLarge
    },
    restaurantNameText:{
        fontFamily: FONT.bold,
        fontSize: SIZES.large,
        color: COLORS.white
    },
    reportTitleText:{
        fontFamily: FONT.medium,
        color: COLORS.white
    }
});

export default styles;
