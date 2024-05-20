import { useQuery } from '@tanstack/react-query';
import { attemptGetReturnsSuiteReport } from '../../api/ReportApi';
import { enqueueSnackbar, closeSnackbar, SnackbarKey } from 'notistack';
import { NOTIFICATIONS, NOTIFICATION_MESSAGES, CONST_UNAUTHORIZED } from '../../configs/constants';
import { useState } from 'react';

export const fetchReturnsSuiteReport = (params: any) => {
  return attemptGetReturnsSuiteReport(params).then((res) => res.data);
}

export const useReturnsSuiteReport = (filters = []) => {

  const [notificationId, setNotificationId] = useState<SnackbarKey>('');

  return useQuery<any, Error>({
    queryKey: ['returns-suite', { filters }],
    queryFn: () => {
      closeSnackbar();
      setNotificationId(enqueueSnackbar(NOTIFICATION_MESSAGES.UPDATING_RETURNSUITE_REPORT_MSG, {
        variant: NOTIFICATIONS.INFO,
        preventDuplicate: true,
        autoHideDuration: null
      }));
      return fetchReturnsSuiteReport({
        filters
      });
    },
    refetchOnWindowFocus: false,
    keepPreviousData : true,
    onError: (error) => {
      closeSnackbar(notificationId);
      enqueueSnackbar(error?.length > 0 && error[0] === CONST_UNAUTHORIZED ? NOTIFICATION_MESSAGES.NOT_AUTHORIZED_MSG : NOTIFICATION_MESSAGES.FAILED_TO_FETCH_RETURNSUITE_REPORT_MSG, {
        variant: NOTIFICATIONS.ERROR,
        preventDuplicate: true,
        autoHideDuration: 3000
      });
    },
    onSuccess: async () => {
      closeSnackbar(notificationId);
    },
    enabled: filters.length > 0
  });
}
