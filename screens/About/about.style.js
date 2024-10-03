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
        flexDirection: 'column'
    },
    logoContainer:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomColor: COLORS.gray4,
        borderBottomWidth: 2,
        paddingVertical: SIZES.small
    },
    logoImage:{
        width: 120,
        height: 120
    },
    logoText:{
        fontFamily: FONT.bold,
        fontSize: SIZES.xxLarge
    },
    textContainer:{
        width: '100%',
        padding: SIZES.small,
        gap: SIZES.small,
        borderBottomColor: COLORS.gray4,
        borderBottomWidth: 2,
    },
    titleText:{
        fontFamily: FONT.bold,
        fontSize: SIZES.large,
        color: COLORS.tertiary
    },
    versionTitle:{
        fontFamily: FONT.medium,
        fontSize: SIZES.medium
    },
    versionText:{
        fontFamily: FONT.medium,
        color: COLORS.gray,
        marginTop: -SIZES.small
    },
    buttonText:{
        fontFamily: FONT.medium,
        fontSize: SIZES.medium
    },
    socialsContainer:{
        width: '100%',
        padding: SIZES.small,
        gap: SIZES.small
    },
    socialButtonContainer:{
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    socialImage:{
        width: 150,
        height: 150
    },
});

export default styles;
