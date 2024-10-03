import { View, Text, SafeAreaView, TouchableOpacity, Image, TextInput, Dimensions } from 'react-native'
import {React, useState} from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { LineChart } from "react-native-chart-kit";

import styles from './report.style';

const screenWidth = Dimensions.get("window").width;

const UserReportScreen = () => {
    const dataset1 = Array.from({ length: 6 }, () => Math.random() * 100);
    const dataset2 = Array.from({ length: 6 }, () => Math.random() * 100);
    const dataset3 = Array.from({ length: 6 }, () => Math.random() * 100);
  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#11774e', '#14b045', '#0c403b']}
        locations={[0, 0.4, 1]}
        style={styles.gradientBackground}
      >
        <View style={styles.contentContainer}>
            <Text style={styles.restaurantNameText}>Caza Plaza</Text>

            <View>
                <Text style={styles.reportTitleText}>Gas Levels</Text>
                <LineChart
                    data={{
                    labels: ["January", "February", "March", "April", "May", "June"],
                    datasets: [
                        {
                            data: dataset1,
                            color: (opacity = 1) => `rgba(128, 128, 128, ${opacity})`,
                            strokeWidth: 2
                        }
                    ]
                    }}
                    width={(Dimensions.get("window").width - 20)}
                    height={220}
                    yAxisInterval={1} 
                    chartConfig={{
                    backgroundColor: "#ffffff",
                    backgroundGradientFrom: "#ffffff",
                    backgroundGradientTo: "#ffffff",
                    decimalPlaces: 2,
                    color: (opacity = 1) => `rgba(169, 169, 169, ${opacity})`, // Gray chart color
                    labelColor: (opacity = 1) => `rgba(128, 128, 128, ${opacity})`, // Label color gray
                    propsForDots: {
                        r: "6",
                        strokeWidth: "2",
                        stroke: "#ffa726"
                    }
                    }}
                    bezier
                    style={{
                        marginVertical: 8,
                        borderRadius: 10
                    }}
                    renderDotContent={({ x, y, index }) => {
                        const dataValue = dataset1[index]; // Reference your dataset directly
                        
                        return (
                            <Text
                                key={`dot-${index}-${dataValue}`}
                                style={{
                                    position: 'absolute',
                                    top: y - 24,
                                    left: x - 10,
                                    fontSize: 12,
                                    color: "#000",
                                }}
                            >
                                {`${dataValue.toFixed(2)} ppm`} {/* Adjust as needed */}
                            </Text>
                        );
                    }}                
                />
            </View>
            
            <View>
                <Text style={styles.reportTitleText}>Temperature</Text>
                <LineChart
                    data={{
                    labels: ["January", "February", "March", "April", "May", "June"],
                    datasets: [
                        {
                            data: dataset2,
                            color: (opacity = 1) => `rgba(0, 150, 255, ${opacity})`,
                            strokeWidth: 2
                        }
                    ]
                    }}
                    width={(Dimensions.get("window").width - 20)}
                    height={250}
                    yAxisInterval={1} 
                    chartConfig={{
                    backgroundColor: "#ffffff",
                    backgroundGradientFrom: "#ffffff",
                    backgroundGradientTo: "#ffffff",
                    decimalPlaces: 2,
                    color: (opacity = 1) => `rgba(0, 150, 255, ${opacity})`, // Gray chart color
                    labelColor: (opacity = 1) => `rgba(0, 150, 255, ${opacity})`, // Label color gray
                    propsForDots: {
                        r: "6",
                        strokeWidth: "2",
                        stroke: "#0096FF"
                    }
                    }}
                    bezier
                    style={{
                        marginVertical: 8,
                        borderRadius: 10
                    }}
                    renderDotContent={({ x, y, index }) => {
                        const dataValue = dataset2[index]; // Reference your dataset directly
                        
                        return (
                            <Text
                                key={`dot-${index}-${dataValue}`}
                                style={{
                                    position: 'absolute',
                                    top: y - 24,
                                    left: x - 10,
                                    fontSize: 12,
                                    color: "#000",
                                }}
                            >
                                {`${dataValue.toFixed(2)} °C`} {/* Adjust as needed */}
                            </Text>
                        );
                    }}                
                />  
            </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  )
}

export default UserReportScreen