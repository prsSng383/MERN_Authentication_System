import express, { json } from "express"
import cors from "cors"
import "dotenv/config.js"
import cookieParser from "cookie-parser"
import { connectDB } from "./config/mongodb.js"
import authRouter from "./routes/authRoutes.js"
import userRouter from "./routes/userRoutes.js"

const app = express();
const port = process.env.PORT || 4000 ;
connectDB();

const allowedOrigins = ['https://mern-authentication-system-frontend.onrender.com']

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:allowedOrigins,
    credentials:true
}))



app.get('/' , (req ,res)=>{ res.send("API Working")})

app.use('/api/auth' , authRouter)
app.use('/api/auth' , userRouter )



app.listen(port , ()=>console.log(`Server started at Port: ${port}`))
