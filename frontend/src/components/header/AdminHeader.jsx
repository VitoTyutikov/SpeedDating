import css from './Header.module.css';
import { NavLink } from 'react-router-dom';
import { User } from '../../service/api/User';
const AdminHeader = () => {
    const handleLogout = () => {
        User.logout();
    };
    return <>
        <NavLink to='/users' className={css.NavLink}>Users</NavLink>
        <NavLink to='/events' className={css.NavLink}>Events</NavLink>
        <NavLink to='/messanges' className={css.NavLink}>Messanges</NavLink>
        <NavLink to='/profile' className={css.NavLink}>Profile</NavLink>
        <NavLink to='#' className={css.NavLink} onClick={handleLogout}>Logout</NavLink>
    </>
}

export default AdminHeader;