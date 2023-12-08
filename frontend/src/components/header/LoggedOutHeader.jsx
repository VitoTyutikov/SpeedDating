import { NavLink } from 'react-router-dom';
import Button from '@mui/material/Button';

const LoggedOutHeader = () => {
    return (
        <>
            <Button color="inherit" component={NavLink} to="/login">Login</Button>
            <Button color="inherit" component={NavLink} to="/register">Register</Button>
        </>
    );

}

export default LoggedOutHeader;