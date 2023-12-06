import { useEffect, useState } from "react";
import { User } from "../service/api/User";
import { CookiesService } from "../service/cookies/Cookies";
import { useNavigate } from "react-router-dom";
import useLoggedIn from "./useLoggedIn";
import apiRequest from "../service/api/ApiRequest";

function useUser() {
    const [user, setUser] = useState(null);
    const isLoggedIn = useLoggedIn();
    const navigate = useNavigate();
    useEffect(() => {
        if (isLoggedIn) {
            apiRequest(User.profileData)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then((data) => {
                    setUser(data);
                    CookiesService.setUserId(data.id);
                })
                .catch((error) => {
                    navigate('/login');
                })
        }
        // eslint-disable-next-line
    }, [isLoggedIn]);

    return user;
}



export default useUser;




