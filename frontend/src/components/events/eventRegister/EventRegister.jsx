import React, { useState } from 'react';
import { Event } from '../../../service/api/Events';
import useLoggedIn from '../../../hooks/useLoggedIn';
import { CookiesService } from '../../../service/cookies/Cookies';
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Handle form submission
    if (CookiesService.getExpiration() > Date.now() + 300) {
      await Event.addEvent(formData);
      window.location.href = '/events';
    }
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
}

export default EventRegister;