import { User } from "../service/api/User";
import { CookiesService } from "../service/cookies/Cookies";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import useUser from "./useUser";
function useLoggedIn() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        if (CookiesService.cookiesExist() && CookiesService.getExpiration() > (Date.now() + 50)) {
            setIsLoggedIn(true);
        } else {
            User.updateToken()
                .then((response) => {
                    if (!response.ok) {
                        setIsLoggedIn(false);
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then((data) => {
                    if (data.access === undefined || data.refresh === undefined || data.roles === undefined || data.expiration === undefined) {
                        CookiesService.clearCookies();
                        setIsLoggedIn(false);
                        throw new Error('Invalid response from server');
                    }
                    CookiesService.setCookies(data.access, data.refresh, data.roles, data.expiration);
                    setIsLoggedIn(true);
                })
                .catch((error) => {
                    setIsLoggedIn(false);
                    console.log('Update token failed: in useLoggedIn', error);
                    CookiesService.clearCookies();
                    navigate('/login');
                })
        }
    }, [navigate]);//TODO: need navigate?
    return isLoggedIn;
}

export default useLoggedIn;