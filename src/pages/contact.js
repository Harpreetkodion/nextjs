import { useState, useEffect } from 'react';
import axios from 'axios';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    message: ''
  });
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDarkMode(prefersDarkMode);
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear validation errors when the user starts typing
    setErrors({
      ...errors,
      [e.target.name]: ''
    });
  };

  const validateForm = () => {
    let errors = {};
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    if (!formData.mobile.trim()) {
      errors.mobile = 'Mobile number is required';
    } else if (!/^\d{10}$/.test(formData.mobile)) {
      errors.mobile = 'Mobile number must be 10 digits';
    }
    if (!formData.message.trim()) {
      errors.message = 'Message is required';
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      try {
        await axios.post('/api/postContact', formData);
        setShowPopup(true); // Show popup on successful data submission
      } catch (error) {
        console.error('Error:', error);
      }
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center ${isDarkMode ? 'bg-black' : 'bg-gray-100'}`}>
      <div className="max-w-md w-full p-8 bg-white dark:bg-gray-800 shadow-lg rounded-md">
        <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'} mb-6`}>Contact Us</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className={`block ${isDarkMode ? 'text-white' : 'text-gray-700'} font-semibold mb-2`}>Name</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className={`w-full px-4 py-2 border text-gray-700 rounded-md focus:outline-none focus:border-blue-500 ${errors.name && 'border-red-500'}`} />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="email" className={`block ${isDarkMode ? 'text-white' : 'text-gray-700'} font-semibold mb-2`}>Email</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className={`w-full px-4 py-2 text-gray-700 border rounded-md focus:outline-none focus:border-blue-500 ${errors.email && 'border-red-500'}`} />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="mobile" className={`block ${isDarkMode ? 'text-white' : 'text-gray-700'} font-semibold mb-2`}>Mobile Number</label>
            <input type="text" id="mobile" name="mobile" value={formData.mobile} onChange={handleChange} className={`w-full px-4 py-2 text-gray-700 border rounded-md focus:outline-none focus:border-blue-500 ${errors.mobile && 'border-red-500'}`} />
            {errors.mobile && <p className="text-red-500 text-sm mt-1">{errors.mobile}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="message" className={`block ${isDarkMode ? 'text-white' : 'text-gray-700'} font-semibold mb-2`}>Message</label>
            <textarea id="message" name="message" value={formData.message} onChange={handleChange} className={`w-full px-4 py-2 text-gray-700 border rounded-md resize-none h-32 focus:outline-none focus:border-blue-500 ${errors.message && 'border-red-500'}`}></textarea>
            {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
          </div>
          <button type="submit" className={`w-full ${isDarkMode ? 'bg-blue-500' : 'bg-blue-600'} text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300`}>Submit</button>
        </form>
        {showPopup && (
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
            <div className="p-4 bg-white dark:bg-gray-800 rounded-md shadow-lg">
              <p className={`text-xl ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Data saved successfully!</p>
              <button onClick={() => setShowPopup(false)} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Close</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
