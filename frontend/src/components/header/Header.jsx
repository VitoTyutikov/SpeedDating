import { useEffect, useState } from 'react';
import useLoggedIn from '../../hooks/useLoggedIn';
import css from './Header.module.css';
import LoggedInHeader from './LoggedInHeader';
import LoggedOutHeader from './LoggedOutHeader';
function Header() {
    const isLoggedIn = useLoggedIn();
    const [header, setHeader] = useState(null);

    useEffect(() => {
        if (isLoggedIn) {
            setHeader(<LoggedInHeader />);
        } else {
            setHeader(<LoggedOutHeader />);
        }
    }, [isLoggedIn])

    return (
        <nav className={css.header}>
            {header}
        </nav >
    );

}

export default Header;