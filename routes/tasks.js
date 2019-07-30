const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (e) {
    res.json({message: e});
  }
});

router.post('/', async (req, res) => {
  const task = new Task({
    title: req.body.title,
    description: req.body.description
  });

  try{
    const savedTask = await task.save();
    res.json(savedTask);
  } catch (e) {
    res.json({message: e});
  }
});

router.get('/:taskId', async (req, res) => {
  try{
    const task = await Task.findById(req.params.taskId);
    res.json(task);
  } catch (e) {
    res.json({message: e});
  }
});

// DELETE
router.delete('/:taskId', async (req, res) => {
  try{
    const removedTask = await Task.remove({_id: req.params.taskId});
    res.json(removedTask);
  } catch (e) {
    res.json({message: e});
  }
});

//UPDATE
router.patch('/:taskId', async (req, res) => {
  try{
    const upratedTask = await Task.updateOne(
      {_id: req.params.taskId},
      { $set: {title: req.body.title} }
    );
    res.json(upratedTask);
  } catch (e) {
    res.json({message: e});
  }
});

module.exports = router;
