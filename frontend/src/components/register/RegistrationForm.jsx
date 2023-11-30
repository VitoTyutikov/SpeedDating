import React, { useState } from 'react';
import './Register.module.css'
import { User } from '../../service/api/User';
const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    gender: '',
    profilePicture: '',
    dateOfBirth: Date.now(),
    bio: '',
    city: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    try {
      User.signup(formData)
        .then((response) => {
          User.login(formData.username, formData.password)
            .then((response) => {
              window.location.href = '/profile';
            });
        })


    } catch (error) {
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <div className="registration-container">
      <h1>Registration</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username:</label>
          <input type="text" name="username" value={formData.username} onChange={handleChange} required={true} />
        </div>
        <div className="form-group">
          <label>First Name:</label>
          <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required={true} />
        </div>
        <div className="form-group">
          <label>Last Name:</label>
          <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required={true} />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required={true} />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required={true} />
        </div>
        <div className="form-group">
          <label>Gender:</label>
          <input type="text" name="gender" value={formData.gender} onChange={handleChange} required={true} />
        </div>
        <div className="form-group">
          <label>Profile Picture:</label>
          <input type="text" name="profilePicture" value={formData.profilePicture} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Date of Birth:</label>
          <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} required={true} />
        </div>
        <div className="form-group">
          <label>Bio:</label>
          <input type="text" name="bio" value={formData.bio} onChange={handleChange} required={true} />
        </div>
        <div className="form-group">
          <label>City:</label>
          <input type="text" name="city" value={formData.city} onChange={handleChange} required={true} />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );

};

export default RegistrationForm;