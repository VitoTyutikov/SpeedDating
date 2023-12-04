import { Event } from "../service/api/Events";
import { useEffect, useState } from "react";
import useLoggedIn from "./useLoggedIn";
import { useNavigate } from "react-router-dom";
import apiRequest from "../service/api/ApiRequest";
function useEvents() {
    const [events, setEvents] = useState([]);
    const isLoggedIn = useLoggedIn();
    const navigate = useNavigate();


    useEffect(() => {
        if (isLoggedIn) {
            apiRequest(Event.getAllEvents)
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
                    navigate('/login');
                })
        }

    }, [isLoggedIn]);


    return events;

}

export default useEvents;