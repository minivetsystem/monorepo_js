import { useQuery } from '@tanstack/react-query';
import { attemptGetEducationSearchReports } from '../../api/EducationReportsApi';
import { enqueueSnackbar, closeSnackbar, SnackbarKey } from 'notistack';
import { NOTIFICATIONS, NOTIFICATION_MESSAGES, CONST_UNAUTHORIZED } from '../../configs/constants';
import { useState } from 'react';

export const fetchEducationReports = (params: any) => {
    return attemptGetEducationSearchReports (params).then((res) => {
      return res.data
    });
  }

  export const useEducationSearchReports = (params: any) => {

    const [notificationId, setNotificationId] = useState<SnackbarKey>('');

    return useQuery<any, Error>({
      queryKey: ['education-report', { params }],
      retry: false,
      queryFn: () => {
        closeSnackbar();
        setNotificationId(enqueueSnackbar(NOTIFICATION_MESSAGES.GETTING_EDUCATION_REPORTS_MSG, {
          variant: NOTIFICATIONS.INFO,
          preventDuplicate: true,
          autoHideDuration: null
        }));
        return fetchEducationReports(params);
      },
      refetchOnWindowFocus: false,
      keepPreviousData : true,
      onError: (error) => {
        closeSnackbar(notificationId);
        enqueueSnackbar(error?.length > 0 && error[0] === CONST_UNAUTHORIZED ? NOTIFICATION_MESSAGES.NOT_AUTHORIZED_MSG : NOTIFICATION_MESSAGES.FAILED_EDUCATION_REPORTS_MSG, {
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