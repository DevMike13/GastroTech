import { StyleSheet, Platform, StatusBar } from "react-native";

import { COLORS, FONT, SIZES, SHADOWS } from "../../../assets/theme/theme";

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
    scrollViewStyle:{
        padding: SIZES.small
    },
    titleText:{
        fontFamily: FONT.bold,
        fontSize: SIZES.large,
        textAlign: 'center'
    },
    contentText:{
        fontFamily: FONT.regular,
        paddingVertical: SIZES.small
    },
    contentSubText:{
        fontFamily: FONT.regular,
        paddingVertical: SIZES.small,
        paddingLeft: SIZES.medium
    },
    contentInnerSubText:{
        fontFamily: FONT.regular,
        paddingVertical: SIZES.small,
        paddingLeft: SIZES.large
    }
});

export default styles;
