import { StyleSheet, Platform, StatusBar } from "react-native";

import { COLORS, FONT, SIZES, SHADOWS } from "../../../../assets/theme/theme";

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
    },
    dropdownInput:{
        width: "100%",
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        borderRadius: SIZES.medium,
        color: COLORS.white
    },
    loadingContainer:{
        height: 220,
        backgroundColor: "white",
        borderRadius: SIZES.small,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    noDataText:{
        fontFamily: FONT.medium,
        fontStyle: 'italic',
        color: COLORS.gray
    },
    calendarContainer:{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        gap: SIZES.medium
    },
    dateText:{
        fontFamily: FONT.bold,
        color: COLORS.lightWhite
    },
    chartContainer:{
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 40
    }
});

export default styles;
