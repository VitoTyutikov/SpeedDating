import React from 'react';
import { useState, useEffect } from 'react';
import styles from './EventCard.module.css';
import { Event } from '../../../service/api/Events';
import { NavLink } from 'react-router-dom';
import { CookiesService } from '../../../service/cookies/Cookies';
import apiRequest from '../../../service/api/ApiRequest';
function EventCard({ event }) {
  // const isLoggedIn = useLoggedIn();
  let dateStr = event.eventDateTime;
  let dateParts = dateStr.split("T");

  let dateComponent = dateParts[0].split("-");
  let timeComponent = dateParts[1].split(":");

  let dateObj = new Date(dateComponent[0], dateComponent[1] - 1, dateComponent[2], timeComponent[0], timeComponent[1], timeComponent[2]);
  let isFuture = dateObj > Date.now();

  const [isRegistered, setIsRegistered] = useState(false);

  useEffect(() => {
    apiRequest(Event.checkUserRegisteredToEvent, event.id)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((registered) => {
        setIsRegistered(registered);
      })
      .catch((error) => {
        console.error('Error checking registration status:', error);
      });
  }, [event.id]);

  const [registeredUsers, setRegisteredUsers] = useState([]);

  const fetchRegisteredUsers = () => {
    apiRequest(Event.getUsersRegisteredToEvent, event.id)
      .then(response => response.json())
      .then(users => setRegisteredUsers(users))
      .catch(error => console.error('Error fetching registered users:', error));
  };


  const handleClick = () => {
    apiRequest(Event.registerToEvent, event.id)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setIsRegistered(true);
      })
      .catch((error) => {
        console.error('Register to event failed:', error);
        alert('Register to event failed. Please try again.');
      });
      handleEgtRegisteredUsers();
  };
  const [showRegisteredUsers, setShowRegisteredUsers] = useState(false);
  const handleEgtRegisteredUsers = () => {
    fetchRegisteredUsers();
    console.log(registeredUsers);
    setShowRegisteredUsers(!showRegisteredUsers);
  }


  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2>{event.title} {!isFuture && <span className="ended-text">(Ended)</span>}</h2>
        <p>{dateObj.toLocaleString()}</p>
        <p>{event.address}</p>
        <p>{`Price: $${event.price}`}</p>
        {(isFuture && !isRegistered && <button onClick={handleClick}>Register to events</button>) || (!isFuture && <br />)}
         <button onClick={handleEgtRegisteredUsers}>Show Registered Users</button>
        {/* {!isFuture && <br />} */}
        {/* {isLoggedIn && !isFuture && <p>Event has ended</p>} */}
      </div>
      {showRegisteredUsers && (
        <div className={styles.registeredUsers}>
          <h3>Registered Users</h3>
          <ul>
            {registeredUsers.map((user) => (
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