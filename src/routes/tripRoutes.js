const express = require('express');
const router = express.Router();
const tripController = require('../controllers/tripController');
const { protect } = require('../middlewares/authMiddleware');

router.use(protect); // All trip routes require authentication

router.route('/')
    .get(tripController.getUserTrips)
    .post(tripController.createTrip);

router.route('/:id')
    .get(tripController.getTrip)
    .put(tripController.updateTrip)
    .delete(tripController.deleteTrip);

module.exports = router;