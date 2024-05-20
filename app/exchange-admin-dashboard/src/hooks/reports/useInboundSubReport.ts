import { useQuery } from '@tanstack/react-query';
import { attemptGetInboundSubReport } from '../../api/ReportApi';
import { enqueueSnackbar, closeSnackbar, SnackbarKey } from 'notistack';
import { NOTIFICATIONS, NOTIFICATION_MESSAGES, CONST_UNAUTHORIZED } from '../../configs/constants';
import { useState } from 'react';

export const fetchInboundSubReport = (params: any) =>{
  return attemptGetInboundSubReport(params).then((res) => res.data);
}

export const useInboundSubReport = (params: any) => {
  const [notificationId, setNotificationId] = useState<SnackbarKey>('');

  return useQuery<any, Error>({
    queryKey: ['inbound-sub-report', { params }],
    queryFn: () => {
      closeSnackbar();
      setNotificationId(enqueueSnackbar(NOTIFICATION_MESSAGES.GETTING_INBOUND_REPORT_MSG, {
        variant: NOTIFICATIONS.INFO,
        preventDuplicate: true,
        autoHideDuration: null
      }));
      return fetchInboundSubReport(params);
    },
    refetchOnWindowFocus: false,
    keepPreviousData : false,
    onError: (error) => {
      closeSnackbar(notificationId);
      enqueueSnackbar(error?.length > 0 && error[0] === CONST_UNAUTHORIZED ? NOTIFICATION_MESSAGES.NOT_AUTHORIZED_MSG : NOTIFICATION_MESSAGES.FAILED_TO_FETCH_INBOUND_REPORT_MSG, {
        variant: NOTIFICATIONS.ERROR,
        preventDuplicate: true,
        autoHideDuration: 3000
      });
    },
    onSuccess: async () => {
      closeSnackbar(notificationId);
    },
  });
}