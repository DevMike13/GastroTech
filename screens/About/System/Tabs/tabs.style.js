import { StyleSheet } from "react-native";

import { COLORS, FONT, SIZES, SHADOWS } from "../../../../assets/theme/theme";

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 2,
        paddingVertical: SIZES.large,
        borderRadius: SIZES.xLarge
    },
    btn: (name, activeTab) => ({
      paddingVertical: SIZES.small,
      paddingHorizontal: SIZES.xLarge,
      backgroundColor: name === activeTab ? COLORS.tertiary : 'transparent',
      borderRadius: SIZES.xLarge,
      marginLeft: 2,
      ...SHADOWS.medium,
      shadowColor: COLORS.white,
    }),
    btnText: (name, activeTab) => ({
      fontFamily: "DMMedium",
      fontSize: SIZES.small,
      color: name === activeTab ? COLORS.white : "#AAA9B8",
    }),
});

export default styles;
