import instance from './BaseApi';

export function attemptGetAllSettings() {
    return instance.request({
        url: `/settings`,
        method: 'GET',
        withCredentials: false,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    });
}

