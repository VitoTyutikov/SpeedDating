import { useState } from 'react';
import { Event } from '../../service/api/Events';
import apiRequest from '../../service/api/ApiRequest';
import { Card, CardContent, Grid, TextField, Button, Typography } from '@mui/material';

function EventRegister({ onAddEvent }) {
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

  const handleSubmit = (event) => {
    event.preventDefault();

    apiRequest(Event.addEvent, formData)
      .then(response => response.json())
      .then(newEvent => {
        onAddEvent(newEvent);
        setFormData({
          title: "",
          eventDateTime: "",
          address: "",
          price: ""
        });
      })
      .catch(error => {
        console.error('Error submitting event:', error);
      });
  };

  return (
    <Grid container justifyContent="center">
      <Grid item xs={11}>
        <Card>
          <CardContent>
            <Typography variant="h4" gutterBottom>Event Register</Typography>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    label="Title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Event Date"
                    name="eventDateTime"
                    type="datetime-local"
                    value={formData.eventDateTime}
                    onChange={handleChange}
                    required
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Price"
                    name="price"
                    type="number"
                    value={formData.price}
                    onChange={handleChange}
                    required
                    fullWidth
                    InputProps={{ inputProps: { min: 1 } }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button type="submit" variant="contained" fullWidth >Register</Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default EventRegister;