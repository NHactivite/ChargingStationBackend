import { ChargingStation } from "../models/stationSchema.js";

import ErrorHandler from "../middleWare/error.js";

export const createStation = async (req, res, next) => {
    try {
        const {name,location,status,powerOutput,connectorType} = req.body;
        const station = await ChargingStation.create({
            name,
            location: {
                latitude: location.latitude,
                longitude: location.longitude
            },
            status,
            powerOutput,
            connectorType
        });
        res.status(201).json({
            success: true,
            message: "Station created successfully",
            station
        });
    } catch (error) {
        next(new ErrorHandler("Failed to create station", 500));
    }
}

export const getAllStations = async (req, res, next) => {
    try {
        const stations = await ChargingStation.find();
        if (!stations ) {
            return next(new ErrorHandler("No charging stations found", 404));
        }
        res.status(200).json({
            success: true,
            stations
        });
    } catch (error) {
        next(new ErrorHandler("Failed to fetch stations", 500));
    }
}

export const updateStation = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!id) {
            return next(new ErrorHandler("Station ID is required", 400));
        }
        const { name, location, status, powerOutput, connectorType } = req.body;
         
        const station = await ChargingStation.findByIdAndUpdate(id, {
            name,
            location: {
                latitude: location.latitude,
                longitude: location.longitude
            },
            status,
            powerOutput,
            connectorType
        }, { new: true });

        if (!station) {
            return next(new ErrorHandler("Charging station not found", 404));
        }

        res.status(200).json({
            success: true,
            message: "Station updated successfully",
            station
        });
    } catch (error) {
        next(new ErrorHandler("Failed to update station", 500));
    }
}

export const deleteStation = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!id) {
            return next(new ErrorHandler("Station ID is required", 400));
        }
        const station = await ChargingStation.findByIdAndDelete(id);
        if (!station) {
            return next(new ErrorHandler("Charging station not found", 404));
        }
        res.status(200).json({
            success: true,
            message: "Station deleted successfully"
        });
    } catch (error) {
        next(new ErrorHandler("Failed to delete station", 500));
    }
}