import { useQuery } from '@tanstack/react-query';
import { attemptGetProfileTabsForRole } from '../../api/AppApi';
import { enqueueSnackbar, closeSnackbar, SnackbarKey } from 'notistack';
import { NOTIFICATIONS, NOTIFICATION_MESSAGES, CONST_UNAUTHORIZED } from '../../configs/constants';
import { useState } from 'react';

export const fetchProfileTabsForRole = (role: string) =>{
  return attemptGetProfileTabsForRole(role).then((res) => res.data);
}

export const useProfileTabs = (role: string) => {

  const [notificationId, setNotificationId] = useState<SnackbarKey>('');

  return useQuery<any, Error>({
    queryKey: ['profile_tabs', role],
    queryFn: () => {
      setNotificationId(enqueueSnackbar(NOTIFICATION_MESSAGES.GETTING_PROFILE_TABS_MSG, {
        variant: NOTIFICATIONS.INFO,
        preventDuplicate: true,
      }));
      return fetchProfileTabsForRole(role);
    },
    refetchOnWindowFocus: false,
    keepPreviousData : false,
    enabled: role?.length > 0,
    onError: (error) => {
      closeSnackbar(notificationId);
      enqueueSnackbar(error?.length > 0 && error[0] === CONST_UNAUTHORIZED ? NOTIFICATION_MESSAGES.NOT_AUTHORIZED_MSG : NOTIFICATION_MESSAGES.FAILED_TO_FETCH_ALL_USERS_MSG, {
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