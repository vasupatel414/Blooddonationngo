import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.js";
import cors from "cors";
import campRoute from "./routes/camp.js";
import bloodRoute from "./routes/blood.js";


//

const path = require('path')


//configure
dotenv.config();

//database connection
connectDB();

//rest api
const app = express();

//middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//routes
app.use("/api/v2/auth", authRoutes);

//camp routes
app.use("/api/v2/camp", campRoute);

//blood routes
app.use("/api/v2/blood", bloodRoute);

//rest api
app.get("/", (req, res) => {
  res.send('<a href="./client/src/app.js">Welcome to Blood Donation</a>');
});

//PORT
const PORT = process.env.PORT || 8000;

//run listen
app.listen(PORT, () => {
  console.log(`server running on PORT no. ${PORT}`);
});

//static files

app.use(express.static(path.join(__dirname,'./client/build')))

app.get('*',function(req,res){
res.sendFile(path.join(__dirname,'./client/build/index.html'))
})