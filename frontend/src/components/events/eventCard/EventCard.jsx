import React from 'react';
import './EventCard.module.css'
import useLoggedIn from '../../../hooks/useLoggedIn';
function EventCard({ event }) {
  // eslint-disable-next-line
  const isLoggedIn = useLoggedIn();
  let dateStr = event.eventDateTime;
  let dateParts = dateStr.split("T");

  let dateComponent = dateParts[0].split("-");
  let timeComponent = dateParts[1].split(":");

  let dateObj = new Date(dateComponent[0], dateComponent[1] - 1, dateComponent[2], timeComponent[0], timeComponent[1], timeComponent[2]);


  return (
    <div className="event-card">
      <h2>{event.title}</h2>
      <p>{dateObj.toLocaleString()}</p>
      <p>{event.address}</p>
      <p>{`Price: $${event.price}`}</p>
      {isLoggedIn && <button>Register to events</button>}
    </div>
  );
}

export default EventCard;