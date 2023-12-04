import React, { useState } from 'react';
import { Event } from '../../../service/api/Events';
import apiRequest from '../../../service/api/ApiRequest';
function EventRegister() {

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

  // const { addEvent } = useEvents();

  const handleSubmit = (event) => {
    event.preventDefault();

    apiRequest(Event.addEvent, formData)
      .then(response => response.json())
      // .then(newEvent => {
      //   addEvent(newEvent); // Update the events state
      //   // Provide user feedback or redirect
      // })
      .catch(error => {
        console.error('Error submitting event:', error);
        // Handle errors, such as showing an error message
      });

    // Redirect or update UI as needed after successful form submission
  };


  return (
    <>
      <h2>Event Register</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input type="text" name="title" onChange={handleChange} />
        </label>
        <label>
          Event Date:
          <input type="datetime-local" name="eventDateTime" onChange={handleChange} />
        </label>
        <label>
          Address:
          <input type="text" name="address" onChange={handleChange} />
        </label>
        <label>
          Price:
          <input type="number" name="price" onChange={handleChange} min="0" step=".01" />
        </label>
        <input type="submit" value="Register" />
      </form>
    </>
  );
};

export default EventRegister;