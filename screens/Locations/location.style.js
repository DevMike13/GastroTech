import { StyleSheet, Platform, StatusBar, Dimensions } from "react-native";

import { COLORS, FONT, SIZES, SHADOWS } from "../../assets/theme/theme";

const styles = StyleSheet.create({
    container:{
        flex: 1
    },
    gradientBackground:{
        height: '100%'
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    markerContainer:{
        width: 60, 
        height: 60, 
        borderRadius: 100, 
        overflow: 'hidden', 
        borderWidth: 5, 
        borderColor: 'red'
    },
    markerImage:{
        width: 60, 
        height: 60
    }
});

export default styles;
