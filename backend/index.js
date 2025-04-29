import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import tourRoutes from './routes/tours.js'; // Correct import
import userRoute from './routes/users.js'; // Correct import
import authRoute from './routes/auth.js'; // Correct import
import reviewRoute from './routes/review.js'; // Correct import
import bookingRoute from './routes/booking.js'; // Correct import

dotenv.config();
const app = express();
const port = process.env.PORT || 8000;
const corsOptions = { 
 origin:true, // Allow all origins
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  }

  mongoose.set("strictPopulate", false);
// Database connection
mongoose.set("strictQuery", false);
 // Disable strict query mode
const connectDB = async () => {
    try {
        console.log('MONGO_URI:', process.env.MONGO_URI); // Debugging log
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection failed:', error.message);
        process.exit(1); // Exit the process with failure
    }
};

// Middleware
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());
app.use('/api/v1/auth', authRoute); // Correct
app.use('/api/v1/tours', tourRoutes); // Correct
app.use('/api/v1/users', userRoute); // Correct
app.use('/api/v1/review', reviewRoute); // Correct
app.use('/api/v1/booking', bookingRoute); // Correct


// Start server
app.listen(port, () => {
    connectDB();
    console.log(`Server is running on port `, port);
});


