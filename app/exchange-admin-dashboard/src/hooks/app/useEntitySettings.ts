import { useQuery } from '@tanstack/react-query';
import { attemptGetEntitySettings } from '../../api/AppApi';
import { enqueueSnackbar, closeSnackbar, SnackbarKey } from 'notistack';
import { NOTIFICATIONS, NOTIFICATION_MESSAGES, CONST_UNAUTHORIZED } from '../../configs/constants';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

export const fetchEntitySettings = (entity_type: string) =>{
  return attemptGetEntitySettings(entity_type).then((res) => res.data);
}

export const useEntitySettings = (entity_type: string) => {
  const dispatch = useDispatch();
  const [notificationId, setNotificationId] = useState<SnackbarKey>('');

  return useQuery<any, Error>({
    queryKey: ['entity_settings', entity_type],
    queryFn: () => {
      setNotificationId(enqueueSnackbar(NOTIFICATION_MESSAGES.GETTING_ENTITY_SETTINGS_MSG, {
        variant: NOTIFICATIONS.INFO,
        preventDuplicate: true,
      }));
      return fetchEntitySettings(entity_type);
    },
    refetchOnWindowFocus: false,
    keepPreviousData : true,
    onError: (error) => {
      closeSnackbar(notificationId);
      enqueueSnackbar(error?.length > 0 && error[0] === CONST_UNAUTHORIZED ? NOTIFICATION_MESSAGES.NOT_AUTHORIZED_MSG : NOTIFICATION_MESSAGES.FAILED_TO_FETCH_ALL_USERS_MSG, {
        variant: NOTIFICATIONS.ERROR,
        preventDuplicate: true,
        autoHideDuration: 3000
      });
    },
    onSuccess: async (data) => {
      dispatch.app.setEntitySettings(data);
      closeSnackbar(notificationId);
    },
    staleTime: Infinity
  });
}