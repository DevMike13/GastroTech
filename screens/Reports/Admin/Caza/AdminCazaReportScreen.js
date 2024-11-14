import { View, Text, SafeAreaView, Dimensions, ScrollView, ActivityIndicator, Button } from 'react-native'
import {React, useState, useContext, useEffect} from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { LineChart } from "react-native-chart-kit";
import { SelectList } from 'react-native-dropdown-select-list';


import { firestore } from '../../../../firebase';
import styles from './report.style';

const screenWidth = Dimensions.get("window").width;

import { UserContext } from '../../../../UserContext';
import { COLORS, FONT } from '../../../../assets/theme/theme';

const AdminCazaReportScreen = () => {
    const [gasData, setGasData] = useState({ labels: [], datasets: [] });
    const [temperatureData, setTemperatureData] = useState({ labels: [], datasets: [] });
    const [startDate, setStartDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);

    const { user } = useContext(UserContext);
    const [selectedFilter, setSelectedFilter] = useState('Weekly');
    const filter = [
        {key: '1', value: 'Weekly'},
        {key: '2', value: 'Monthly'},
        {key: '3', value: 'Yearly'},
    ];
    const onDateChange = (event, selectedDate) => {
        setShowDatePicker(false);
        if (selectedDate) {
          setStartDate(selectedDate); // Update start date
        }
    };
    const fetchData = async () => {
        try {
          const filterStartDate = new Date(startDate);
          filterStartDate.setHours(0, 0, 0, 0);
      
          const currentDate = new Date();
          currentDate.setHours(23, 59, 59, 999);
      
          const querySnapshot = await firestore.collection('readings')
            .where('restaurant_name', '==', 'Caza Plaza')
            .orderBy('reading_date', 'asc')
            .get();
      
          const gasLevelsMap = new Map();
      
          querySnapshot.forEach(doc => {
            const data = doc.data();
            const readingDate = new Date(data.reading_date);
            readingDate.setHours(0, 0, 0, 0);
      
            let label = '';
            let key = '';
      
            if (selectedFilter === 'Weekly' && readingDate >= filterStartDate && readingDate <= currentDate) {
              // Format date as "Mon (Nov. 4)"
              const dayOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][readingDate.getDay()];
              const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][readingDate.getMonth()];
              const date = readingDate.getDate();
              
              label = `${dayOfWeek} (${month}. ${date})`;
              key = `${readingDate.getFullYear()}-${readingDate.getMonth()}-${readingDate.getDate()}`;
            
            } else if (selectedFilter === 'Monthly' && readingDate >= filterStartDate) {
              const month = readingDate.getMonth();
              label = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][month];
              key = `${readingDate.getFullYear()}-${month}`;
            
            } else if (selectedFilter === 'Yearly' && readingDate >= filterStartDate) {
              const year = readingDate.getFullYear();
              label = `${year}`;
              key = `${year}`;
            }
      
            if (label && key) {
              if (!gasLevelsMap.has(key)) {
                gasLevelsMap.set(key, { label, gas_level: data.gas_level, temperature: data.temperature });
              } else {
                const existingData = gasLevelsMap.get(key);
                gasLevelsMap.set(key, {
                  label: existingData.label,
                  gas_level: Math.max(existingData.gas_level, data.gas_level),
                  temperature: Math.max(existingData.temperature, data.temperature),
                });
              }
            }
          });
      
          const labels = Array.from(gasLevelsMap.values()).map(entry => entry.label);
          const gasLevels = Array.from(gasLevelsMap.values()).map(entry => entry.gas_level);
          const temperatures = Array.from(gasLevelsMap.values()).map(entry => entry.temperature);
      
          setGasData({ labels, datasets: [{ data: gasLevels }] });
          setTemperatureData({ labels, datasets: [{ data: temperatures }] });
      
        } catch (error) {
          console.error("Error fetching data: ", error);
        }
      };
      
      useEffect(() => {
        fetchData();
      }, [selectedFilter, startDate]);
      
      
    
      useEffect(() => {
        setSelectedFilter('Weekly');
      }, []);

  return (
    <SafeAreaView style={styles.container}>
        <ScrollView style={{ height: '100%'}}>
            <LinearGradient
                colors={['#11774e', '#14b045', '#0c403b']}
                locations={[0, 0.4, 1]}
                style={styles.gradientBackground}
            >
                <View style={styles.contentContainer}>
                    <Text style={styles.restaurantNameText}>Caza Plaza</Text>
                    <View style={styles.calendarContainer}>
                        <Button title="Select Start Date" onPress={() => setShowDatePicker(true)} />
                        <Text style={styles.dateText}>
                            {startDate.toLocaleDateString('en-US', {
                                weekday: 'short',
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                            }).replace(',', ' -')}
                        </Text>
                    </View>
                    {showDatePicker && (
                        <DateTimePicker
                        value={startDate}
                        mode="date"
                        display="default"
                        onChange={onDateChange}
                        />
                    )}
                    <View style={styles.dropdownInput}>
                        <SelectList
                            setSelected={(val) => setSelectedFilter(val)}
                            data={filter} 
                            search={false}
                            save="value"
                            placeholder='Ex: Weekly'
                            defaultOption={{ key: '1', value: 'Weekly' }}
                            fontFamily={FONT.regular}
                            inputStyles={{ color: COLORS.white}}
                            dropdownTextStyles={{ color: COLORS.white}}
                        />
                    </View>
                    <ScrollView horizontal={true} contentContainerStyle={{ display: 'flex', flexDirection: 'column'}}> 
                        <View>
                            <View>
                                <Text style={styles.reportTitleText}>Gas Levels</Text>
                                {
                                    gasData.datasets && gasData.datasets.length > 0 ? (
                                        
                                            <LineChart
                                                data={gasData}
                                                width={gasData.labels.length > 7 ? gasData.datasets.length * 1000 : gasData.datasets.length * 500}
                                                height={220}
                                                yAxisInterval={1}
                                                chartConfig={{
                                                    backgroundColor: "#ffffff",
                                                    backgroundGradientFrom: "#ffffff",
                                                    backgroundGradientTo: "#ffffff",
                                                    decimalPlaces: 2,
                                                    color: (opacity = 1) => `rgba(169, 169, 169, ${opacity})`,
                                                    labelColor: (opacity = 1) => `rgba(128, 128, 128, ${opacity})`,
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
                                                    const dataValue = gasData.datasets[0].data[index];

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
                                                            {`${dataValue.toFixed(2)} ppm`}
                                                        </Text>
                                                    );
                                                }}
                                            />
                                    
                                    ) : (
                                        <View style={styles.loadingContainer}>
                                            <ActivityIndicator size="large" />
                                        </View>
                                    )
                                }
                            </View>
                        </View> 
                        
                        <View>
                            <View>
                                <Text style={styles.reportTitleText}>Temperature</Text>
                                {
                                    temperatureData.datasets && temperatureData.datasets.length > 0 ? (
                                        
                                            <LineChart
                                                data={temperatureData}
                                                width={temperatureData.labels.length > 7 ? temperatureData.datasets.length * 1000 : temperatureData.datasets.length * 500}
                                                height={250}
                                                yAxisInterval={1} 
                                                chartConfig={{
                                                backgroundColor: "#ffffff",
                                                backgroundGradientFrom: "#ffffff",
                                                backgroundGradientTo: "#ffffff",
                                                decimalPlaces: 2,
                                                color: (opacity = 1) => `rgba(0, 150, 255, ${opacity})`,
                                                labelColor: (opacity = 1) => `rgba(0, 150, 255, ${opacity})`,
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
                                                    const dataValue = temperatureData.datasets[0].data[index];
                                                    
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
                                                            {`${dataValue.toFixed(2)} °C`}
                                                        </Text>
                                                    );
                                                }}                
                                            />  
                                        
                                    ) : (
                                        <View style={styles.loadingContainer}>
                                            <ActivityIndicator size="large" />
                                        </View>
                                    )
                                    
                                }
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </LinearGradient>
        </ScrollView>
    </SafeAreaView>
  )
}

export default AdminCazaReportScreen