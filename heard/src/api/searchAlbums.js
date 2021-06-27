import {client} from './apiConfig';

export const searchAlbums = (query) =>
    client({
        endpoint: 'database',
        query: `search?q=${query}&type=release`
    }).then((res) => {
        return res.results;
    });