import instance from './BaseApi';

export function attemptGetAllLeadTypes() {
    return instance.request({
        url: `/app/lead-types`,
        method: 'GET',
        withCredentials: false,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    });
}

export function attemptGetAllRoles() {
    return instance.request({
        url: `/app/roles`,
        method: 'GET',
        withCredentials: false,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    });
}

export function attemptGetEntitySettings(entity_type: string) {
    return instance.request({
        url: `/app/entity-settings?${entity_type}`,
        method: 'GET',
        withCredentials: false,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    });
}

export function attemptGetProfileTabsForRole(role: string) {
    return instance.request({
        url: `/app/profile-tabs?role=${role}`,
        method: 'GET',
        withCredentials: false,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    });
}