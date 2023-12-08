import { useState, useEffect } from 'react';
import { Grid, Card, CardContent, Typography, Button } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { Event } from '../../service/api/Events';
import { CookiesService } from '../../service/cookies/Cookies';
import apiRequest from '../../service/api/ApiRequest';

function EventCard({ event }) {
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
        if (response.status === 402) {
          throw new Error('You doesn\'t have enough balance');
        }
        else if (!response.ok) {
          throw new Error('Network response was not ok. Try again');
        }
        return response.json();
      })
      .then((data) => {
        setIsRegistered(true);
      })
      .catch((error) => {
        // console.error('Register to event failed:', error);
        alert(error);
      });
    handleEgtRegisteredUsers();
  };
  const [showRegisteredUsers, setShowRegisteredUsers] = useState(false);
  const handleEgtRegisteredUsers = () => {
    fetchRegisteredUsers();
    setShowRegisteredUsers(!showRegisteredUsers);
  }


  return (
    <Grid item xs={11}>
      <Card>
        <CardContent>
          <Typography variant="h5">
            {event.title} {!isFuture && <span className="ended-text">(Ended)</span>}
          </Typography>
          <Typography>{dateObj.toLocaleString()}</Typography>
          <Typography>{event.address}</Typography>
          <Typography>{`Price: $${event.price}`}</Typography>
          {isFuture && !isRegistered && (
            <Button variant="contained" onClick={handleClick}>Register to event</Button>
          )}
          <Button variant="contained" onClick={handleEgtRegisteredUsers}>Show Registered Users</Button>
        </CardContent>
      </Card>
      {showRegisteredUsers && (
        <Card>
          <CardContent>
            <Typography variant="h6">Registered Users</Typography>
            <ul>
              {registeredUsers.map((user) => (
                <li key={user.id}>
                  <NavLink to={CookiesService.getUserId() === user.id ? '/profile' : `/user/${user.id}`}>
                    {CookiesService.getUserId() === user.id ? 'You' : user.username}
                  </NavLink>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </Grid>
  );
}

export default EventCard;