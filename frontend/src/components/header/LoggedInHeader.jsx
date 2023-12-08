import { NavLink } from 'react-router-dom';
import { User } from '../../service/api/User';
import Button from '@mui/material/Button';
const LoggedInHeader = () => {
    const handleLogout = () => {
        User.logout();
    };
    return (
        <>
            {/* <NavLink to='/events' className={css.NavLink}>Events</NavLink>
        <NavLink to='/messanges' className={css.NavLink}>Messanges</NavLink>
        <NavLink to='/profile' className={css.NavLink}>Profile</NavLink>
        <NavLink to='#' className={css.NavLink} onClick={handleLogout}>Logout</NavLink> */}
            <Button color="inherit" component={NavLink} to="/events">Events</Button>
            <Button color="inherit" component={NavLink} to="/profile">Profile</Button>
            {/* <Button color="inherit" component={NavLink} to="/messanges">Messanges</Button> */}
            <Button color="inherit" component={NavLink} to='#' onClick={handleLogout}>Logout</Button>
        </>
    );
}

export default LoggedInHeader