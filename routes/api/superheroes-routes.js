const express = require('express');

const controller = require('../../controllers/contacts-controllers');

const { validateBody } = require('../../utils');

const { schemas } = require('../../models/superhero')

const { isValidId } = require('../../middlewares');

const router = express.Router();

router.get('/', controller.getAllSupers);

router.get('/:id', isValidId, controller.getSupersById);

router.post('/',  validateBody(schemas.superheroJoiSchema), controller.addSuper);

router.delete('/:id', isValidId, controller.deleteSuper);

router.put('/:id', isValidId, validateBody(schemas.superheroJoiSchema), controller.updateContact);

router.patch('/:id', isValidId, validateBody(schemas.updateSuper), controller.updateSuperById);

module.exports = router;
