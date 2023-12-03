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
}


function profileData() {
    return fetch('http://localhost:8080/user', {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ` + CookiesService.getAccessToken(),
        }
    })
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

function updateUser(user) {
    return fetch('http://localhost:8080/user/update', {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ` + CookiesService.getAccessToken(),
        },
        body: JSON.stringify(user),
    })
}

function logout() {
    return fetch('http://localhost:8080/logout', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
       
    })
        .then((response) => {
            fetch ('http://localhost:8080/afterLogout', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ refreshToken: CookiesService.getRefreshToken() }),
            })
            .then((response) => {
                CookiesService.clearCookies();
                window.location.href = '/login';
            })

           
            // window.location.href = '/login';
        })
}

function getAllUsers() {
    return fetch('http://localhost:8080/user/all', {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ` + CookiesService.getAccessToken(),
        }
    })
}

function deleteUser(id) {
    
    return fetch('http://localhost:8080/user/delete/' + id, {
        method: 'DELETE',
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
    getUserById,
    updateUser,
    logout,
    getAllUsers,
    deleteUser
}