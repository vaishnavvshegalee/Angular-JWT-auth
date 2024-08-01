const apiUrl = 'http://localhost:8080/api/v1';

export const ApiEndpoint = {
    Auth: {
        Register: `${apiUrl}/users/register`,
        Login: `${apiUrl}/users/login`,
        Me: `${apiUrl}/users/me`
    }
}

export const LocalStorage = {
    token: 'USER_TOKEN'
}