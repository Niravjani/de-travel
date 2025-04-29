import Tour from '../models/Tour.js'; 

//create anew tour 
export const createTour = async (req, res) => {
    const newTour = new Tour(req.body);
    try {
        const savedTour = await newTour.save();
        res.status(200).json({ success: true, message: 'Successfully created', data: savedTour });
      } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to create tour, try again ', error: err.message });
      }
      
}

//upload tour 
export const updateTour = async (req, res) => {
  const id = req.params.id;
  try {
    const updatedTour = await Tour.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Successfully updated",
      data: updatedTour, // Corrected variable name
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to update tour, try again",
    });
  }
};
//delete tour 
export const deleteTour = async (req, res) => {
    const id = req.params.id
    
  try {
    await Tour.findByIdAndDelete(id);
    res.status(200).json({
    success: true,
    message: "Successfully deleted",
    });
    } catch (err) {
    res.status(500).json({
    success: false,
    message: "failed to delete",
    });
    }
};
//get single tour 
export const getSingleTour = async (req, res) => {
  const id = req.params.id
  try {
    const tour = await Tour.findById(id).populate('review');
    if (!tour) {
    res.status(200).json({
    success: true,
    message: "Successfully deleted",
    data: tour
    });}
    } catch (err) {
    res.status(404).json({
    success: false,
    message: "not found",
    });
    }
};
//get all tour 
export const getAllTour = async (req, res) => {
  const pages = parseInt(req.query.pages) || 0; // Default to 0 if not provided
  
  try {
    const tours = await Tour.find({}).populate('review').skip(pages *8).limit(8);
    if (tours.length === 0) {
      return res.status(404).json({ success: false, message: "No tours found" });
    }
    res.status(200).json({ success: true, message: "Successful", data: tours });
    } catch (err) {
console.error(err);
    res.status(404).json({
    success: false,
    message: "an error occured while fechting",
  error: err.message,});
    }
};


//getting search tour
export const getTourBySearch = async (req, res) => {
  // here 'i' means case sensitive
  const city = new RegExp(req.query.city, 'i');
  const distance = parseInt(req.query.distance);
  const maxGroupSize = parseInt(req.query.maxGroupSize);

  try {
    const tours = await Tour.find({city, distance:{$gte:distance}, maxGroupSize:{$gte:maxGroupSize}} );
      // gte means greater than or equal to
      res.status(200).json({
        success: true,
        message: "Successful",
        data: tours,
        });
        
  } catch (err) {
console.error(err);
    // Handle error
    res.status(404).json({
      success: false,
      message: "search not found",}); 
  }
};

//get featured tour 
export const getFeaturedTour = async (req, res) => {
  try {
    const tours = await Tour.find({ featured: true }).populate('review').limit(10);
    res.status(200).json({
      success: true,
      message: "Successful",
      data: tours,
    });
  } catch (err) {
console.error(err);
    res.status(404).json({
      success: false,
      message: "not found",
    });
  }
};  
//get tourcount
export const getTourCount = async (req, res) => {
  try {
    const count = await Tour.countDocuments();
    res.status(200).json({
      success: true,
      message: "Successful",
      data: count,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "not found",
    });
  }
};