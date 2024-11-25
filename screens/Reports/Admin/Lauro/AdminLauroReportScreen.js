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

const AdminLauroReportScreen = () => {
    const [gasData, setGasData] = useState({ labels: [], datasets: [] });
    const [temperatureData, setTemperatureData] = useState({ labels: [], datasets: [] });
    const [fireData, setFireData] = useState({ labels: [], datasets: [] });
    const [smokeData, setSmokeData] = useState({ labels: [], datasets: [] });
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
            .where('restaurant_name', '==', 'Don Lauro Restaurant')
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

          // Fire Detection Logic - Only for the selected startDate
        const fireDetectionQuery = firestore
        .collection('fire_detection_records')
        .where('restaurant_name', '==', 'Don Lauro Restaurant')
        .where('fire_status', '==', 'Fire Detected')
        .where('date_time', '>=', filterStartDate)  // Filter startDate
        .where('date_time', '<=', currentDate)  // Filter end of the selected day
        .orderBy('date_time', 'asc');

        const fireDetectionSnapshot = await fireDetectionQuery.get();

        const fireRecordsMap = new Map();

        fireDetectionSnapshot.forEach((doc) => {
            const data = doc.data();
            const dateTime = data.date_time.toDate(); // Convert Firestore timestamp to Date object

            const dayOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][dateTime.getDay()];
            const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][dateTime.getMonth()];
            const date = dateTime.getDate(); 

            const formattedLabel = `${dayOfWeek} (${month}. ${date})`;

            const dateKey = `${dateTime.getFullYear()}-${(dateTime.getMonth() + 1)
            .toString()
            .padStart(2, '0')}-${dateTime.getDate().toString().padStart(2, '0')}`;

            // Convert time to minutes since midnight
            const timeInMinutes = dateTime.getHours() * 60 + dateTime.getMinutes();

            if (!fireRecordsMap.has(dateKey) || fireRecordsMap.get(dateKey).time < timeInMinutes) {
            fireRecordsMap.set(dateKey, { label: formattedLabel, time: timeInMinutes });
            }
        });

        // Extract labels (formatted date) and dataset data (times as minutes since midnight)
        const fireLabels = Array.from(fireRecordsMap.values()).map((record) => record.label);
        const fireTimes = Array.from(fireRecordsMap.values()).map((record) => record.time);

        setFireData({
            labels: fireLabels, // Use formatted labels here
            datasets: [{
            data: fireTimes,
            }],
        });

        // Smoke Detection Logic - Only for the selected startDate
        const smokeDetectionQuery = firestore
            .collection('fire_detection_records')
            .where('restaurant_name', '==', 'Don Lauro Restaurant')
            .where('fire_status', '==', 'Smoke Detected')
            .where('date_time', '>=', filterStartDate)
            .where('date_time', '<=', currentDate)
            .orderBy('date_time', 'asc');

        const smokeDetectionSnapshot = await smokeDetectionQuery.get();

        const smokeRecordsMap = new Map();

        smokeDetectionSnapshot.forEach((doc) => {
            const data = doc.data();
            const dateTime = data.date_time.toDate(); // Convert Firestore timestamp to Date object

            const dayOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][dateTime.getDay()];
            const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][dateTime.getMonth()];
            const date = dateTime.getDate(); 

            const formattedLabel = `${dayOfWeek} (${month}. ${date})`;

            const dateKey = `${dateTime.getFullYear()}-${(dateTime.getMonth() + 1)
                .toString()
                .padStart(2, '0')}-${dateTime.getDate().toString().padStart(2, '0')}`;

            const timeInMinutes = dateTime.getHours() * 60 + dateTime.getMinutes();

            if (!smokeRecordsMap.has(dateKey) || smokeRecordsMap.get(dateKey).time < timeInMinutes) {
                smokeRecordsMap.set(dateKey, { label: formattedLabel, time: timeInMinutes });
            }
        });

        // Extract smoke labels and dataset data (times as minutes since midnight)
        const smokeLabels = Array.from(smokeRecordsMap.values()).map((record) => record.label);
        const smokeTimes = Array.from(smokeRecordsMap.values()).map((record) => record.time);

        setSmokeData({
            labels: smokeLabels,
            datasets: [{
                data: smokeTimes,
            }],
        });


        console.log('Fire Data:', fireData);
        console.log('Smoke Data:', smokeData);
      
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
                    <Text style={styles.restaurantNameText}>Don Lauro Restaurant</Text>
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

                        <View>
                            <View style={{ marginVertical: 10}}>
                                <Text style={styles.reportTitleText}>Fire Detection</Text>
                                {
                                    fireData.datasets.length > 0 && fireData.labels.length > 0 ? (
                                        
                                            <LineChart
                                                data={fireData}
                                                width={fireData.labels.length > 5 ? fireData.datasets.length * 1000 : Dimensions.get('window').width}
                                                height={220}
                                                yAxisInterval={1}
                                                verticalLabelRotation={10}
                                                chartConfig={{
                                                    backgroundColor: "#ffffff",
                                                    backgroundGradientFrom: "#ffffff",
                                                    backgroundGradientTo: "#ffffff",
                                                    decimalPlaces: 2,
                                                    color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
                                                    labelColor: (opacity = 1) => `rgba(139, 0, 0, ${opacity})`,
                                                    propsForDots: {
                                                        r: "6",
                                                        strokeWidth: "2",
                                                        stroke: "#ff0000"
                                                    },
                                                }}
                                                bezier
                                                style={{
                                                    marginVertical: 8,
                                                    borderRadius: 10
                                                }}
                                                renderDotContent={({ x, y, index }) => {
                                                    const dataValue = fireData.datasets[0].data[index]; 
                                                    
                                                    const formatTimeFromMinutes = (minutes) => {
                                                        const hours = Math.floor(minutes / 60); 
                                                        const mins = minutes % 60;
                                                        const ampm = hours >= 12 ? 'PM' : 'AM';
                                                        const hour12 = hours % 12 || 12; 
                                                        const formattedTime = `${hour12}:${mins < 10 ? '0' : ''}${mins} ${ampm}`;
                                                        return formattedTime;
                                                    };
                                                
                                                    const formattedTime = formatTimeFromMinutes(dataValue);
                                                
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
                                                            {formattedTime}
                                                        </Text>
                                                    );
                                                }}
                                            />
                                    
                                    ) : (
                                        <View style={styles.loadingContainer}>
                                            <Text style={styles.noDataText}>No Detection to Selected Date</Text>
                                        </View>
                                    )
                                }
                            </View>
                        </View> 

                        <View>
                            <View style={{ marginVertical: 10 }}>
                                <Text style={styles.reportTitleText}>Smoke Detection</Text>
                                {
                                    // Check if smokeData and datasets are available
                                    smokeData.datasets.length > 0 && smokeData.labels.length > 0 ? (
                                        <LineChart
                                            data={smokeData}
                                            width={smokeData.labels.length > 5 ? smokeData.datasets.length * 1000 : Dimensions.get('window').width}
                                            height={220}
                                            yAxisInterval={1}
                                            verticalLabelRotation={10}
                                            chartConfig={{
                                                backgroundColor: "#ffffff",
                                                backgroundGradientFrom: "#f2f2f2",
                                                backgroundGradientTo: "#e6e6e6",
                                                decimalPlaces: 2,
                                                color: (opacity = 1) => `rgba(169, 169, 169, ${opacity})`,
                                                labelColor: (opacity = 1) => `rgba(105, 105, 105, ${opacity})`,
                                                propsForDots: {
                                                    r: "6",
                                                    strokeWidth: "2",
                                                    stroke: "#808080"
                                                },
                                            }}
                                            bezier
                                            style={{
                                                marginVertical: 8,
                                                borderRadius: 10
                                            }}
                                            renderDotContent={({ x, y, index }) => {
                                                const dataValue = smokeData.datasets[0].data[index];

                                                const formatTimeFromMinutes = (minutes) => {
                                                    const hours = Math.floor(minutes / 60);
                                                    const mins = minutes % 60;
                                                    const ampm = hours >= 12 ? 'PM' : 'AM';
                                                    const hour12 = hours % 12 || 12;
                                                    const formattedTime = `${hour12}:${mins < 10 ? '0' : ''}${mins} ${ampm}`;
                                                    return formattedTime;
                                                };

                                                const formattedTime = formatTimeFromMinutes(dataValue);

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
                                                        {formattedTime}
                                                    </Text>
                                                );
                                            }}
                                        />
                                    ) : (
                                        // Show a loading spinner if smokeData is not available or empty
                                        <View style={styles.loadingContainer}>
                                            <Text style={styles.noDataText}>No Detection to Selected Date</Text>
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

export default AdminLauroReportScreen