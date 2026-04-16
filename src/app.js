require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const cookieParser=require("cookie-parser");

const authRouter = require("./routes/authRoutes");
const profileRouter =require("./routes/userRoutes");

const app = express();

app.use(express.json());  //Middleware to parse JSON
app.use(cookieParser()); //for reading the cookies back

app.use("/", authRouter);
app.use("/",profileRouter);
app.use

app.get("/", (req, res) => {
  res.send("API Running");
}); 

connectDB()
.then(()=>{
    console.log("Database connected successfully...");
    app.listen(5000, () => {
    console.log("Server running on port 5000");
});
})
.catch((err)=>{
    console.error("Database connection is failed...")
});




console.log("ENV:",process.env.MONGO_URI);
