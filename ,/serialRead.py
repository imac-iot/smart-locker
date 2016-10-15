import serial
import json
from time import sleep
import paho.mqtt.client as mqtt

ser = serial.Serial("/dev/ttyACM0", 9600)
client = mqtt.Client()
client.connect("10.21.20.152", 1883, 60)


while 1:
	#if(ser.inwaiting() > 0):
	try:
		data = ser.readline()
	except OSError:
		print "error"
		sleep(0.05)

	else:
		print data
		client.publish("door/1/data", data, qos=0, retain=False)
		#jdata = json.loads(data)
		#print jdata["co2"]

