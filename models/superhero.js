const { Schema, model } = require("mongoose");
const Joi = require('joi');
const {handleMongooseError} = require("../utils")

const superheroSchema = new Schema({
  nickname: {
    type: String,
    required: true,
  },
  real_name: {
    type: String,
    required: true,
  },
  origin_description: {
    type: String,
    required: true,
  },
  superpowers: {
    type: [String],
    required: true,
  },
  catch_phrase: {
    type: String,
    required: true,
  },
  images: {
    type: [String],
    default: [],
  },
});

const Superhero = model('superhero', superheroSchema);

superheroSchema.post("save", handleMongooseError);

const superheroJoiSchema = Joi.object({
  nickname: Joi.string().required(),
  real_name: Joi.string().required(),
  origin_description: Joi.string().required(),
  superpowers: Joi.array().items(Joi.string()).required(),
  catch_phrase: Joi.string().required(),
  images: Joi.array().items(Joi.string()),
});

const schemas = {
  superheroJoiSchema,
}

module.exports = {
    Superhero,
    schemas
}

