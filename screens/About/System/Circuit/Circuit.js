import { View, Text, SafeAreaView, Image, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { DataTable } from 'react-native-paper';

import styles from './circuit.style';

const Circuit = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.contentContainer}>
          <DataTable style={{backgroundColor:'white'}}>
              <DataTable.Header style={{backgroundColor: 'gray'}}>
                  <DataTable.Title>
                      <Text style={styles.tableTitleText}>LCD Display</Text>
                  </DataTable.Title>
                  <DataTable.Title>
                      <Text style={styles.tableTitleText}>ESP8266</Text>
                  </DataTable.Title>
              </DataTable.Header>

              <DataTable.Row>
                  <DataTable.Cell>VCC</DataTable.Cell>
                  <DataTable.Cell>3.3V</DataTable.Cell>
              </DataTable.Row>
              <DataTable.Row>
                  <DataTable.Cell>GND</DataTable.Cell>
                  <DataTable.Cell>GND</DataTable.Cell>
              </DataTable.Row>
              <DataTable.Row>
                  <DataTable.Cell>SDA</DataTable.Cell>
                  <DataTable.Cell>D2</DataTable.Cell>
              </DataTable.Row>
              <DataTable.Row>
                  <DataTable.Cell>SCL</DataTable.Cell>
                  <DataTable.Cell>D1</DataTable.Cell>
              </DataTable.Row>
          </DataTable>

          <DataTable style={{backgroundColor:'white', marginTop: 20}}>
              <DataTable.Header style={{backgroundColor: 'gray'}}>
                  <DataTable.Title>
                      <Text style={styles.tableTitleText}>HW-072 FIRE SENSOR</Text>
                  </DataTable.Title>
                  <DataTable.Title>
                      <Text style={styles.tableTitleText}>ESP8266</Text>
                  </DataTable.Title>
              </DataTable.Header>

              <DataTable.Row>
                  <DataTable.Cell>VCC</DataTable.Cell>
                  <DataTable.Cell>3.3V</DataTable.Cell>
              </DataTable.Row>
              <DataTable.Row>
                  <DataTable.Cell>GND</DataTable.Cell>
                  <DataTable.Cell>GND</DataTable.Cell>
              </DataTable.Row>
              <DataTable.Row>
                  <DataTable.Cell>DO</DataTable.Cell>
                  <DataTable.Cell>D6</DataTable.Cell>
              </DataTable.Row>
          </DataTable>
          
          <DataTable style={{backgroundColor:'white', marginTop: 20}}>
              <DataTable.Header style={{backgroundColor: 'gray'}}>
                  <DataTable.Title>
                      <Text style={styles.tableTitleText}>DHT22 - AM2302</Text>
                  </DataTable.Title>
                  <DataTable.Title>
                      <Text style={styles.tableTitleText}>ESP8266</Text>
                  </DataTable.Title>
              </DataTable.Header>

              <DataTable.Row>
                  <DataTable.Cell>VCC</DataTable.Cell>
                  <DataTable.Cell>3.3V</DataTable.Cell>
              </DataTable.Row>
              <DataTable.Row>
                  <DataTable.Cell>GND</DataTable.Cell>
                  <DataTable.Cell>GND</DataTable.Cell>
              </DataTable.Row>
              <DataTable.Row>
                  <DataTable.Cell>DATA</DataTable.Cell>
                  <DataTable.Cell>D7</DataTable.Cell>
              </DataTable.Row>
          </DataTable>

          <DataTable style={{backgroundColor:'white', marginTop: 20}}>
              <DataTable.Header style={{backgroundColor: 'gray'}}>
                  <DataTable.Title>
                      <Text style={styles.tableTitleText}>MQ2 GAS SENSOR</Text>
                  </DataTable.Title>
                  <DataTable.Title>
                      <Text style={styles.tableTitleText}>ESP8266</Text>
                  </DataTable.Title>
              </DataTable.Header>

              <DataTable.Row>
                  <DataTable.Cell>VCC</DataTable.Cell>
                  <DataTable.Cell>3.3V</DataTable.Cell>
              </DataTable.Row>
              <DataTable.Row>
                  <DataTable.Cell>GND</DataTable.Cell>
                  <DataTable.Cell>GND</DataTable.Cell>
              </DataTable.Row>
              <DataTable.Row>
                  <DataTable.Cell>AO</DataTable.Cell>
                  <DataTable.Cell>A0</DataTable.Cell>
              </DataTable.Row>
          </DataTable>

          <DataTable style={{backgroundColor:'white', marginTop: 20}}>
              <DataTable.Header style={{backgroundColor: 'gray'}}>
                  <DataTable.Title>
                      <Text style={styles.tableTitleText}>SIM800L GSM Module</Text>
                  </DataTable.Title>
                  <DataTable.Title>
                      <Text style={styles.tableTitleText}>ESP8266</Text>
                  </DataTable.Title>
              </DataTable.Header>

              <DataTable.Row>
                  <DataTable.Cell>VCC</DataTable.Cell>
                  <DataTable.Cell>External 4.2V power supply</DataTable.Cell>
              </DataTable.Row>
              <DataTable.Row>
                  <DataTable.Cell>GND</DataTable.Cell>
                  <DataTable.Cell>GND</DataTable.Cell>
              </DataTable.Row>
              <DataTable.Row>
                  <DataTable.Cell>TX</DataTable.Cell>
                  <DataTable.Cell>D4</DataTable.Cell>
              </DataTable.Row>
              <DataTable.Row>
                  <DataTable.Cell>RX</DataTable.Cell>
                  <DataTable.Cell>D5</DataTable.Cell>
              </DataTable.Row>
          </DataTable>

          <DataTable style={{backgroundColor:'white', marginTop: 20}}>
              <DataTable.Header style={{backgroundColor: 'gray'}}>
                  <DataTable.Title>
                      <Text style={styles.tableTitleText}>BUZZER</Text>
                  </DataTable.Title>
                  <DataTable.Title>
                      <Text style={styles.tableTitleText}>ESP8266</Text>
                  </DataTable.Title>
              </DataTable.Header>

              <DataTable.Row>
                  <DataTable.Cell>VCC</DataTable.Cell>
                  <DataTable.Cell>D8</DataTable.Cell>
              </DataTable.Row>
              <DataTable.Row>
                  <DataTable.Cell>GND</DataTable.Cell>
                  <DataTable.Cell>GND</DataTable.Cell>
              </DataTable.Row>
          </DataTable>

          <DataTable style={{backgroundColor:'white', marginTop: 20, marginBottom: 20}}>
              <DataTable.Header style={{backgroundColor: 'gray'}}>
                  <DataTable.Title>
                      <Text style={styles.tableTitleText}>SPRINKLER</Text>
                  </DataTable.Title>
                  <DataTable.Title>
                      <Text style={styles.tableTitleText}>ESP8266</Text>
                  </DataTable.Title>
              </DataTable.Header>

              <DataTable.Row>
                  <DataTable.Cell>VCC</DataTable.Cell>
                  <DataTable.Cell>D0</DataTable.Cell>
              </DataTable.Row>
              <DataTable.Row>
                  <DataTable.Cell>GND</DataTable.Cell>
                  <DataTable.Cell>GND</DataTable.Cell>
              </DataTable.Row>
          </DataTable>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Circuit