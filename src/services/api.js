import axios from 'axios'

const http = axios.create(
    {
        baseURL: 'https://kml.onrender.com/'
    }
);

export const api = {
    login: async (email) => {
        let url = `auth?email=${email}`
        let response = await http.get(url, {timeout: 120000, followRedirects: true});
        let authorizationURL = response.data.authorization_url;
        return authorizationURL;
    },
    create: async () => {
        let response = await http.get('create/');
        return response.data;
    },
    send: async (dre) => {
        let url = `send/${dre}/`;
        let response = await http.get(url);
        return response.data;
    },
    delete: async (dre) => {
        let url = `delete/${dre}/`;
        let response = await http.get(url);
        return response.data;
    }
}