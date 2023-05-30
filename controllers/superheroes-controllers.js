const {Superhero} = require("../models/superhero");

const HttpError = require('../helpers');

const {controllerWrapper} = require('../utils')

const addSuper = async (req, res) => {
  const superheroData = req.body;
  const superhero = await Superhero.create(superheroData);
  res.status(201).json(superhero);
};

const getAllSupers = async (req, res) => {
  const { page = 1, limit = 5 } = req.query;
    const options = {
      skip: (parseInt(page) - 1) * parseInt(limit),
      limit: parseInt(limit),
    };
    const count = await Superhero.countDocuments();
    const superheroes = await Superhero.find({}, null, options);
    res.json({
      totalItems: count,
      currentPage: parseInt(page),
      totalPages: Math.ceil(count / parseInt(limit)),
      superheroes,
    });
};

const getSuperById = async (req, res) => {
  const superheroId = req.params.id;
  const superhero = await Superhero.findById(superheroId);
  if (!superhero) {
    throw HttpError(404, `Superhero with id ${id} wasn't found`)
  }
  res.json(superhero);
};

const updateSuper = async (req, res) => {
  const superheroId = req.params.id;
  const superheroData = req.body;
  const superhero = await Superhero.findByIdAndUpdate(superheroId, superheroData, {
    new: true,
    runValidators: true,
  });
  if (!superhero) {
    throw HttpError(404, `Superhero with id ${id} wasn't found`)
  }
    res.json(superhero);
};

// Delete a superhero
const deleteSuper = async (req, res) => {
  const superheroId = req.params.id;
  const superhero = await Superhero.findByIdAndDelete(superheroId);
  if (!superhero) {
    throw HttpError(404, `Superhero with id ${id} wasn't found`)
  }
  res.json(superhero);
};

module.exports = {
  getAllSupers: controllerWrapper(getAllSupers),
  getSuperById: controllerWrapper(getSuperById),
  addSuper: controllerWrapper(addSuper),
  deleteSuper: controllerWrapper(deleteSuper),
  updateSuper: controllerWrapper(updateSuper),
}