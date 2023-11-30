import { NavLink } from 'react-router-dom';
import css from './Header.module.css';

const LoggedOutHeader = () => {
    return <>
        <NavLink to='/events' className={css.NavLink}>Events</NavLink>
        <NavLink to='/login' className={css.NavLink}>Login</NavLink>
        <NavLink to='/register' className={css.NavLink}>Register</NavLink>
    </>
}

export default LoggedOutHeader;