import { User } from './User';
import { CookiesService } from '../cookies/Cookies';
const apiRequest = (requestFunc, ...params) => {
    if (CookiesService.getExpiration() < Date.now() + 40) {
        return User.updateToken()
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                CookiesService.setCookies(data.access, data.refresh, data.roles, data.expiration);
                return requestFunc(...params);
            })
            .catch((error) => {
                console.error('Error refreshing token:', error);
                throw error;
            });
    } else {
        return requestFunc(...params);
    }
};

export default apiRequest;
