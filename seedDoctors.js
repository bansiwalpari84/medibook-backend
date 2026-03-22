const mongoose = require("mongoose");
require("dotenv").config();

const Doctor = require("./models/Doctor");

// 🔥 Paste your frontend data here (REMOVE id)
const doctors = [
   {

    name: "Dr. Pari Test",
    specialization: "Cardiologist",
    experience: "8 years",
    fees: 800000,
    image: "https://img.freepik.com/premium-photo/smiling-female-doctor-white-coat-with-stethoscope_53876-1287435.jpg",
  },

  {

    name: "Dr. Nitesh",
    specialization: "Dermatologist",
    experience: "4 years",
    fees: 400000,
    image: "https://img.freepik.com/premium-photo/smiling-male-doctor-with-stethoscope-clipboard_1134-128699.jpg"
  },

  {
    id: 3,
    name: "Dr. Anushka",
    specialization: "Pediatrician",
    experience: "5 years",
    fees: 500000,
    image: "https://img.freepik.com/premium-photo/smiling-female-doctor-white-coat-with-stethoscope_53876-1287434.jpg"
  },

  {

    name: "Dr. Michael Jones",
    specialization: "Gastroenterologist",
    experience: "1 year",
    fees: 1000,
    image: "https://img.freepik.com/premium-photo/png-male-doctor-adult-white-background-stethoscope_53876-728630.jpg"
  },


  {

    name: "Dr. Abhishek",
    specialization: "General physician",
    experience: "6 years",
    fees: 5000,
    image: "https://img.freepik.com/premium-photo/smiling-male-doctor-with-stethoscope-crossed-arms_53876-1377423.jpg"
  },


  {

    name: "Dr. Angelina",
    specialization: "Neurologist",
    experience: "3 years",
    fees: 1500,
    image: "https://img.freepik.com/premium-photo/smiling-young-female-doctor-lab-coat-with-stethoscope_53876-1370243.jpg"
  },

  {

    name: "Dr. Kim jung",
    specialization: "Neurologist",
    experience: "15 years",
    fees: 50000,
    image: "https://img.freepik.com/premium-photo/cheerful-doctor-png-sticker-transparent-background_53876-977350.jpg"
  },

  {

    name: "Dr. Emily Brown",
    specialization: "Gynecologist",
    experience: "7 years",
    fees: 4000,
    image: "https://img.freepik.com/premium-photo/png-adult-stethoscope-physician-hairstyle_53876-770074.jpg"
  },

  {

    name: "Dr. Kelly",
    specialization: "Gynecologist",
    experience: "4 years",
    fees: 800,
    image: "https://img.freepik.com/premium-photo/png-doctor-white-background-stethoscope-hairstyle_53876-893766.jpg"
  },

  {
    
    name: "Dr. Jhones",
    specialization: "Pediatrician",
    experience: "6 years",
    fees: 900,
    image: "	https://img.freepik.com/premium-photo/smiling-male-doctor-lab-coat-with-stethoscope_1134-94235.jpg"
  },
  
];

async function seedData() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected for seeding");

    // ❗ Clear old data (optional but recommended)
    await Doctor.deleteMany({});

    // 🔥 Insert all at once
    await Doctor.insertMany(doctors);

    console.log("Doctors seeded successfully");

    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

seedData();