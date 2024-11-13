import { View, Text, SafeAreaView, Image, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'

import styles from './code.style';

const Code = () => {
  const codeString = `
  #include <Adafruit_Sensor.h>
  #include <DHT.h>
  #include <MQ2.h>
  #include <Wire.h>
  #include <LiquidCrystal_I2C.h>
  #include <Sim800L.h>
  #include <SoftwareSerial.h>

  #if defined(ESP32)
  #include <WiFi.h>
  #include <FirebaseESP32.h>
  #elif defined(ESP8266)
  #include <ESP8266WiFi.h>
  #include <FirebaseESP8266.h>
  #endif

  #include <addons/TokenHelper.h>
  #include <addons/RTDBHelper.h>

  #define WIFI_SSID ""
  #define WIFI_PASSWORD ""
  #define API_KEY ""
  #define DATABASE_URL ""
  #define USER_EMAIL ""
  #define USER_PASSWORD ""

  #define PIN_MQ2 A0
  #define SPRINKLER_PIN  D0
  #define DHTPIN D7
  #define DHTTYPE DHT22 
  #define FIRE_SENSOR_DO D6
  #define BUZZER_PIN D8
  #define SIM800_TX D4 // SIM800 TX pin
  #define SIM800_RX D5 // SIM800 RX pin

  Sim800L Sim800L(SIM800_RX, SIM800_TX);
  MQ2 mq2(PIN_MQ2);
  DHT dht(DHTPIN, DHTTYPE);
  LiquidCrystal_I2C lcd(0x27, 16, 2);

  FirebaseData fbdo;
  FirebaseAuth auth;
  FirebaseConfig config;
  bool signupOK = false;

  float lpg, smoke;
  String CazaFire = "", CazaSmoke = "", CazaSprinklerStatus = "";
  float CazaTemp = 0.0, CazaGas = 0.0;
  int countdown=0;
  bool countdownActive = false;

  void setup() {
    Serial.begin(9600);
    Sim800L.begin(9600);

    pinMode(FIRE_SENSOR_DO, INPUT);
    pinMode(SPRINKLER_PIN, OUTPUT);
    pinMode(BUZZER_PIN, OUTPUT);

    lcd.begin(16, 2);
    lcd.init();
    lcd.backlight();
    lcd.setCursor(0, 0); 
    lcd.print("Startup...");

    WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
    Serial.print("Connecting to Wi-Fi");
    lcd.setCursor(0, 1);
    lcd.print("Connect WiFi...");
    while (WiFi.status() != WL_CONNECTED)
    {
      Serial.print(".");
      delay(300);
    }
    lcd.clear();
    lcd.setCursor(0, 0);
    lcd.print("Status..."); 
    lcd.setCursor(0, 1);
    lcd.print("Connected!");
    Serial.println();
    Serial.print("Connected with IP: ");
    Serial.println(WiFi.localIP());
    Serial.println();

    Serial.printf("Firebase Client v%s\n\n", FIREBASE_CLIENT_VERSION);

    config.api_key = API_KEY;
    auth.user.email = USER_EMAIL;
    auth.user.password = USER_PASSWORD;
    config.database_url = DATABASE_URL;

    if (Firebase.signUp(&config, &auth, "", "")){
      Serial.println("ok");
      signupOK = true;
    }
    else{
      Serial.printf("%s\n", config.signer.signupError.message.c_str());
    }

    config.token_status_callback = tokenStatusCallback;

    Firebase.begin(&config, &auth);
    Firebase.reconnectWiFi(true);
    Firebase.setDoubleDigits(5);
    lcd.clear();
    mq2.begin();
    dht.begin();
  }

  unsigned long previousMillis = 0;
  const long interval = 1000;

  void loop() {

    unsigned long currentMillis = millis();

    if (Firebase.getString(fbdo, "/CazaPlaza/SprinklerState")) {
      CazaSprinklerStatus = Firebase.getString(fbdo, "/CazaPlaza/SprinklerState") ? fbdo.to<const char *>() : "";
      Serial.print("Sprinkler: ");
      Serial.println(CazaSprinklerStatus);
    } else {
      Serial.printf("Failed to read CountdownStatus: %s\n", fbdo.errorReason().c_str());
    }

    int fireDetected = digitalRead(FIRE_SENSOR_DO);
    if (fireDetected == LOW) {
      Serial.println("Fire detected!");
      CazaFire = "Fire Detected!";
      digitalWrite(BUZZER_PIN, HIGH);
      Sim800L.sendSms("+639307332286","Fire detected!");

      if (CazaSprinklerStatus == "OFF") {
        if (!countdownActive) {
          countdown = 10;
          countdownActive = true;
          previousMillis = currentMillis;
        }
      } else {
        countdown = 0;
        countdownActive = false;
      }
    } else {
      Serial.println("No Detection");
      CazaFire = "No Detection";
      digitalWrite(BUZZER_PIN, LOW);
    }

    if (CazaSprinklerStatus.equals("OFF")) {
      if (countdownActive) {
        if (currentMillis - previousMillis >= interval) {
          previousMillis = currentMillis;

          if (countdown > 0) {
            countdown--;
            Serial.print("Countdown: ");
            Serial.println(countdown);

            Firebase.setInt(fbdo, "/CazaPlaza/Countdown", countdown);

          } else {
            countdownActive = false; 
            Firebase.setInt(fbdo, "/CazaPlaza/Countdown", 0);
            Firebase.setString(fbdo, "/CazaPlaza/SprinklerState", "ON") ? "ON" : "";
          }
        }
      }
    } else {
      countdown = 0;
      countdownActive = false;
      Firebase.setInt(fbdo, "/CazaPlaza/Countdown", 0);
    }

    if (CazaSprinklerStatus.equals("ON")){
      digitalWrite(SPRINKLER_PIN, HIGH);
      
    } else {
      digitalWrite(SPRINKLER_PIN, LOW);
      
    }

    float temperature = dht.readTemperature();
    float humidity = dht.readHumidity();
    CazaTemp = temperature;
    Serial.print("Temperature: ");
    Serial.print(temperature);
    Serial.println("°C");

    float* values= mq2.read(false);
    lpg = mq2.readLPG();
    smoke = mq2.readSmoke();
    Serial.print("LPG: ");
    Serial.println(lpg);
    Serial.print("Smoke: ");
    Serial.println(smoke);

    float gasThreshold = 15000;
    float smokeThreshold = 20000;
    float gasPercentage = (lpg / gasThreshold) * 100.0;
    CazaGas = gasPercentage;

    if(smoke > smokeThreshold){
      CazaSmoke = "Smoke Detected!";
    } else {
      CazaSmoke = "No Detection";
    }
    
    lcd.setCursor(0, 0); 
    lcd.print("T: "+String(int(temperature))+(char)223+"C F: " + (fireDetected == LOW ? "Fire" : "None"));
    
    lcd.setCursor(0, 1);
    lcd.print("G: "+String(int(gasPercentage)) + "% S: " + (smoke > smokeThreshold ? "Smoke" : "None"));

    if (Firebase.ready())
    {
      
      Firebase.setString(fbdo, "/CazaPlaza/Fire", CazaFire) ? CazaFire : "";
      Firebase.setString(fbdo, "/CazaPlaza/Smoke", CazaSmoke) ? CazaSmoke : "";
      Serial.printf("Set Temperature: %s\n", Firebase.setFloat(fbdo, F("/CazaPlaza/Temperature"), CazaTemp) ? "ok" : fbdo.errorReason().c_str());
      Serial.printf("Set Gas: %s\n", Firebase.setFloat(fbdo, F("/CazaPlaza/Gas"), CazaGas) ? "ok" : fbdo.errorReason().c_str());
    }

    delay(1000);
  }
  `;
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.contentContainer}>
          <Text style={styles.codeText}>
            {codeString}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Code