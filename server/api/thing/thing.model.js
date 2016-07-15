'use strict';

import mongoose from 'mongoose';

var ThingSchema = new mongoose.Schema({
  type: String,
  title: String,
  parent: String,
  acronym: String,
  order: Number,
  active: Boolean
});

export default mongoose.model('Thing', ThingSchema);
