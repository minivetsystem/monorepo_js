import instance from './BaseApi';

export function attemptDeleteUser(user_id: string) {
    const url = `/users/${user_id}`;
    return instance.request({
        url,
        method: 'DELETE',
        withCredentials: false,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    });
}

export function attemptCreateUser(data: any) {
    const url = `/users`;
    return instance.request({
        url,
        method: 'POST',
        withCredentials: false,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        data
    });
}

export function attemptUpdateUser(data: any) {
    const url = `/users/${data._id}`;
    return instance.request({
        url,
        method: 'PATCH',
        withCredentials: false,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        data
    });
}

export function attemptGetUser(user_id: string) {
    const url = `/users/${user_id}`;
    return instance.request({
        url,
        method: 'GET',
        withCredentials: false,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    });
}

export function attemptGetUsers(data: any) {
    const url = `/users/fetch-users`;
    return instance.request({
        url,
        method: 'POST',
        withCredentials: false,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        data
    });
}

export function attemptGetUsersByRole(params: any) {
    const url = `/users/fetch-users-by-role?role_name=${params.roleName}&include_disabled=${params.includeDisabled}`;
    return instance.request({
        url,
        method: 'GET',
        withCredentials: false,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
    });
}

export function attemptGetUserDevVortexes(params: any) {
    const url = `/users/${params.user_id}/dev-vortex`;
    return instance.request({
        url,
        method: 'GET',
        withCredentials: false,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }
    });
}