import axios from 'axios';

const testConnection = async () => {
    try {
        console.log('Testing backend connection...');
        
        const response = await axios.get('http://localhost:4000/');
        console.log('Backend is accessible!');
        console.log('Response:', response.data);
        
    } catch (error) {
        console.log('Backend connection failed!');
        if (error.response) {
            console.log('Status:', error.response.status);
            console.log('Data:', error.response.data);
        } else if (error.request) {
            console.log('No response received');
        } else {
            console.log('Error:', error.message);
        }
    }
};

testConnection();
