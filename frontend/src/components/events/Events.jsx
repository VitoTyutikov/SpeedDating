import React from 'react';
import EventCard from './eventCard/EventCard';
import './Events.module.css'
import EventRegister from './eventRegister/EventRegister';
import useLoggedIn from '../../hooks/useLoggedIn';
import useEvents from '../../hooks/useEvents';

function Events() {
  const isLoggedIn = useLoggedIn();
  const { events } = useEvents();
  const items = events.map((event) => (
    <EventCard key={event.id} event={event} />

  ))
  return (
    <div className="container">
      {items}
      {isLoggedIn && <EventRegister />}
    </div>
  );
}

export default Events;