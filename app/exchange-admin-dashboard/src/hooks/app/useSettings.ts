import { useQuery } from '@tanstack/react-query';
import { attemptGetAllSettings } from '../../api/SettingApi';
import { enqueueSnackbar, closeSnackbar, SnackbarKey } from 'notistack';
import { NOTIFICATIONS, NOTIFICATION_MESSAGES, CONST_UNAUTHORIZED } from '../../configs/constants';
import { useState } from 'react';

export const fetchAllSettings = () =>{
  return attemptGetAllSettings().then((res) => res.data);
}

export const useSettings = () => {

  const [notificationId, setNotificationId] = useState<SnackbarKey>('');

  return useQuery<any, Error>({
    queryKey: ['settings'],
    queryFn: () => {
      setNotificationId(enqueueSnackbar(NOTIFICATION_MESSAGES.GETTING_SETTINGS_MSG, {
        variant: NOTIFICATIONS.INFO,
        preventDuplicate: true,
      }));
      return fetchAllSettings();
    },
    refetchOnWindowFocus: false,
    keepPreviousData : true,
    onError: (error) => {
      closeSnackbar(notificationId);
      enqueueSnackbar(error?.length > 0 && error[0] === CONST_UNAUTHORIZED ? NOTIFICATION_MESSAGES.NOT_AUTHORIZED_MSG : NOTIFICATION_MESSAGES.FAILED_TO_FETCH_ALL_SETTINGS_MSG, {
        variant: NOTIFICATIONS.ERROR,
        preventDuplicate: true,
        autoHideDuration: 3000
      });
    },
    onSuccess: async (data) => {
      closeSnackbar(notificationId);
    },
    staleTime: Infinity
  });
}