import time
import json
import paho.mqtt.client as mqtt
import RPi.GPIO as GPIO

# AWS IoT Credentials
BROKER = "a37t54mfl8hvzi-ats.iot.us-west-2.amazonaws.com"
PORT = 8883
TOPIC = "weather/data"

# CONFIGURE CORRECT PATHS
CERTIFICATE = "/home/vahitu/certs/device.pem.crt"
PRIVATE_KEY = "/home/vahitu/certs/private.pem.key"
ROOT_CA = "/home/vahitu/certs/AmazonRootCA1.pem"

# GPIO Setup
ANEMOMETER_PIN = 17  # Adjust if needed
wind_speed = 0

def count_wind_speed(channel):
    global wind_speed
    wind_speed += 1  # Each pulse is one rotation

GPIO.setmode(GPIO.BCM)
GPIO.setup(ANEMOMETER_PIN, GPIO.IN, pull_up_down=GPIO.PUD_UP)
GPIO.add_event_detect(ANEMOMETER_PIN, GPIO.FALLING, callback=count_wind_speed)

# MQTT Client
client = mqtt.Client()
client.tls_set(ROOT_CA, CERTIFICATE, PRIVATE_KEY)
client.connect(BROKER, PORT, 60)

def get_wind_speed():
    global wind_speed
    speed = wind_speed * 2.4  # Convert pulses to m/s
    wind_speed = 0  # Reset counter
    return speed

def publish_data():
    while True:
        wind = get_wind_speed()
        data = {
            "device": "weather-station",
            "wind_speed": wind,
            "timestamp": time.time()
        }
        client.publish(TOPIC, json.dumps(data))
        print(f"Published: {data}")
        time.sleep(10)  # Send data every 10 seconds

try:
    publish_data()
except KeyboardInterrupt:
    GPIO.cleanup()
    client.disconnect()
