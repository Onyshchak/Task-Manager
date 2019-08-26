const mongoose = require('mongoose');

const TaskSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    min: 6,
    max: 255
  },
  description: {
    type: String,
    required: false,
    max: 255
  },
  share: [{
    type: String,
    required: true,
    max: 255
  }],
  user: {
    name: {
      type: String,
      required: true,
      min: 3,
      max: 255
    },
    email: {
      type: String,
      required: true,
      min: 6,
      max: 255
    }
  }
});

module.exports = mongoose.model('Tasks', TaskSchema);
