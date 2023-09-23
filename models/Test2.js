const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const test2Schema = new Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  value1: {
    type: Number,
    required: true,
  },
  value2: {
    type: Number,
    required: true,
  },
  value3: {
    type: Number,
    required: true,
  },
  value4: {
    type: Number,
    required: true,
  },
  value5: {
    type: Number,
    required: true,
  },
  value6: {
    type: Number,
    required: true,
  },
  value7: {
    type: Number,
    required: true,
  },
  value8: {
    type: Number,
    required: true,
  },
  value9: {
    type: Number,
    required: true,
  },
  value10: {
    type: Number,
    required: true,
  },
  avg_value: {
    type: Number,
    required: false,
  },
});

const Test2 = mongoose.model("utest2", test2Schema);

module.exports = Test2;
