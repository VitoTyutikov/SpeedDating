import { CookiesService } from "../cookies/Cookies"
import { API_BASE_URL } from './apiConst';
function getAllEvents() {
    return fetch(`${API_BASE_URL}/events`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ` + CookiesService.getAccessToken(),
            'Content-Type': 'application/json',
        },
    })
}

function getActiveEvents() {
    return fetch(`${API_BASE_URL}/events/active`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ` + CookiesService.getAccessToken(),
            'Content-Type': 'application/json',
        },
    })
}

function getPastEvents() {
    return fetch(`${API_BASE_URL}/events/past`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ` + CookiesService.getAccessToken(),
            'Content-Type': 'application/json',
        },
    })
}

function getUpcomingEvents() {
    return fetch(`${API_BASE_URL}/events/upcoming`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ` + CookiesService.getAccessToken(),
            'Content-Type': 'application/json',
        },
    })
}

function addEvent(event) {
    return fetch(`${API_BASE_URL}/events/add`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ` + CookiesService.getAccessToken(),
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(event),
    })
}

function registerToEvent(eventId) {
    const userId = CookiesService.getUserId();
    return fetch(`${API_BASE_URL}/events/registerUserToEvent`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ` + CookiesService.getAccessToken(),
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, eventId }),
    })
}

function checkUserRegisteredToEvent(eventId) {
    const userId = CookiesService.getUserId();
    return fetch(`${API_BASE_URL}/events/checkUserRegisteredToEvent`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ` + CookiesService.getAccessToken(),
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, eventId }),
    })
}

function getUsersRegisteredToEvent(eventId) {
    return fetch(`${API_BASE_URL}/events/getUsersRegisteredToEvent/` + eventId, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ` + CookiesService.getAccessToken(),
            'Content-Type': 'application/json',
        },
    })
}

function deleteEvent(eventId) {
    return fetch(`${API_BASE_URL}/events/delete/` + eventId, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ` + CookiesService.getAccessToken(),
            'Content-Type': 'application/json',
        },
    })
}

export const Event = {
    getAllEvents,
    getActiveEvents,
    getPastEvents,
    getUpcomingEvents,
    addEvent,
    registerToEvent,
    checkUserRegisteredToEvent,
    getUsersRegisteredToEvent,
    deleteEvent
}