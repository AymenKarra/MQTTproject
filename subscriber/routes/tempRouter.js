const { query } = require('express')
const express=require('express')
const router = express.Router()
const storage = require('node-persist')

//initialising the persistent storage where we will persist the temperature data
storage.init()

var mqtt = require('mqtt')

//configuration of the mqtt broker (hivemq)
var options = {
    host: '41ecf13b03e2486d933d582b53702052.s2.eu.hivemq.cloud',
    port: 8883,
    protocol: 'mqtts',
    username: 'projetMQTT',
    password: 'Projetmqtt.123'
}

// initialize the MQTT client
var client = mqtt.connect(options);

// logs message once the client is connected  
client.on('connect', function () {
    console.log('Connected');
});

// logs error message in case of failure 
client.on('error', function (error) {
    console.log(error);
});

// called each time a message is received
client.on('message', function (topic, message) {
    //stores the temperature value in a persistent cache (erasing the older values)
    storage.setItem('temp',message.toString())
    console.log('Received message:', topic, message.toString());
});

client.subscribe('temp');

// activate once a GET request is called
router.get('/', async (req,res) => {
    try {
        //gets the latest temperature from the persistent storage
        var temp = await storage.getItem('temp')
        console.log(temp)
        //returns the temperature value in json format
        res.json({ result: temp })
      } catch (err) {
        res.status(500).json({ message: err.message })   
      }
})

module.exports = router
