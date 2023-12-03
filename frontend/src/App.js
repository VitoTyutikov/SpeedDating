import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Header from './components/header/Header';
import Login from './components/login/Login';
import Profile from './components/profile/Profile';
import Register from './components/register/Register';
import Events from './components/events/Events';
import UserProfile from './components/profile/UserProfile';
// import UserCard from './components/admin/UserCard';
import UserList from './components/admin/UserList';
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <div className='header'>
          <Header />
        </div>
        <div className='main'>
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/messanges' element={<div>Messanges</div>} />
            <Route path='/events' element={<Events />} />
            <Route path="/user/:id" element={<UserProfile />} />
            <Route path='/users' element={<UserList />} />
          </Routes>
        </div>
        {/* <div className='footer'> */}
      </div>
    </BrowserRouter>

  );
}

export default App;
