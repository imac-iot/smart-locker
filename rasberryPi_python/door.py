import RPi.GPIO as gpio
import time
import paho.mqtt.client as mqtt

pinLed = 18


def gpio_init():
	gpio.setmode(gpio.BOARD)
	gpio.setup(pinLed, gpio.OUT)

def on_connect(client, userdata, flags, rc):
	print "connect" + str(rc)
	client.subscribe("door/1/control")

def on_message(client, userdata, msg):
	print msg.topic + msg.payload
	if(msg.payload == "ok"):
		print "door open"
		gpio.output(pinLed, True)
		time.sleep(3)
		gpio.output(pinLed, False)

if __name__ =="__main__":
	gpio_init()

	client = mqtt.Client()
	client.on_connect = on_connect
	client.on_message = on_message

	client.connect("10.21.20.152", 1883, 60)

	client.loop_forever()


