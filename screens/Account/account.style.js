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
        paddingVertical: SIZES.xxSmall
    },
    logoImage:{
        width: 60,
        height: 60
    },
    logoText:{
        fontFamily: FONT.bold,
        fontSize: SIZES.large
    },
    accountContainer:{
        width: '100%',
        padding: SIZES.small,
        gap: SIZES.small
    },
    usernameText:{
        fontFamily: FONT.bold,
        fontSize: SIZES.large,
        color: COLORS.tertiary
    },
    userEmailText:{
        fontFamily: FONT.medium,
        fontSize: SIZES.medium,
        marginTop: -SIZES.small,
        color: COLORS.gray
    },
    buttonContainer:{
        marginTop: SIZES.large
    },
    button:{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: SIZES.xxSmall,
        marginTop: SIZES.medium
    },
    buttonText:{
        fontFamily: FONT.medium,
        fontSize: SIZES.medium
    },
});

export default styles;
