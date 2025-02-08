const tripService = require('../services/tripService');
const logger = require('../utils/logger');

class TripController {
    // Create new trip
    async createTrip(req, res) {
        try {
            const trip = await tripService.createTrip(req.body, req.user._id);
            res.status(201).json(trip);
        } catch (error) {
            logger.error('Trip creation error:', error);
            res.status(400).json({ message: error.message });
        }
    }

    // Get all trips for a user
    async getUserTrips(req, res) {
        try {
            const trips = await tripService.getUserTrips(req.user._id);
            res.json(trips);
        } catch (error) {
            logger.error('Trips fetch error:', error);
            res.status(400).json({ message: error.message });
        }
    }

    // Get single trip
    async getTrip(req, res) {
        try {
            const trip = await tripService.getTripById(req.params.id, req.user._id);
            res.json(trip);
        } catch (error) {
            logger.error('Trip fetch error:', error);
            res.status(404).json({ message: error.message });
        }
    }

    // Update trip
    async updateTrip(req, res) {
        try {
            const trip = await tripService.updateTrip(req.params.id, req.user._id, req.body);
            res.json(trip);
        } catch (error) {
            logger.error('Trip update error:', error);
            res.status(400).json({ message: error.message });
        }
    }

    // Delete trip
    async deleteTrip(req, res) {
        try {
            await tripService.deleteTrip(req.params.id, req.user._id);
            res.json({ message: 'Trip deleted successfully' });
        } catch (error) {
            logger.error('Trip deletion error:', error);
            res.status(400).json({ message: error.message });
        }
    }
}

module.exports = new TripController();