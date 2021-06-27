const url = 'https://api.discogs.com';
const key = 'FrmgUyULSabISKNDhrbg';
const secret = 'YHQIWGksChjrJIYnsOifyoNpxrBwMkPK';


export const client = ({endpoint = "",query = '', options = {} }) => {
    return fetch(`${url}/${endpoint}/${query}&key=${key}&secret=${secret}`, options)
        .then((res) => {
            if (res.ok) return res.json();
            if (!res.ok) return Promise.reject(`Http error: ${res.status}`);
        })
        .catch((error) => {
            return Promise.reject(`Network error: ${error}`);
        });
};