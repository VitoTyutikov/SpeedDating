import { API_BASE_URL } from "./apiConst"
import { CookiesService } from "../cookies/Cookies"

function uploadFile(formData) {
    return fetch('http://localhost:8080/upload', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + CookiesService.getAccessToken(),
            // 'Content-Type': 'multipart/form-data',
        },
        body: formData
    })
}

function getPhotoAfterUpload(url, userId) {
    return fetch(`${API_BASE_URL}/user/profile-picture/${userId}`, {
        method: 'PUT',
        headers: {
            'Authorization': 'Bearer ' + CookiesService.getAccessToken(),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(url)
    })
}



export const File = {
    uploadFile,
    getPhotoAfterUpload
}