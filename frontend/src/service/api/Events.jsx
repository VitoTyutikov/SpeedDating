import { CookiesService } from "../cookies/Cookies"

function getAllEvents() {
    return fetch('http://localhost:8080/events', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ` + CookiesService.getAccessToken(),
            'Content-Type': 'application/json',
        },
    })
}

function getActiveEvents() {
    return fetch('http://localhost:8080/events/active', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ` + CookiesService.getAccessToken(),
            'Content-Type': 'application/json',
        },
    })
}

function getPastEvents() {
    return fetch('http://localhost:8080/events/past', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ` + CookiesService.getAccessToken(),
            'Content-Type': 'application/json',
        },
    })
}

function getUpcomingEvents() {
    return fetch('http://localhost:8080/events/upcoming', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ` + CookiesService.getAccessToken(),
            'Content-Type': 'application/json',
        },
    })
}

function addEvent(event) {
    return fetch('http://localhost:8080/events/add', {
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
    return fetch('http://localhost:8080/events/registerUserToEvent', {
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
    return fetch('http://localhost:8080/events/checkUserRegisteredToEvent', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ` + CookiesService.getAccessToken(),
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, eventId }),
    })
}

function getUsersRegisteredToEvent(eventId) {
    return fetch('http://localhost:8080/events/getUsersRegisteredToEvent/' + eventId, {
        method: 'GET',
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
    getUsersRegisteredToEvent
}