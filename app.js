const express = require('express');
const app = express();
const mongoose = require('mongoose');
const uri = 'mongodb+srv://task-admin:Abra-1024@cluster0-uz85s.mongodb.net/test';
const cors = require('cors');

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Import Routes
const taskRoute = require('./routes/tasks');

app.use('/tasks', taskRoute);

//ROUTES
app.get('/', (req, res) => {
  res.send("WE are home");
});

//Connect to DB

mongoose.connect(
  uri,
  { useNewUrlParser: true },
  () =>  console.log('connected to db'));

app.listen(3000);
