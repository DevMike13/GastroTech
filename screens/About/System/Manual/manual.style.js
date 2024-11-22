import { StyleSheet } from "react-native";

import { COLORS, FONT, SIZES, SHADOWS } from "../../../../assets/theme/theme";

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
        paddingHorizontal: SIZES.large
    },
    titleText:{
        fontFamily: FONT.bold,
        fontSize: SIZES.large,
        color: 'green',
        marginBottom: SIZES.medium
    },
    textBoldStyle:{
        fontFamily: FONT.medium,
        fontSize: SIZES.medium,
        color: 'black'
    },
    textStyleTwo:{
        fontFamily: FONT.regular,
        fontSize: SIZES.medium,
        color: COLORS.gray,
        marginVertical: SIZES.xxSmall
    },
    textStyle:{
        fontFamily: FONT.regular,
        fontSize: SIZES.medium,
        color: COLORS.gray,
        marginVertical: SIZES.small
    }
});

export default styles;
