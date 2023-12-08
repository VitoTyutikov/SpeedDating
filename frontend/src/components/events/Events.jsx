import { useState, useEffect } from 'react';
import EventCard from './EventCard';
import EventRegister from './EventRegister';
import useLoggedIn from '../../hooks/useLoggedIn';
import useEvents from '../../hooks/useEvents';
import { Grid } from '@mui/material';
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


  return (
    <Grid container spacing={2} justifyContent="center">
  {eventsList.map((event) => (
    <EventCard key={event.id} event={event} />
  ))}
  {isLoggedIn && (
    <Grid item xs={12}>
      <EventRegister onAddEvent={handleAddEvent} />
    </Grid>
  )}
</Grid>
  );
}

export default Events;