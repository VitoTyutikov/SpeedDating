import css from './Header.module.css';
import { NavLink } from 'react-router-dom';
import { CookiesService } from '../../service/cookies/Cookies';

const LoggedInHeader = () => {
    const handleLogout = () => {
        CookiesService.clearCookies();
        window.location.replace('/login');
    };
    return <>
        <NavLink to='/events' className={css.NavLink}>Events</NavLink>
        <NavLink to='/messanges' className={css.NavLink}>Messanges</NavLink>
        <NavLink to='/profile' className={css.NavLink}>Profile</NavLink>
        <NavLink to='#' className={css.NavLink} onClick={handleLogout}>Logout</NavLink>
    </>
}

export default LoggedInHeader