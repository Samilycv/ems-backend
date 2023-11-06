//1 import express
const express = require('express');

//2 import cors
const cors = require('cors');

//import logic
const logic = require('./services/logic')

//3 Create a server application using express
const server = express()

//4 use cors
server.use(cors({
    origin: 'http://localhost:3000'
}))

server.use(express.json())

server.listen(8000, () => {
    console.log('listening on the port 8000');
})

//get all employees api
server.get('/getEmployees', (req, res) => {
    logic.allEmployees().then((response) => {
        res.status(response.statusCode).json(response)
    })
})

//add employees api
server.post('/addEmployee', (req, res) => {
    logic.addEmployee(req.body.id, req.body.name, req.body.age, req.body.designation, req.body.salary).then((response) => {
        res.status(response.statusCode).json(response)
    })
})

//delete employees api
server.delete('/deleteEmployee/:id', (req, res) => {
    logic.deleteEmployee(req.params.id).then((response) => {
        res.status(response.statusCode).json(response)
    })
})

//get a particular employee 
server.get('/getAnEmployee/:id',(req,res)=>{
    logic.getAnEmp(req.params.id).then((response)=>{
        res.status(response.statusCode).json(response)
    })
})

//update an employee details
server.post('/updateAnEmployee/:id',(req,res)=>{
    logic.updateAnEmp(req.params.id,req.body.id,req.body.name,req.body.age,req.body.designation,req.body.salary).
    then((response)=>{
        res.status(response.statusCode).json(response)
    })
})