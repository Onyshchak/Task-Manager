const express = require('express');
const router = express.Router();
const verify = require('./verifyToken');
const Task = require('../models/Task');
const User = require('../models/User');

//Create Task
router.post('/', verify, async (req, res) => {
  const user = await User.findById(req.user);
  const task = await new Task({
    title: req.body.title,
    description: req.body.description,
    share: [user.email],
    user: {
      name: user.name,
      email: user.email
    }
  });

  try {
    const savedTask = await task.save();
    res.json(savedTask);
  } catch (e) {
    res.json({message: e});
  }
});

//Get Tasks for some email
router.get('/', verify, async (req, res) => {
  const user = await User.findById(req.user._id);

  try {
    const tasks = await Task.find({share: user.email});
    res.json(tasks);
  } catch (e) {
    res.json({message: e});
  }
});

//Get Tasks for all
// router.get('/', verify, async (req, res) => {
//   try {
//     const tasks = await Task.find();
//     res.json(tasks);
//   } catch (e) {
//     res.json({message: e});
//   }
// });

//Delete Task
router.delete('/:taskId', verify, async (req, res) => {
  try{
    //Check access to delete
    const user = await User.findById(req.user._id);
    const task = await Task.findById(req.params.taskId);

    if(user.email !== task.user.email) {
      res.status(400).send('Access denied');
      return;
    }

    const removedTask = await Task.remove({_id: req.params.taskId});
    res.json(removedTask);
  } catch (e) {
    res.json({message: e});
  }
});

//Task edit
router.patch('/:taskId', verify, async (req, res) => {
  //Check access to edit
  try{
    const user = await User.findById(req.user._id);
    const task = await Task.findById(req.params.taskId);

    if(user.email !== task.user.email) {
      res.status(400).send('Access denied');
      return;
    }

    const updatedAccess = await Task.updateOne(
      {_id: req.params.taskId},
      { $set: {title: req.body.title, description: req.body.description}}
    );
    res.json(updatedAccess);
  } catch (e) {
    res.json({message: e});
  }
});

module.exports = router;
