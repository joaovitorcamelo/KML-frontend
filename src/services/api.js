import axios from 'axios'

const http = axios.create(
    {
        baseURL: 'https://kml.onrender.com/'
    }
);

export const api = {
    login: async (email) => {
        let url = `auth?email=${email}`
        let response = await http.get(url, {timeout: 120000});
        let authorizationURL = response.data.authorization_url;
        window.open(authorizationURL, '_blank');
    },
    create: async (email) => {
        let response = await http.get(`create?email=${email}`, {timeout: 3600000});
        return response.data;
    },
    send: async (dre, email) => {
        let url = `send/${dre}?email=${email}`;
        let response = await http.get(url, {timeout: 3600000});
        return response.data;
    },
    delete: async (dre, email) => {
        let url = `delete/${dre}?email=${email}`;
        let response = await http.get(url, {timeout: 3600000});
        return response.data;
    }
}