import React, { useState } from 'react';
import { Event } from '../../../service/api/Events';
import { CookiesService } from '../../../service/cookies/Cookies';
import { User } from '../../../service/api/User';
import useEvents from '../../../hooks/useEvents';
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

  const { addEvent } = useEvents();

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Handle form submission

    if (CookiesService.getExpiration() < Date.now() + 300) {
      User.updateToken()
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          if (data.access === undefined || data.refresh === undefined || data.roles === undefined || data.expiration === undefined) {
            CookiesService.clearCookies();
            throw new Error('Invalid response from server');
          }
          CookiesService.setCookies(data.access, data.refresh, data.roles, data.expiration);
        })
        .then(() => {
          Event.addEvent(formData)
            .then((response) => response.json())
            .then((newEvent) => {
              addEvent(newEvent); // Update the events state
              // Provide user feedback or redirect
            })
            .catch((error) => {
              // Handle errors
            });
        })
        .catch((error) => {
          console.error('Update token failed:', error);
        })
    } else {
      Event.addEvent(formData)
        .then((response) => response.json())
        .then((newEvent) => {
          addEvent(newEvent);
        })
        .catch((error) => {
          // Handle errors
        });
    }
    // window.location.href = '/events';

    // }
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