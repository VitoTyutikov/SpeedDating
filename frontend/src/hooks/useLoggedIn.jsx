import { User } from "../service/api/User";
import { CookiesService } from "../service/cookies/Cookies";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import apiRequest from "../service/api/ApiRequest";
// import useUser from "./useUser";
function useLoggedIn() {
    const [isLoggedIn, setIsLoggedIn] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        const checkLoginStatus = async () => {
            if (CookiesService.cookiesExist() && CookiesService.getExpiration() > (Date.now() + 50)) {
                setIsLoggedIn(CookiesService.getRoles());
            } else if (CookiesService.getRefreshToken()) {
                try {
                    await apiRequest(User.updateToken);
                    setIsLoggedIn(CookiesService.getRoles());
                } catch (error) {
                    console.error('Update token failed: in useLoggedIn', error);
                    setIsLoggedIn(null);
                    CookiesService.clearCookies();
                    navigate('/login');
                }
            } else {
                setIsLoggedIn(null);
                navigate('/login');
            }
        };

        checkLoginStatus();
    }, [navigate]);
    // console.log(isLoggedIn);
    return isLoggedIn;
}

export default useLoggedIn;