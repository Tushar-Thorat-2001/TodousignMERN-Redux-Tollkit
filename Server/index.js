const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors');

const UserModel = require('./Models/User')

const app = express();
app.use(cors())
app.use(express.json())

// create connection
mongoose.connect('mongodb://127.0.0.1:27017/todo')

app.get('/',(req,res)=>{
    UserModel.find()
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

app.post('/create',(req,res)=>{
    UserModel.create(req.body)
    .then(users => res.json(users))
    .catch(users => res.json(users))
})

app.put('/update/:id',(req,res)=>{
    const id = req.params.id;
    UserModel.findByIdAndUpdate({_id:id},{
        name:req.body.name,
        email:req.body.email,
        age:req.body.age
    }).then(user => res.json(user))
    .catch(err => res.json(err))
})

app.delete('/deleteuser/:id', (req, res) => {
    const id = req.params.id;
    UserModel.findByIdAndDelete({_id: id})
    .then(response => res.json(response))
    .catch(err => res.json(err))
})

app.listen(3001,()=>{
    console.log("Server is Running")
})