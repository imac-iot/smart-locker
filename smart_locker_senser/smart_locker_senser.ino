#include <SPI.h>
#include <PN532_SPI.h>
#include "PN532.h"
#include "DHT.h"

PN532_SPI pn532spi(SPI, 10);
PN532 nfc(pn532spi);

DHT dht(A3, DHT11);

const int pinPir = 3;
const int pinMg811 = 2;

int toCo2(float v);

void setup() {
 Serial.begin(115200);
 Serial.println("Hello!");

  pinMode(pinPir, INPUT);

 nfc.begin();
 nfc.setPassiveActivationRetries(0xFF);
 nfc.SAMConfig();
}

void loop() {
  uint8_t uid[] = { 0, 0, 0, 0, 0, 0, 0 };
  uint8_t uidLength; 
  boolean success;
  String mes = "", data = "";
  success = nfc.readPassiveTargetID(PN532_MIFARE_ISO14443A, &uid[0], &uidLength);
  if (success)
  {
    for (uint8_t i=0; i < uidLength; i++) 
    {
      mes = mes + String(uid[i],HEX);
    }
    Serial.println(mes);
  }
  else
  {
    mes = "null";
  }
  float hum = dht.readHumidity();
  float tmp = dht.readTemperature();
  int pir = digitalRead(pinPir);
  
  float co2 = analogRead(pinMg811);
  co2 = co2 *3.3/1024;
  
  data = "{";
  data += "nfc:" + mes;
  data += ",temp:" + String(tmp);
  data += ",hum:" + String(hum);
  data += ",pir:" + String(pir);
  data += ",co2:" + String(toCo2(co2));
  data += "}";
  Serial.println(data);
  

}

int toCo2(float v)
{
  if((v/8.5)>= 0.22)
  {
    return -1;  
  }
  else
  {
   
    return pow(10,(v/8.5) - 0.22/-0.5055125628+2.602);  
  }
}
