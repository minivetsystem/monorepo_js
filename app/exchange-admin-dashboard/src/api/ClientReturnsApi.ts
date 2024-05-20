import instance from './BaseApi';

export function attemptProcessReturnsFile(data: any) {
    const url = `/leads/process-returns`;
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

export function attemptSendReturnsEmail(data: any) {
    const url = `/leads/send-client-returns-email`;
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

export function attemptRegenerateSendReturnsFile(data: any) {
  const url = `/leads/regenerate-client-returns-email`;
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

