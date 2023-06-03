const express = require('express');

const controller = require('../../controllers/superheroes-controllers');

const { validateBody } = require('../../utils');

const { schemas } = require('../../models/superhero')

const { isValidId } = require('../../middlewares');

const router = express.Router();

router.get('/', controller.getAllSupers);

router.get('/info/:id', isValidId, controller.getSuperById);

router.post('/create',  validateBody(schemas.superheroJoiSchema), controller.addSuper);

router.delete('/info/:id/delete', isValidId, controller.deleteSuper);

router.put('/info/:id/update', isValidId, validateBody(schemas.superheroJoiSchema), controller.updateSuper);

module.exports = router;