import React, { useState, useEffect } from 'react';
import EventCard from './eventCard/EventCard';
import './Events.module.css'
import EventRegister from './eventRegister/EventRegister';
import useLoggedIn from '../../hooks/useLoggedIn';
import useEvents from '../../hooks/useEvents';

function Events() {
  const fetchedEvents = useEvents();
  const isLoggedIn = useLoggedIn();
  const [eventsList, setEventsList] = useState([]);

  useEffect(() => {
    setEventsList(fetchedEvents);
  }, [fetchedEvents]);

  const handleAddEvent = (newEvent) => {
    setEventsList([...eventsList, newEvent]);
  };

  const items = eventsList.map((event) => (
    <EventCard key={event.id} event={event} />
  ));

  return (
    <div className="container">
      {items}
      {isLoggedIn && <EventRegister onAddEvent={handleAddEvent} />}
    </div>
  );
}

export default Events;
