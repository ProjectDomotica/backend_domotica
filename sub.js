// MQTT subscriber
const mqtt = require('mqtt')
const client = mqtt.connect(`mqtt://localhost:${process.env.PORT || 1234}`)
const topic = 'lcgjp'

client.on('message', (topic, message)=>{
    message = message.toString()
    console.log(message)
})

client.on('connect', ()=>{
    client.subscribe(topic)
})