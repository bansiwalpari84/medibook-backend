const express = require("express");
const cors = require("cors");
const User = require("./models/User")
const bcrypt = require("bcryptjs")
const mongoose = require("mongoose");
const appointmentRoutes = require("./routes/appointmentRoutes");
require("dotenv").config();

const app = express(); // FIRST create app

// middleware
app.use(cors());
app.use(express.json());

//for appointment routes 
app.use("/api/appointments", appointmentRoutes);

// routes (AFTER app is created)
const doctorRoutes = require("./routes/doctorRoutes");
app.use("/api/doctors", doctorRoutes);
const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

const createAdmin = async () => {
  try {
    const existingAdmin = await User.findOne({
  email: "bansiwalpari8@gmail.com",
  role: "admin"
})

       

    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash("admin12345678", 10)
      
    await User.create({
      name: "Admin Pari",
      email: "bansiwalpari8@gmail.com",
      password: hashedPassword,
      role: "admin"
    })

 console.log("❌ No admin found, creating one...")
    } else {
      console.log("✅ Admin already exists:", existingAdmin.email)
    }
  } catch (err) {
    console.log("Admin creation error:", err)
  }
}

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
   .then(() => {
    console.log("✅ MongoDB Connected")
    createAdmin()
  })
  .catch((err) => {
    console.error("❌ MongoDB Error:", err.message);
  });


// test route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);

});