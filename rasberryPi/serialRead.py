import serial
import json
ser = serial.Serial("/dev/ttyACM0", 9600)

ser.readline()
ser.readline()
ser.readline()
ser.readline()
ser.readline()
ser.readline()

while 1:
	data = ser.readline()
	print data
	jdata = json.loads(data)
	print jdata["co2"]

