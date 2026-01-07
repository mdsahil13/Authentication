const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");

dotenv.config();
connectDB();
const app = express();
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));
app.use(express.json());



app.get("/", (req,res) =>{
    res.send("server is running")
});
app.post("/test", (req, res) => {
  res.json({ message: "Test route working" });
});


app.use("/api/auth", require("./routes/authRoutes"));

const PORT = 5000;
app.listen(PORT, () =>{

});