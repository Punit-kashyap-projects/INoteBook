"use strict";

var mongoose = require('mongoose');

var mongoURI = 'mongodb://localhost:27017/iNoteBook?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false';

var connectToMongo = function connectToMongo() {
  mongoose.connect(mongoURI, function () {
    console.log('connected to the database successfully!!!!');
  });
};

module.exports = connectToMongo;