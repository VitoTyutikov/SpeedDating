import useLoggedIn from '../../hooks/useLoggedIn';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import LoggedInHeader from './LoggedInHeader';
import LoggedOutHeader from './LoggedOutHeader';
import AdminHeader from './AdminHeader';
import logo from '../../logo.png';

function Header() {
    const isLoggedIn = useLoggedIn();

    let headerComponent;
    if (isLoggedIn === '[ROLE_ADMIN]') {
        headerComponent = <AdminHeader />;
    } else if (isLoggedIn) {
        headerComponent = <LoggedInHeader />;
    } else {
        headerComponent = <LoggedOutHeader />;
    }

    return (
        <AppBar position="static">
            <Toolbar>
                <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
                    <img src={logo} alt="Logo" style={{ marginRight: '10px' , width: '50px', height: '50px' }} />
                    <Typography variant="h6">NeTinder</Typography>
                </Box>
                {headerComponent}
            </Toolbar>
        </AppBar>
    );
}

export default Header;
