const express = require('express');
const router = express.Router();
const verify = require('./verifyToken');
const Task = require('../models/Task');
const User = require('../models/User');

//Create share to task
router.patch('/new/:taskId', verify, async (req, res) => {

  //Check access to modify
  const user = await User.findById(req.user._id);
  const task = await Task.findById(req.params.taskId);
  if(user.email !== task.user.email) {
    res.status(400).send('Access denied');
    return;
  }
  const updatedShare = [...task.share];

  //Check for duplicates
  const accessIndex = updatedShare.indexOf(req.body.access);
  if(accessIndex > -1) {
    res.status(400).send('Alredy exists');
    return;
  }
  updatedShare.push(req.body.access);

  //Create access by email
  try{
    const updatedAccess = await Task.updateOne(
      {_id: req.params.taskId},
      { $set: {share: updatedShare} }
    );
    res.json(updatedAccess);
  } catch (e) {
    res.json({message: e});
  }
});

//Remove share to task
router.patch('/remove/:taskId', verify, async (req, res) => {
  let updatedShare;

  //Check access to modify
  try{
    const user = await User.findById(req.user._id);
    const task = await Task.findById(req.params.taskId);
    if(user.email !== task.user.email) {
      res.status(400).send('Access denied');
      return;
    }
    updatedShare = [...task.share];
  } catch (e) {
    res.json({message: e});
  }

  //Check for available
  const accessIndex = updatedShare.indexOf(req.body.access);
  if(accessIndex < 0) {
    res.status(400).send('Task not found');
    return;
  }
  updatedShare.splice(accessIndex, 1);

  //Remove access by email
  try{
    const updatedAccess = await Task.updateOne(
      {_id: req.params.taskId},
      { $set: {share: updatedShare} }
    );
    res.json(updatedAccess);
  } catch (e) {
    res.json({message: e});
  }
});

module.exports = router;
