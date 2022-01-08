"use strict";

var mongoose = require("mongoose");

var Schema = mongoose.Schema;
var userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  timeStamp: {
    type: String,
    "default": Date.now
  }
});
var user = mongoose.model("user", userSchema);
module.exports = user;