import instance from './BaseApi';

interface SearchRequest {
  start_date: string;
  end_date: string;
  limit: number;
  skip: number;
}

interface ResultRequest {
  start_date: string;
  end_date: string;
  limit: number;
  skip: number;
  search_id: string;
}

export function attemptGetEducationSearchReports(data: SearchRequest) {
  let queryParams = '';

  if (data.start_date) {
    queryParams += `?start_date=${data.start_date}`;
    queryParams += `&end_date=${data.end_date}`;
  }

  if (!isNaN(data.limit) && !isNaN(data.skip)) {
    queryParams += queryParams
      ? `&limit=${data.limit}`
      : `?limit=${data.limit}`;
    queryParams += `&skip=${data.skip}`;
  }

  const url = `/education-reports/search-reports${queryParams}`;

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

export function attemptGetEducationResultReports(data: ResultRequest) {
  let queryParams = '';
  if (data.start_date) {
    queryParams += `?start_date=${data.start_date}`;
    queryParams += `&end_date=${data.end_date}`;
  }

  if (data.search_id) {
    queryParams += `&search_id=${data.search_id}`;
  }

  if (!isNaN(data.limit) && (data.search_id || data.start_date)) {
    queryParams += `&limit=${data.limit}`;
    queryParams += `&skip=${data.skip}`;
  }

  const url = `/education-reports/result-reports${queryParams}`;

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
