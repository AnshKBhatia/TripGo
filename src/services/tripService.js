const Trip = require('../models/Trip');
const logger = require('../utils/logger');

class TripService {
    // Create new trip
    async createTrip(tripData, userId) {
        try {
            const trip = await Trip.create({
                ...tripData,
                user: userId
            });
            return trip;
        } catch (error) {
            logger.error('Error creating trip:', error);
            throw error;
        }
    }

    // Get all trips for a user
    async getUserTrips(userId) {
        try {
            const trips = await Trip.find({ user: userId }).sort('-createdAt');
            return trips;
        } catch (error) {
            logger.error('Error fetching user trips:', error);
            throw error;
        }
    }

    // Get single trip
    async getTripById(tripId, userId) {
        try {
            const trip = await Trip.findOne({ _id: tripId, user: userId });
            if (!trip) {
                throw new Error('Trip not found');
            }
            return trip;
        } catch (error) {
            logger.error('Error fetching trip:', error);
            throw error;
        }
    }

    // Update trip
    async updateTrip(tripId, userId, updateData) {
        try {
            const trip = await Trip.findOneAndUpdate(
                { _id: tripId, user: userId },
                updateData,
                { new: true, runValidators: true }
            );
            if (!trip) {
                throw new Error('Trip not found');
            }
            return trip;
        } catch (error) {
            logger.error('Error updating trip:', error);
            throw error;
        }
    }

    // Delete trip
    async deleteTrip(tripId, userId) {
        try {
            const trip = await Trip.findOneAndDelete({ _id: tripId, user: userId });
            if (!trip) {
                throw new Error('Trip not found');
            }
            return trip;
        } catch (error) {
            logger.error('Error deleting trip:', error);
            throw error;
        }
    }
}

module.exports = new TripService();