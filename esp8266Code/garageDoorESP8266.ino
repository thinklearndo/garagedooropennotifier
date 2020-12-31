#include <Arduino.h>

#include <ESP8266WiFi.h>

#include <ESP8266HTTPClient.h>

#include <WiFiClient.h>
/////////////////////////////
// ITEMS THAT NEED CONFIGURED
/////////////////////////////

String serverIp = "192.168.2.101"; // ip address of the nodejs server
int doorId = 0; // Id of the door that got left open. For one door just leave it 0.

String wifiNetworkName = "WIFINETWORKNAME"; // network to connect to. Can't be a 5ghz wifi network.
String wifiNetworkPassword = "WIFIPASSWORD"; // wifi password


// end configuration items


int switchPin = D2;
int ht68f001Pin = D3;

void sendAlert() {

  WiFi.begin(wifiNetworkName, wifiNetworkPassword);

  int wifiWaitCount = 0;
  while ( WiFi.status() != WL_CONNECTED && wifiWaitCount < 10) {
    Serial.printf("waiting for wifi connection...\n");
    Serial.flush();
    wifiWaitCount++;
    delay(1000);
  }

  int doorState = 0;

  if (isDoorOpen()) {
    doorState = 1;
  }

  if (WiFi.status() == WL_CONNECTED) {

    WiFiClient client;

    HTTPClient http;

    Serial.print("[HTTP] begin...\n");
    if (http.begin(client, "http://" + serverIp + ":3000/garageAlert?doorState=" + doorState + "&doorId=" + doorId)) {  // HTTP


      Serial.print("[HTTP] GET...\n");
      // start connection and send HTTP header
      int httpCode = http.GET();

      // httpCode will be negative on error
      if (httpCode > 0) {
        // HTTP header has been send and Server response header has been handled
        Serial.printf("[HTTP] GET... code: %d\n", httpCode);

        // file found at server
        if (httpCode == HTTP_CODE_OK || httpCode == HTTP_CODE_MOVED_PERMANENTLY) {
          String payload = http.getString();
          Serial.println(payload);
        }
      } else {
        Serial.printf("[HTTP] GET... failed, error: %s\n", http.errorToString(httpCode).c_str());
      }

      http.end();
    } else {
      Serial.printf("[HTTP} Unable to connect\n");
    }
  }
  else {
    Serial.println("Failed to connect to WIFI!");
  }

  WiFi.disconnect();
}

bool isDoorOpen() {
  int pinState = digitalRead(switchPin);

  if (pinState == HIGH) {
    //debounce is done by ht68f001
    return true;
  }

  return false;
}

void setup() {

  pinMode(ht68f001Pin, OUTPUT);
  digitalWrite(ht68f001Pin, HIGH);

  pinMode(switchPin, INPUT_PULLUP);

  Serial.begin(115200);

  Serial.println("== turned on! ==");

  sendAlert();

  Serial.println("telling ht68f001 to turn us off");

  digitalWrite(ht68f001Pin, LOW);

  delay(10000);

}

void loop() {
// doesn't do anything here


}
