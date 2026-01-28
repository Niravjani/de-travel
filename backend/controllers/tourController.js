import Tour from '../models/Tour.js';
import mongoose from 'mongoose';


// CREATE TOUR
export const createTour = async (req, res) => {
  try {
    const newTour = new Tour(req.body);
    const savedTour = await newTour.save();

    res.status(201).json({
      success: true,
      message: 'Tour created successfully',
      data: savedTour,
    });
  } catch (err) {
    console.error("CREATE TOUR ERROR:", err);
    res.status(500).json({
      success: false,
      message: 'Failed to create tour',
      error: err.message,
    });
  }
};


// UPDATE TOUR
export const updateTour = async (req, res) => {
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid Tour ID" });
    }

    const updatedTour = await Tour.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );

    if (!updatedTour) {
      return res.status(404).json({ success: false, message: "Tour not found" });
    }

    res.status(200).json({
      success: true,
      message: "Tour updated successfully",
      data: updatedTour,
    });
  } catch (err) {
    console.error("UPDATE TOUR ERROR:", err);
    res.status(500).json({ success: false, message: "Failed to update tour" });
  }
};


// DELETE TOUR
export const deleteTour = async (req, res) => {
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid Tour ID" });
    }

    const deletedTour = await Tour.findByIdAndDelete(id);

    if (!deletedTour) {
      return res.status(404).json({ success: false, message: "Tour not found" });
    }

    res.status(200).json({
      success: true,
      message: "Tour deleted successfully",
    });
  } catch (err) {
    console.error("DELETE TOUR ERROR:", err);
    res.status(500).json({ success: false, message: "Failed to delete tour" });
  }
};


// GET SINGLE TOUR
export const getSingleTour = async (req, res) => {
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid Tour ID" });
    }

    const tour = await Tour.findById(id).populate('reviews');

    if (!tour) {
      return res.status(404).json({ success: false, message: "Tour not found" });
    }

    res.status(200).json({
      success: true,
      message: "Tour fetched successfully",
      data: tour,
    });
  } catch (err) {
    console.error("GET SINGLE TOUR ERROR:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


// GET ALL TOURS (PAGINATION)
export const getAllTour = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 0;
    const tours = await Tour.find({})
      .populate('reviews')
      .skip(page * 8)
      .limit(8);

    res.status(200).json({
      success: true,
      message: "Tours fetched successfully",
      data: tours,
    });
  } catch (err) {
    console.error("GET ALL TOUR ERROR:", err);
    res.status(500).json({ success: false, message: "Error fetching tours" });
  }
};


// SEARCH TOUR
export const getTourBySearch = async (req, res) => {
  try {
    const city = new RegExp(req.query.city, 'i');
    const distance = parseInt(req.query.distance) || 0;
    const maxGroupSize = parseInt(req.query.maxGroupSize) || 0;

    const tours = await Tour.find({
      city,
      distance: { $gte: distance },
      maxGroupSize: { $gte: maxGroupSize },
    });

    res.status(200).json({
      success: true,
      message: "Search successful",
      data: tours,
    });
  } catch (err) {
    console.error("SEARCH TOUR ERROR:", err);
    res.status(500).json({ success: false, message: "Search failed" });
  }
};


// FEATURED TOURS
export const getFeaturedTour = async (req, res) => {
  try {
    const tours = await Tour.find({ featured: true })
      .populate('reviews')
      .limit(10);

    res.status(200).json({
      success: true,
      message: "Featured tours fetched",
      data: tours,
    });
  } catch (err) {
    console.error("FEATURED TOUR ERROR:", err);
    res.status(500).json({ success: false, message: "Error fetching featured tours" });
  }
};


// TOUR COUNT
export const getTourCount = async (req, res) => {
  try {
    const count = await Tour.countDocuments();
    res.status(200).json({
      success: true,
      message: "Tour count fetched",
      data: count,
    });
  } catch (err) {
    console.error("COUNT ERROR:", err);
    res.status(500).json({ success: false, message: "Error counting tours" });
  }
};
