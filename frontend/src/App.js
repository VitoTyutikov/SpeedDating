import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Container, Box } from '@mui/material';

import Header from './components/header/Header';
import Login from './components/login/Login';
import Profile from './components/profile/Profile';
import Register from './components/register/Register';
import Events from './components/events/Events';
import UserProfile from './components/profile/UserProfile';
import UserList from './components/admin/UserList';
// import backgroundImage from './background.png'

function App() {
  return (
    <BrowserRouter>
      {/* <Box style={{ backgroundImage: `url(${backgroundImage})`, minHeight: '100vh' }}>  */}
      <Box style={{ backgroundColor: 'lightgray', minHeight: '100vh' }}> 
        <Container>
          <Box className='header'>
            <Header />
          </Box>
          <Box className='main'>
            <Routes>
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route path='/profile' element={<Profile />} />
              <Route path='/messanges' element={<Box>Messanges</Box>} />
              <Route path='/events' element={<Events />} />
              <Route path="/user/:id" element={<UserProfile />} />
              <Route path='/users' element={<UserList />} />
            </Routes>
          </Box>
        </Container>
      </Box>
    </BrowserRouter>
  );
}

export default App;
