import { useEffect, useState } from "react";
import { User } from "../service/api/User";
import { CookiesService } from "../service/cookies/Cookies";
import { useNavigate } from "react-router-dom";
import useLoggedIn from "./useLoggedIn";


function useUser() {
    const [user, setUser] = useState(null);
    const isLoggedIn = useLoggedIn();
    const navigate = useNavigate();
    useEffect(() => {
        if (isLoggedIn) {
            User.profileData()
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then((data) => {
                    setUser(data);
                })
                .catch((error) => {
                    navigate('/login');
                })
        }
    }, [isLoggedIn]);
    CookiesService.setUserId(user?.id);
    return user;
}



export default useUser;




