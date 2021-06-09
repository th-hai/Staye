const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const locationValidation = require('../../validations/location.validation');
const locationController = require('../../controllers/location.controller');
const roomController = require('../../controllers/room.controller')

const router = express.Router();

router
  .route('/')
  .post(auth('manageLocations'), validate(locationValidation.createLocation), locationController.createLocation)
  .get(locationController.getLocations)

router
  .route('/:locationId?/rooms')  
  .get(validate(locationValidation.getRoomByLocation), roomController.getRoomByLocation)

router
  .route('/:locationId')
  .get(validate(locationValidation.getLocation), locationController.getLocation)
  .patch(auth('manageLocations'), validate(locationValidation.updateLocation), locationController.updateLocation)
  .delete(auth('manageLocations'), validate(locationValidation.deleteLocation), locationController.deleteLocation);
  
module.exports = router;

