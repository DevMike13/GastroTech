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
    codeText:{
        fontFamily: FONT.regular,
        fontSize: SIZES.small
    }
});

export default styles;
