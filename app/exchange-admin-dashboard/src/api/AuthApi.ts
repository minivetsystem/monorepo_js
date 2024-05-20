import instance from './BaseApi';

export function attemptSignIn(data: any) {
    return instance.request({
        url: `/auth/login`,
        method: 'POST',
        withCredentials: false,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        data: data,
    });
}