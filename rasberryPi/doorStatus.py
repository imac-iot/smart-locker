import RPi.GPIO as gpio
import paho.mqtt.client as mqtt
import time

doorStatus = 22

def gpio_init():
	gpio.setmode(gpio.BOARD)
	gpio.setup(doorStatus, gpio.IN)

if __name__ =="__main__":
	gpio_init()
	status = 0
	input = 0
	
	client = mqtt.Client()
	client.connect("10.21.20.152", 1883, 60)
	while(1):
		input = gpio.input(doorStatus)
		print str(input)
		if( input != status):
			status = input
			client.publish("door/1/status", status, qos=0, retain=False)
		time.sleep(1)
		
