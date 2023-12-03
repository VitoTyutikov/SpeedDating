import React from 'react';
import { useState, useEffect } from 'react';
import styles from './EventCard.module.css';
import useLoggedIn from '../../../hooks/useLoggedIn';
import { Event } from '../../../service/api/Events';
import { Link, NavLink } from 'react-router-dom';
import { CookiesService } from '../../../service/cookies/Cookies';
// import { CookiesService } from '../../../service/cookies/Cookies';
function EventCard({ event }) {
  // eslint-disable-next-line
  const isLoggedIn = useLoggedIn();
  let dateStr = event.eventDateTime;
  let dateParts = dateStr.split("T");

  let dateComponent = dateParts[0].split("-");
  let timeComponent = dateParts[1].split(":");

  let dateObj = new Date(dateComponent[0], dateComponent[1] - 1, dateComponent[2], timeComponent[0], timeComponent[1], timeComponent[2]);
  let isFuture = dateObj > Date.now();

  const [isRegistered, setIsRegistered] = useState(false);

  useEffect(() => {
    // Assume the current user's ID is available somehow, e.g., from a user context or authentication service

    // Call the backend to check if the user is registered for the event
    Event.checkUserRegisteredToEvent(event.id)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((registered) => {
        // let response = registered.json();
        setIsRegistered(registered);
        // console.log(registered);
      })
      .catch((error) => {
        console.error('Error checking registration status:', error);
      });
  }, [event.id]);

  const handleClick = () => {
    Event.registerToEvent(event.id)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        // Assuming the API returns some data indicating success,
        // Update the isRegistered state to hide the button
        setIsRegistered(true);
      })
      .catch((error) => {
        console.error('Register to event failed:', error);
        alert('Register to event failed. Please try again.');
      });
  };
  const [showRegisteredUsers, setShowRegisteredUsers] = useState(false);
  const handleEgtRegisteredUsers = () => {
    setShowRegisteredUsers(!showRegisteredUsers);
  }


  return (
    <div className={styles['event-card-container']}>
      <div className={styles['event-card']}>
        <h2>{event.title} {!isFuture && <span className="ended-text">(Ended)</span>}</h2>
        <p>{dateObj.toLocaleString()}</p>
        <p>{event.address}</p>
        <p>{`Price: $${event.price}`}</p>
        {(isLoggedIn && isFuture && !isRegistered && <button onClick={handleClick}>Register to events</button>) || (!isFuture && <br />)}
        {(isLoggedIn && isFuture && <button onClick={handleEgtRegisteredUsers}>Show Registered Users</button>) || (!isFuture && <br />)}
        {/* {!isFuture && <br />} */}
        {/* {isLoggedIn && !isFuture && <p>Event has ended</p>} */}
      </div>
      {showRegisteredUsers && (
        <div className={styles['registered-users']}>
          <h3>Registered Users</h3>
          <ul>
            {event.registeredUsers.map((user) => (
              <li key={user.id}>
                <NavLink to={CookiesService.getUserId() === user.id ? '/profile' : `/user/${user.id}`}>{CookiesService.getUserId() === user.id ? 'You' : user.username}</NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>

  );
}

export default EventCard;