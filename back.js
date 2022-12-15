const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://admin:admin@cluster0.tzrgkus.mongodb.net/domotica?retryWrites=true&w=majority');
var cors = require('cors')
const express = require('express');


const app = express()
const port = 4000

app.use(cors())

app.listen(port,() => {
    console.log(`Listen in port ${port}`)
} )

app.get('/', (req, res) => {
    res.send('This is the port 4000')
  })

app.get('/api/home', (req, res) => {
    async function getmongo(){
        try{
          const mongopost = await Cat.find().sort({_id:-1}).limit(1)
          console.log(mongopost)
          res.send(mongopost)
        }catch(error){
          console.log(error.message)
        }
      }
    getmongo()
})

const Cat = mongoose.model('home', {
  tiempo: String, 
  Temperatura: Number,
  Humedad: Number,
  Lumens: Boolean,
  CO: Number
});


/*
{
  "Temperatura": 40, 
  "Humedad": 10,
  "CO": 1200,
  "tiempo": "8:30",
  "Lumens": true
}
*/