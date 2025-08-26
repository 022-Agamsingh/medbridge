import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import doctorModel from './models/doctorModel.js';
import 'dotenv/config';

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI);

async function hashExistingPassword() {
    try {
        // Find the doctor with plain text password
        const doctor = await doctorModel.findOne({ email: '2002agamsingh@gmai.com' });
        
        if (!doctor) {
            console.log('Doctor not found');
            return;
        }
        
        console.log('Found doctor:', doctor.email);
        console.log('Current password:', doctor.password);
        
        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('agam', salt);
        
        // Update the doctor's password
        await doctorModel.findByIdAndUpdate(doctor._id, { password: hashedPassword });
        
        console.log('Password updated successfully!');
        console.log('New hashed password:', hashedPassword);
        
        // Test the login
        const isMatch = await bcrypt.compare('agam', hashedPassword);
        console.log('Password verification test:', isMatch);
        
        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

hashExistingPassword();
