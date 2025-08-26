import bcrypt from "bcrypt";
import doctorModel from "./models/doctorModel.js";
import connectDB from "./config/mongodb.js";
import 'dotenv/config'

// Connect to database
connectDB();

const updateDoctorData = async () => {
    try {
        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash("agam", salt);
        
        // Update the doctor with complete information
        const updatedDoctor = await doctorModel.findOneAndUpdate(
            { email: "2002agamsingh@gmai.com" },
            {
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
                slots_booked: {},
                available: true
            },
            { new: true, upsert: true }
        );
        
        console.log("Doctor data updated successfully!");
        console.log("Updated doctor data:");
        console.log({
            id: updatedDoctor._id,
            name: updatedDoctor.name,
            email: updatedDoctor.email,
            speciality: updatedDoctor.speciality,
            degree: updatedDoctor.degree,
            experience: updatedDoctor.experience,
            fees: updatedDoctor.fees,
            available: updatedDoctor.available
        });
        
    } catch (error) {
        console.error("Error:", error);
    } finally {
        process.exit(0);
    }
};

updateDoctorData();
