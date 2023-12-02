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




// useEffect(() => {
//     function fetchData() {
//         if (CookiesService.cookiesExist() && CookiesService.getExpiration() > (Date.now() + 50)) {
//             User.profileData()
//                 .then((response) => response.json())
//                 .then((data) => {
//                     setUser(data);
//                 })
//         } else {

//             User.updateToken()
//                 .then((response) => {
//                     if (!response.ok) {
//                         // Handle HTTP error response
//                         throw new Error('Network response was not ok');
//                     }
//                     return response.json();
//                 })
//                 .then((data) => {
//                     console.log(data);
//                     if (data.access === undefined || data.refresh === undefined || data.roles === undefined || data.expiration === undefined) {
//                         CookiesService.clearCookies();
//                         throw new Error('Invalid response from server');
//                     }
//                     CookiesService.setCookies(data.access, data.refresh, data.roles, data.expiration);
//                 })
//                 .then(() => {
//                     User.profileData()
//                         .then((response) => response.json())
//                         .then((data) => {
//                             setUser(data);
//                         })
//                         .catch((error) => {
//                             alert('Please login again');
//                             navigate("/login");
//                         })
//                 })
//                 .catch((error) => {
//                     alert('Please login again');
//                     navigate("/login");
//                 })

//         }
//     }
//     fetchData();
// }, [isLoggedIn]);