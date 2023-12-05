import React, { useState } from 'react';
import { Event } from '../../../service/api/Events';
import apiRequest from '../../../service/api/ApiRequest';

function EventRegister({ onAddEvent }) {
  const [formData, setFormData] = useState({
    title: "",
    eventDateTime: "",
    address: "",
    price: ""
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    apiRequest(Event.addEvent, formData)
      .then(response => response.json())
      .then(newEvent => {
        onAddEvent(newEvent);
      })
      .catch(error => {
        console.error('Error submitting event:', error);
      });
  };

  return (
    <>
      <h2>Event Register</h2>
      <form onSubmit={handleSubmit}>
      <label>
          Title:
          <input type="text" name="title" onChange={handleChange} required/>
        </label>
        <label>
          Event Date:
          <input type="datetime-local" name="eventDateTime" onChange={handleChange} required />
        </label>
        <label>
          Address:
          <input type="text" name="address" onChange={handleChange} required/>
        </label>
        <label>
          Price:
          <input type="number" name="price" onChange={handleChange} min="0" step=".01" required/>
        </label>
        <input type="submit" value="Register" />
      </form>
    </>
  );
};

export default EventRegister;
