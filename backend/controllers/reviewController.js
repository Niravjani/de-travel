import Tour from "../models/Tour.js";
import Review from "../models/Review.js";   

//import { getAllTour } from "../controllers/tourController.js";

//router.get("/", getAllTour);

export const createReview = async (req,res) =>{
    const tourId = req.params.tourId;
    const newReview = new Review({ ...req.body });
    try {
        const tour = await Tour.findById(tourId);
        if (!tour) {
            return res.status(404).json({
                success: false,
                message: "Tour not found.",
            });
        }

        const savedReview = await newReview.save();

        // Update the tour with the new review
        await Tour.findByIdAndUpdate(tourId, {
            $push: { reviews: savedReview._id },
        });

        res.status(200).json({
            success: true,
            message: "Review submitted.",
            data: savedReview,
        });
    } catch (err) {
        res.status(500).json({
            success:false,
            message:"failed to  submitted ",
            error:err.message,
         });
    }
}
