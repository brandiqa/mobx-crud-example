'use strict';

// contact-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-type-email');

const contactSchema = new Schema({
  name : {
    first: { type: String, required: [true, "First Name is required"] },
    last: { type: String, required: false }
  },
  email : { type: mongoose.SchemaTypes.Email, required: [true, "Email is required"] },
  phone : { type: String, required: [true, "Phone is required"] },
  createdAt: { type: Date, 'default': Date.now },
  updatedAt: { type: Date, 'default': Date.now }
});

const contactModel = mongoose.model('contact', contactSchema);

module.exports = contactModel;
