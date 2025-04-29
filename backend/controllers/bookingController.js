import Booking from "../models/Booking.js";


export const  createBooking = async (req, res) => {
    const newBooking = new Booking(req.body);
    try {
        const savedBooking = await newBooking.save();
    res.status(200).json({sucess:true,message:"your tour is booked ",data:savedBooking});
        
    } catch (error) {
        res.status(500).json({sucess:true,message:"internal server error"});
    }
}

export const getBooking = async (req, res) => {
    const id = req.params.id;

    try {
        const book = await Booking.findById(id);

        res
            .status(200)
            .json({
                success: true,
                message: "successful",
                data: book,
            });
    } catch (err) {
        res.status(500).json({
            success: true,
            message: "internal server error",
        });
    }
};

export const getAllBooking = async (req, res) => {  
    try {
        const booking = await Booking.find({});
        res.status(200).json({
            success: true,
            message: "successful",
            data: booking,
        });
    } catch (err) {
        res.status(500).json({
            success: true,
            message: "internal server error",
        });
    }
}
