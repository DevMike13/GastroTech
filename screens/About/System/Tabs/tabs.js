import React from 'react'
import { View, Text, TouchableOpacity, FlatList } from 'react-native'

import styles from './tabs.style'
import { SIZES, COLORS } from '../../../../assets/theme/theme'

const TabButton = ({ name, activeTab, onHandleSearchType }) => (
    <TouchableOpacity
      style={styles.btn(name, activeTab)}
      onPress={onHandleSearchType}
    >
      <Text style={styles.btnText(name, activeTab)}>{name}</Text>
    </TouchableOpacity>
  )
  const Tabs = ({ tabs, activeTab, setActiveTab }) => {
    return (
      <View style={styles.container}>
        <View style={{ borderRadius: SIZES.xxxLarge, overflow: 'hidden', backgroundColor: 'rgba(193, 192, 200, 0.2)', height: 55 }}>
            <FlatList
            data={tabs}
            renderItem={({ item }) => (
                <TabButton
                name={item}
                activeTab={activeTab}
                onHandleSearchType={() => setActiveTab(item)}
                />
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item}
            contentContainerStyle= {{ columnGap: SIZES.small / 2, paddingVertical: SIZES.xxSmall, paddingHorizontal: SIZES.xSmall, borderRadius: SIZES.xxxLarge}}
            />
        </View>
      </View>
    )
  }
  
  export default Tabs