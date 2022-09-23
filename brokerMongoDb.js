// MQTT broker
const mosca = require('mosca')
const { MongoClient, ServerApiVersion } = require('mongodb');
require("dotenv").config()

const settings =  {port:process.env.PORT || 1234}
const broker = new mosca.Server(settings)
const client = new MongoClient(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


broker.on('ready', ()=>{
    console.log('Broker is ready!')
})
 
broker.on('published', (packet)=>{
    message = packet.payload.toString()
    console.log(message)
    if(message.slice(0,1) != '{' && message.slice(0,4) != 'mqtt'){
        client.connect(err => {
            var myCol = client.db("test").collection("mqtts");
            myCol.insertOne({
                message: message
            }, ()=>{
                console.log('Data is saved to MongoDB')
                client.close()
            })
        })
    }
})