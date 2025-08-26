import bcrypt from "bcrypt";
import doctorModel from "./models/doctorModel.js";
import connectDB from "./config/mongodb.js";
import 'dotenv/config'

// Connect to database
connectDB();

const createDoctor = async () => {
    try {
        // Check if doctor already exists
        const existingDoctor = await doctorModel.findOne({ email: "2002agamsingh@gmai.com" });
        
        if (existingDoctor) {
            console.log("Doctor already exists. Updating password...");
            
            // Hash the password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash("agam", salt);
            
            // Update the existing doctor with hashed password
            await doctorModel.findByIdAndUpdate(existingDoctor._id, {
                password: hashedPassword
            });
            
            console.log("Doctor password updated successfully!");
        } else {
            console.log("Creating new doctor...");
            
            // Hash the password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash("agam", salt);
            
            // Create new doctor data
            const doctorData = {
                name: "Dr. Agam Singh",
                email: "2002agamsingh@gmai.com",
                password: hashedPassword,
                speciality: "General physician",
                degree: "MBBS",
                experience: "4 Years",
                about: "Dr. Agam Singh has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.",
                fees: 50,
                address: JSON.stringify({ line1: "17th Cross, Richmond", line2: "Circle, Ring Road, London" }),
                date: Date.now(),
                slots_booked: {}
            };
            
            // Create and save the doctor
            const newDoctor = new doctorModel(doctorData);
            await newDoctor.save();
            
            console.log("New doctor created successfully!");
        }
        
        console.log("Doctor data:");
        const doctor = await doctorModel.findOne({ email: "2002agamsingh@gmai.com" });
        console.log({
            id: doctor._id,
            name: doctor.name,
            email: doctor.email,
            speciality: doctor.speciality,
            available: doctor.available
        });
        
    } catch (error) {
        console.error("Error:", error);
    } finally {
        process.exit(0);
    }
};

createDoctor();
