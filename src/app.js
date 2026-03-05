require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const router =require("./routes/userRoutes");

const app = express();
//Middleware to parse JSON
app.use(express.json());

app.use("/api", router);
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
