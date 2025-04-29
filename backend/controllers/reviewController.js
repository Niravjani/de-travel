import Tour from "../models/Tour.js";
import Review from "../models/Review.js";   
import router from "../routes/review.js";
//import { getAllTour } from "../controllers/tourController.js";

//router.get("/", getAllTour);

export const createReview = async (req,res) =>{
    const tourId = req.params.tourId;
    const newReview = new Review({...req.body});

      
    try{
      const savedReview =await newReview.save()
      const tour = await Tour.findById(tourId);
    if (!tour) {
      return res.status(404).json({ success: false, message: "Tour not found" });
    }
    
     // after creating the new review  now update  review 
     await Tour.findByIdAndUpdate(tourId,{
        $push:{ reviews:savedReview._id },
     });
     res.status(200).json({
        success:true,
        message:"review submitted ",
        data:savedReview
     });

    }catch(err){
        res.status(500).json({
            success:false,
            message:"failed to  submitted ",
            error:err.message,
         });
    }
}
