import instance from './BaseApi';

export function attemptDeleteCampaign(campaign_id: string) {
    const url = `/campaigns/${campaign_id}`;
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

export function attemptCreateCampaign(data: any) {
    const url = `/campaigns`;
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

export function attemptUpdateCampaign(data: any) {
    const url = `/campaigns/${data._id}`;
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

export function attemptGetCampaign(campaign_id: string) {
    const url = `/campaigns/${campaign_id}`;
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

export function attemptGetCampaigns(data: any) {
    const url = `/campaigns/fetch-campaigns`;
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



