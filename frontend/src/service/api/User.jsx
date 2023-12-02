import { CookiesService } from "../cookies/Cookies";

function login(username, password) {
    return fetch('http://localhost:8080/authenticate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    })
        .then(response => response.json())
        .then((data) => {
            if (data.access === undefined || data.refresh === undefined || data.roles === undefined) {
                throw new Error('Invalid response from server');
            }
            CookiesService.setCookies(data.access, data.refresh, data.roles, data.expiration);

        });
}

function signup(user) {
    return fetch('http://localhost:8080/user/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    })
}

function updateToken() {
    return fetch('http://localhost:8080/refresh', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ` + CookiesService.getRefreshToken(),
        },
        body: JSON.stringify({ refreshToken: CookiesService.getRefreshToken(), userId: CookiesService.getUserId() }),

    })
    // .then((response) => response.json())
    // .then((data) => {
    //     // console.log(response.json());
    //     // if (response.ok) {
    //     // const data = response.json();
    //     // console.log('Updated token:', data);
    //     if (data.access === undefined || data.refresh === undefined || data.roles === undefined || data.expiration === undefined) {
    //         CookiesService.clearCookies();
    //         throw new Error('Invalid response from server');
    //     }
    //     CookiesService.setCookies(data.access, data.refresh, data.roles, data.expiration);
    //     // }
    //     // return response.json();
    // })
    // .catch((error) => {
    //     console.error('Update token failed:', error);

    // });
}


function profileData() {
    return fetch('http://localhost:8080/user', {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ` + CookiesService.getAccessToken(),
        }
    })
    // .then((response) => {
    //     if (response.ok) {
    //         console.log(response);
    //         console.log(response.json());
    //         // return response.json();
    //     }
    //     else {
    //         updateToken();
    //     }
    // });
}


function getUserById(id) {
    return fetch('http://localhost:8080/user/' + id, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ` + CookiesService.getAccessToken(),
        }
    })
}

export const User = {
    login,
    signup,
    updateToken,
    profileData,
    getUserById
}