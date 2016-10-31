import serial
import json

ser = serial.Serial("/dev/ttyACM0", 9600)
data = ser.readline()
data = ser.readline()

for i in range(0,10):
    data = ser.readline()
    print data
    data = data[: -2]
    jdata = json.loads(data)
    print jdata
    print jdata["co2"]
