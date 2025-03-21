import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';


dotenv.config()
const app = express()


//middleware
app.use(cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173/",  
    credentials: true,  
  }))
app.use(express.json()) // body parser middleware

// connect to MongoDB
connectDB()

app.use('/api', productRoutes);


const PORT = process.env.PORT || 5000

app.listen(PORT, ()=>console.log(`Server running on port ${PORT}`))