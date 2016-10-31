import RPi.GPIO as gpio
import paho.mqtt.client as mqtt
import time
import serial
import json
from time import sleep
import paho.mqtt.client as mqtt



doorStatus = 22

def gpio_init():
	gpio.setmode(gpio.BOARD)
	gpio.setup(doorStatus, gpio.IN)

if __name__ =="__main__":
	gpio_init()
	status = 0
	input = 0

	ser = serial.Serial("/dev/ttyACM0", 9600)	
	client = mqtt.Client()
	client.connect("10.21.20.152", 1883, 60)
	while(1):
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
		input = gpio.input(doorStatus)
		print str(input)
		if( input != status):
			status = input
			client.publish("door/1/status", status, qos=0, retain=False)
		time.sleep(1)
		
