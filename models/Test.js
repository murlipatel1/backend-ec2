const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const testSchema = new Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  bipolar_disorder: {
    type: Number,
    required: true,
  },
  eating_disorder: {
    type: Number,
    required: true,
  },
  anxiety_disorder: {
    type: Number,
    required: true,
  },
  prevalence_drug_disorder: {
    type: Number,
    required: true,
  },
  depressive_disorder: {
    type: Number,
    required: true,
  },
  final_disease_value: {
    type: Number,
    required: false,
  },
});

const Test = mongoose.model("utest", testSchema);

module.exports = Test;
