import instance from './BaseApi';

interface SearchRequest {
  start_date: string;
  end_date: string;
  limit: number;
  skip: number;
  campaign_id: string;
}

interface AddRequest {
  
  campaign_id: string;
  name: string;
  active: boolean;
  start_date: string;
  commission_percentage: number;
  buyers: string[];
  vendor: string;
  
}

export function attemptGetEducationCampaigns(data: SearchRequest) {
    let queryParams = '';
  
    if (data.start_date) {
      queryParams += `?start_date=${data.start_date}`;
      queryParams += `&end_date=${data.end_date}`;
    }
    if (data.campaign_id) {
      queryParams += `&campaign_id=${data.campaign_id}`;
    }
  
    if (!isNaN(data.limit) && !isNaN(data.skip)) {
      queryParams += queryParams
        ? `&limit=${data.limit}`
        : `?limit=${data.limit}`;
      queryParams += `&skip=${data.skip}`;
    }
    
  
    const url = `/education-campaigns${queryParams}`;
  
    return instance.request({
      url: url,
      method: 'GET',
      withCredentials: false,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
  }

  export function attemptAddEducationCampaigns(data: AddRequest) {
    const url = `/education-campaigns`;
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
export function attemptEditEducationCampaigns(data: any) {
  const url = `/education-campaigns`;
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