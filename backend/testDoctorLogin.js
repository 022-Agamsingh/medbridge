import axios from 'axios';

const testDoctorLogin = async () => {
    try {
        console.log('Testing doctor login...');
        
        const response = await axios.post('http://localhost:4000/api/doctor/login', {
            email: '2002agamsingh@gmai.com',
            password: 'agam'
        });
        
        console.log('Login successful!');
        console.log('Response:', response.data);
        
    } catch (error) {
        console.log('Login failed!');
        if (error.response) {
            console.log('Status:', error.response.status);
            console.log('Data:', error.response.data);
        } else if (error.request) {
            console.log('Request error:', error.request);
        } else {
            console.log('Error:', error.message);
        }
    }
};

testDoctorLogin();
