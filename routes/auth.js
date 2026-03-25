const express = require("express")
const router = express.Router()
const bcrypt = require("bcryptjs")
const User = require("../models/User")

// REGISTER
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, role, doctorId } = req.body

    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = new User({
      name,
      email,
      password: hashedPassword,
      role,
      doctorId: role === "doctor" ? doctorId : null
    })

    await user.save()

    res.status(201).json({ message: "User registered successfully" })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ message: "User not found" })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" })
    }

    res.json({
      message: "Login successful",
      role: user.role,
      doctorId: user.doctorId,
      email: user.email   
    })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

module.exports = router