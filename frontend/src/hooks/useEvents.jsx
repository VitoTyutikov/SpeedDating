import { Event } from "../service/api/Events";
import { useEffect, useState } from "react";
import useLoggedIn from "./useLoggedIn";
import { useNavigate } from "react-router-dom";
function useEvents() {
    const [events, setEvents] = useState([]);
    const isLoggedIn = useLoggedIn();
    const navigate = useNavigate();
    useEffect(() => {
        if (isLoggedIn) {
            Event.getAllEvents()
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    setEvents(data);
                })
                .catch(error => {
                    console.log(error);
                    navigate('/login');
                })
        }

    }, [isLoggedIn]);
    // console.log(events);
    return events;

}

export default useEvents;

// const [events, setEvents] = useState([]);
//     const isLoggedIn = useLoggedIn();
//     const navigate = useNavigate();
//     useEffect(() => {
//         if (!isLoggedIn) {
//             return;
//         }
//         Event.getAllEvents()
//             .then((response) => {
//                 if (!response.ok) {
//                     // Handle HTTP error response
//                     throw new Error('Network response was not ok');
//                 }
//                 return response.json();
//             })
//             .then(data => {
//                 setEvents(data);
//             })
//             .catch(err => {
//                 console.log(err);
//                 navigate('/login');
//             })
//     }, [isLoggedIn]);