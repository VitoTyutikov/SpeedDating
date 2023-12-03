import { Cookies } from "react-cookie";

const cookies = new Cookies();

function removeAccessToken() {
    cookies.remove("access");
}

function removeRefreshToken() {
    cookies.remove("refresh");
}

function setAccessToken(access) {
    cookies.set("access", access);
}

function setRefreshToken(refresh) {
    cookies.set("refresh", refresh);
}

function setRoles(roles) {
    cookies.set("roles", roles);
}

function setExpiration(expiration) {
    cookies.set("expiration", expiration);
}

function getAccessToken() {
    return cookies.get("access");
}

function getRefreshToken() {
    return cookies.get("refresh");
}

function getRoles() {
    return cookies.get("roles");
}

function getExpiration() {
    return cookies.get("expiration");
}

function clearCookies() {
    cookies.remove("access");
    cookies.remove("refresh");
    cookies.remove("roles");
    cookies.remove("expiration");
    cookies.remove("userId");
}

function removeTokens() {
    removeAccessToken();
    removeRefreshToken();
}

function setTokens(accessToken, refreshToken) {
    setAccessToken(accessToken);
    setRefreshToken(refreshToken);
}

function setCookies(accessToken, refreshToken, roles, expiration) {
    setAccessToken(accessToken);
    setRefreshToken(refreshToken);
    setRoles(roles);
    setExpiration(expiration);
}

function cookiesExist() {
    return cookies.get("access") && cookies.get("refresh") && cookies.get("roles");
}

function setUserId(id) {
    cookies.set("userId", id);
}

function getUserId() {
    return cookies.get("userId");
}

export const CookiesService = {
    removeAccessToken,
    removeRefreshToken,
    setAccessToken,
    setRefreshToken,
    setRoles,
    setExpiration,
    getAccessToken,
    getRefreshToken,
    getRoles,
    getExpiration,
    clearCookies,
    removeTokens,
    setTokens,
    setCookies,
    cookiesExist,
    setUserId,
    getUserId

}

