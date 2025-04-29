import express from 'express'
import { createTour,deleteTour,updateTour ,getSingleTour,getAllTour,getTourBySearch, getFeaturedTour,getTourCount} from '../controllers/tourController.js';
import { verifyAdmin } from '../utils/verifyToken.js';


const router = express.Router()

// create new tour
router.post("/", verifyAdmin,createTour);
// update  tour
router.put("/:id",verifyAdmin, updateTour);
// create new tour
router.delete("/:id", verifyAdmin, deleteTour);
// single tour
router.get("/:id", getSingleTour);
// all tours
router.get("/", getAllTour);
// search tour
router.get("/search/getTourBySearch", getTourBySearch);
//featured tour 
router.get("/search/getFeatured", getFeaturedTour);
//tour count
router.get("/search/getTourCount", getTourCount);

export default router;
