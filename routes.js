const express = require('express')
const app = express()

let alumnos = [ 
  {
    nombre: "Eduardo",
    matricula: 10001021,  
  }, 
  {
    nombre: "Antonio",
    matricula: 10001022,  
  }, 
  {
    nombre: "Rodrigo",
    matricula: 10001023,  
  }, 
  {
    nombre: "Gonzalo",
    matricula: 10001024,  
  }
]

app.get('/', (req, res) => {
  res.send('¡Bienvenid@ a SICEI!')
})

app.get('/alumnos', (req, res) => {
  res.json(alumnos)
} )

module.exports = app 