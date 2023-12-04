import { CookiesService } from "../cookies/Cookies";
import { API_BASE_URL } from "./apiConst"
function login(username, password) {
    return fetch(`${API_BASE_URL}/authenticate`, {
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
    return fetch(`${API_BASE_URL}/user/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    })
}


function updateToken() {
    return fetch(`${API_BASE_URL}/refresh`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ` + CookiesService.getRefreshToken(),
        },
        body: JSON.stringify({ refreshToken: CookiesService.getRefreshToken(), userId: CookiesService.getUserId() }),

    })
}


function profileData() {
    return fetch(`${API_BASE_URL}/user`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ` + CookiesService.getAccessToken(),
        }
    })
}


function getUserById(id) {
    return fetch(`${API_BASE_URL}/user/` + id, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ` + CookiesService.getAccessToken(),
        }
    })
}

function updateUser(user) {
    return fetch(`${API_BASE_URL}/user/update`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ` + CookiesService.getAccessToken(),
        },
        body: JSON.stringify(user),
    })
}

function logout() {
    return fetch(`${API_BASE_URL}/logout`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },

    })
        .then((response) => {
            fetch(`${API_BASE_URL}/afterLogout`, {
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
    return fetch(`${API_BASE_URL}/user/all`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ` + CookiesService.getAccessToken(),
        }
    })
}

function deleteUser(id) {
    return fetch(`${API_BASE_URL}/user/delete/` + id, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ` + CookiesService.getAccessToken(),
        }
    })
}

function updateNonLocked(userId, nonLocked){
    return fetch(`${API_BASE_URL}/user/updateNonLocked`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ` + CookiesService.getAccessToken(),
        },
        body: JSON.stringify({userId, nonLocked}),
    })
}

function updateRole(userId, role){
    return fetch(`${API_BASE_URL}/user/updateRole`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ` + CookiesService.getAccessToken(),
        },
        body: JSON.stringify({userId, role}),
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
    deleteUser,
    updateNonLocked,
    updateRole
}