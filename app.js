const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
dotenv.config();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Import Routes
const taskRoute = require('./routes/tasks');
const authRoute = require('./routes/auth');
const shareRoute = require('./routes/share');

//Route Middlewares
app.use('/api/tasks', taskRoute);
app.use('/api/user', authRoute);
app.use('/api/share', shareRoute);

//ROUTES
app.get('/', (req, res) => {
  res.send("WE are home");
});

//Connect to DB
mongoose.connect(
  process.env.DB_CONNECT,
  { useNewUrlParser: true },
  () =>  console.log('connected to db'));

app.listen(3000);
