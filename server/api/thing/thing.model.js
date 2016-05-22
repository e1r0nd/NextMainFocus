'use strict';

import mongoose from 'mongoose';

var ThingSchema = new mongoose.Schema({
  title: String, //name of the project/task
  type: String, //project of task
  acronym: String, //acronym for projects
  project: String, //parent project; 0 for projects
  active: Boolean //done or not
});

export default mongoose.model('Thing', ThingSchema);
