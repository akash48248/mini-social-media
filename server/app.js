const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

// এটা যোগ করো
console.log("MONGO_URI =", process.env.MONGO_URI);

const connectDB = require("./config/db");

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes"));

app.get("/", (req, res) => {
  res.send("🚀 Mini Social Media Backend Running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server Running on Port ${PORT}`);
});