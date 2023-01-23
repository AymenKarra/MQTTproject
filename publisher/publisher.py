import time
import random
import paho.mqtt.client as paho
from paho import mqtt




#creating client with client-id=mqtt-test
client = paho.Client(client_id="1", userdata=None, protocol=paho.MQTTv5)

# enable TLS for secure connection
client.tls_set(tls_version=mqtt.client.ssl.PROTOCOL_TLS)

# set username and password
client.username_pw_set("projetMQTT", "Projetmqtt.123")

# connect to HiveMQ Cloud on port 8883
client.connect("41ecf13b03e2486d933d582b53702052.s2.eu.hivemq.cloud", 8883)


#initializing temperature to 25
temp=25

#generating random temperature and publishing it
while 1:
    #increasing or decreasing temperature randomly
    temp=temp+random.randint(-4,10)
    print (temp)
    #publishing temperature
    client.publish("temp", payload=temp, qos=1)
    time.sleep(2)


