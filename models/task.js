const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  
  body: String,
  isComplete: { type: Boolean, required: true, default: false },
  date: { type: Date, default: Date.now }

});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;