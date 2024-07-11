const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/authRoute");
const cartRoutes = require("./routes/cartRoute");
const restRoute = require("./routes/restRoute");
const adminRoutes= require("./routes/adminRoute");
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // Important
  })
);

app.use(cookieParser());

mongoose
  .connect(
    "mongodb+srv://adityagarg:adityagarg@cluster0.nrepxpj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
  });

app.use("/Restaurant", restRoute);
app.use("/auth", authRoutes);
app.use("/cart", cartRoutes);
app.use("/admin", adminRoutes)

app.listen("3001", () => {
  console.log("Server is running on port 3001");
  console.log("Mongodb is Connected");
});
