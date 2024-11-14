import { StyleSheet, Platform, StatusBar, Dimensions } from "react-native";

import { COLORS, FONT, SIZES, SHADOWS } from "../../../assets/theme/theme";

const styles = StyleSheet.create({
    container:{
        flex: 1
    },
    gradientBackground:{
        height: '100%',
        paddingHorizontal: SIZES.xxSmall
    },
    contentContainer:{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: SIZES.large,
        marginTop: SIZES.xxxLarge,
        marginBottom: SIZES.small
    },
    searchContainer: {
        width: '90%',
        flexDirection: 'row',
        alignItems: 'center',
        gap: SIZES.xSmall,
        backgroundColor: COLORS.white,
        borderRadius: 100,
        padding: SIZES.small,
        marginBottom: 10,
    },
    searchInput: {
        flex: 1,
        fontFamily: FONT.medium,
        fontSize: SIZES.medium,
        height: 40,
    },
    titleContainer:{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    tableTitleText:{
        color: COLORS.white,
        fontFamily: FONT.bold,
        fontSize: SIZES.medium
    },
    titleText:{
        fontFamily: FONT.bold,
        fontSize: SIZES.medium,
        color: COLORS.white
    },
    viewButton:{
        backgroundColor: 'lightgreen',
        paddingHorizontal: SIZES.xxxLarge,
        paddingVertical: 2,
        borderRadius: SIZES.medium
    },
    viewButtonText:{
        fontFamily: FONT.medium,
        color: COLORS.lightWhite
    }
});

export default styles;
