import { Event } from "../service/api/Events";
import { useEffect, useState } from "react";
import useLoggedIn from "./useLoggedIn";
import { useNavigate } from "react-router-dom";
function useEvents() {
    const [events, setEvents] = useState([]);
    const isLoggedIn = useLoggedIn();
    const navigate = useNavigate();
    const addEvent = (newEvent) => {
        // console.log("Before adding new event:", events); // Debugging log
        setEvents(currentEvents => [...currentEvents, newEvent]);
        // console.log("After adding new event:", events); // Debugging log
    }


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
    return { events, addEvent };

}

export default useEvents;