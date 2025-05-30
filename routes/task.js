import express from 'express';
import { createStation, deleteStation, getAllStations, updateStation } from '../controllers/task.js';

const router = express.Router();

router.post("/new",createStation)
router.get("/all",getAllStations)
router.route("/:id").put(updateStation).delete(deleteStation)
export default router;