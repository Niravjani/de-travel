import Tour from "../models/Tour.js";
import Review from "../models/Review.js";  

//import { getAllTour } from "../controllers/tourController.js";

//router.get("/", getAllTour);
export const createReview = async (req, res) => {
    const tourId = req.params.tourId;
    const userId = req.user.id; // Assuming you're using authentication
     const newReview = new Review({ 
            ...req.body,
            tourId,
            userId,
            username: req.user.username // Or however you store usernames
        });
    try {
       

        const savedReview = await newReview.save();
  
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
            success: false,
            message: "Failed to submit review",
            error: err.message,
        });
    }
}
