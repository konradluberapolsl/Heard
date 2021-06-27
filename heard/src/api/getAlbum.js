import {client} from './apiConfig';

export const getAlbum = (query) =>
    client({
        endpoint: 'releases',
        query: `${query}?`
    }).then((res) => {
        return res;
    });