import { CookiesService } from "../service/cookies/Cookies";
import { useState, useEffect } from "react";
function useLoggedIn() {
    const [isLoggedIn, setIsLoggedIn] = useState(null);

    useEffect(() => {
        const roles = CookiesService.getRoles();
        if (roles) {
            setIsLoggedIn(roles);
        } else {
            setIsLoggedIn(null);
        }
    }, []);

    return isLoggedIn;
}

export default useLoggedIn;