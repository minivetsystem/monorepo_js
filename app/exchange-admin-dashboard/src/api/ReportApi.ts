import instance from './BaseApi';

export function attemptGetKPISummaryForUser(user_id: string) {
    return instance.request({
        url: `/autoinsurance-reports/dashboard/kpi-summary?user_id=${user_id}`,
        method: 'GET',
        withCredentials: false,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    });
}

export function attemptGetRequestsByRejectionReason(params: any) {
    return instance.request({
        url: `/autoinsurance-reports/requests?page_size=${params.pageSize}&page_offset=${params.pageOffset}&from_date=${params.fromDate}&to_date=${params.toDate}&reason=${params.reason}&vendor_id=${params.vendorId}`,
        method: 'GET',
        withCredentials: false,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
    });
}

export function attemptGetInboundSubReport(params: any) {
    const url = `/autoinsurance-reports/inbound-sub-report?page_size=${params.pageSize}&page_offset=${params.pageOffset}&from_date=${params.fromDate}&to_date=${params.toDate}&vendor_id=${params.vendorId}`;
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

export function attemptGetInboundReport(data: any) {
    const url = `/autoinsurance-reports/inbound?page_size=${data.pageSize}&page_offset=${data.pageOffset}&request_type=${data.requestType}&lead_type_id=${data.leadTypeId}&lead_mode=${data.leadMode}&vendor_id=${data.vendorId}&start_date=${data.startDate}&end_date=${data.endDate}`;
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

export function attemptGetCommissionsReport(data: any) {
    const url = `/autoinsurance-reports/commissions`;
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

export function attemptGetOutboundPingPostReport(data: any) {
    const url = `/autoinsurance-reports/outbound-ping-post?request_type=${data.requestType}&lead_type=${data.leadType}&lead_mode=${data.leadMode}&vendor_id=${data.vendorId}&start_date=${data.startDate}&end_date=${data.endDate}`;
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

export function attemptGetOutboundClientPingPostReport(data: any) {
    const url = `/autoinsurance-reports/outbound-client-ping-post?request_type=${data.requestType}&lead_type_id=${data.leadTypeId}&lead_mode=${data.leadMode}&vendor_id=${data.vendorId}&start_date=${data.startDate}&end_date=${data.endDate}`;
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

export function attemptGetRevenueMatrixReport(data: any) {
  return instance.request({
      url: `/autoinsurance-reports/revenue-matrix?lead_type=${data?.filters[0]?.value}&start_date=${data?.filters[1]?.value?.start_date}&end_date=${data?.filters[1]?.value?.end_date}`,
      method: 'GET',
      withCredentials: false,
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
      }
  });
}

export function attemptGetReturnsSuiteReport(data: any) {
  return instance.request({
      url: `/autoinsurance-reports/returns-suite?start_date=${data?.filters[4]?.value}&end_date=${data?.filters[5]?.value}&lead_type_id=${data?.filters[0]?.value}&clint_id=${data?.filters[1]?.value}`,
      method: 'GET',
      withCredentials: false,
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
      }
  });
}
