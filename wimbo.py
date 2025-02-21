import time
import json
import paho.mqtt.client as mqtt
import RPi.GPIO as GPIO

# AWS IoT Core Configuration
BROKER = "a37t54mfl8hvzi-ats.iot.us-west-2.amazonaws.com"
PORT = 8883
TOPIC = "weather/data"

CERTIFICATE = "/home/vahitu/certs/device.pem.crt"
PRIVATE_KEY = "/home/vahitu/certs/private.pem.key"
ROOT_CA = "/home/vahitu/certs/AmazonRootCA1.pem"

# GPIO Pins
ANEMOMETER_PIN = 17  # Wind speed sensor (reed switch)
RAIN_BUCKET_PIN = 27  # Rain gauge sensor

# Constants
RAIN_MM_PER_TIP = 0.2794  # mm per bucket tip
WIND_SPEED_CONVERSION = 0.6667  # m/s per pulse per second
MEASUREMENT_INTERVAL = 10  # seconds

# Variables
wind_pulse_count = 0
rainfall_count = 0

# GPIO Setup
GPIO.setmode(GPIO.BCM)
GPIO.setup(ANEMOMETER_PIN, GPIO.IN, pull_up_down=GPIO.PUD_UP)
GPIO.setup(RAIN_BUCKET_PIN, GPIO.IN, pull_up_down=GPIO.PUD_UP)

# Wind Speed Counter
def count_wind_pulse(channel):
    global wind_pulse_count
    wind_pulse_count += 1

GPIO.add_event_detect(ANEMOMETER_PIN, GPIO.FALLING, callback=count_wind_pulse)

# Rainfall Counter
def count_rainfall(channel):
    global rainfall_count
    rainfall_count += 1

GPIO.add_event_detect(RAIN_BUCKET_PIN, GPIO.FALLING, callback=count_rainfall)

# MQTT Client Setup
client = mqtt.Client()
client.tls_set(ROOT_CA, CERTIFICATE, PRIVATE_KEY)
client.connect(BROKER, PORT, 60)

def get_wind_speed():
    global wind_pulse_count
    wind_speed = (wind_pulse_count / MEASUREMENT_INTERVAL) * WIND_SPEED_CONVERSION
    wind_pulse_count = 0  # Reset for next measurement
    return round(wind_speed, 2)

def get_rainfall():
    global rainfall_count
    rainfall = rainfall_count * RAIN_MM_PER_TIP
    rainfall_count = 0  # Reset for next measurement
    return round(rainfall, 2)

def publish_data():
    while True:
        wind = get_wind_speed()
        rain = get_rainfall()
        data = {
            "device": "weather-station",
            "wind_speed_mps": wind,
            "rainfall_mm": rain,
            "timestamp": time.time()
        }
        client.publish(TOPIC, json.dumps(data))
        print(f"Published: {data}")
        time.sleep(MEASUREMENT_INTERVAL)

try:
    publish_data()
except KeyboardInterrupt:
    GPIO.cleanup()
    client.disconnect()
