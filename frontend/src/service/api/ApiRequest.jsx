import { User } from './User';
import { CookiesService } from '../cookies/Cookies';

const apiRequest = (requestFunc, ...params) => {
    if (CookiesService.getExpiration() < Date.now() + 40) {
        User.updateToken().then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
            .then((data) => {
                if (data.access && data.refresh && data.roles && data.expiration) {
                    CookiesService.setCookies(data.access, data.refresh, data.roles, data.expiration);
                } else {
                    throw new Error('Token refresh failed');
                }
            })
            .catch((error) => {
                console.error('Error refreshing token:', error);
                // Handle token refresh error, maybe redirect to login
                return;
            });

    }


    return requestFunc(...params);
};

export default apiRequest;