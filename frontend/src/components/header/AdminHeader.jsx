import { NavLink } from 'react-router-dom';
import { User } from '../../service/api/User';
import Button from '@mui/material/Button';
const AdminHeader = () => {
    const handleLogout = () => {
        User.logout();
    };
    return (
        <>
            <Button color="inherit" component={NavLink} to="/users">Users</Button>
            <Button color="inherit" component={NavLink} to="/events">Events</Button>
            <Button color="inherit" component={NavLink} to="/profile">Profile</Button>
            {/* <Button color="inherit" component={NavLink} to="/messanges">Messanges</Button> */}
            <Button color="inherit" component={NavLink} to='#' onClick={handleLogout}>Logout</Button>
        </>
    )
}

export default AdminHeader;