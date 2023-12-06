// import { useEffect, useState } from 'react';
import useLoggedIn from '../../hooks/useLoggedIn';
import css from './Header.module.css';
import LoggedInHeader from './LoggedInHeader';
import LoggedOutHeader from './LoggedOutHeader';
import AdminHeader from './AdminHeader';
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
        <nav className={css.header}>
            {headerComponent}
        </nav>
    );
}


export default Header;