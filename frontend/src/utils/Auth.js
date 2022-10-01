const BASE_URL = 'http://localhost:3000';


export const register = (email, password) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "password": password,
            "email": email
        })
    })
}

export const login = (email, password) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json" 
        },
        body: JSON.stringify({
            "password": password,
            "email": email
        })
    })
}

export const tokenCheck = (token) => {
    return fetch(`${BASE_URL}/users/me`,{
        headers: {
            "Content-Type": "application/json",
            "Authorization": token
        }
    })
}