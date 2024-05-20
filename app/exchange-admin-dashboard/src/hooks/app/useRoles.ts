import { useQuery } from '@tanstack/react-query';
import { attemptGetAllRoles } from '../../api/AppApi';
import { enqueueSnackbar, closeSnackbar, SnackbarKey } from 'notistack';
import { NOTIFICATIONS, NOTIFICATION_MESSAGES, CONST_UNAUTHORIZED } from '../../configs/constants';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

export const fetchAllRoles = () =>{
  return attemptGetAllRoles().then((res) => res.data);
}

export const useRoles = () => {

  const [notificationId, setNotificationId] = useState<SnackbarKey>('');
  const dispatch = useDispatch();

  return useQuery<any, Error>({
    queryKey: ['roles'],
    queryFn: () => {
      setNotificationId(enqueueSnackbar(NOTIFICATION_MESSAGES.GETTING_ROLES_MSG, {
        variant: NOTIFICATIONS.INFO,
        preventDuplicate: true,
      }));
      return fetchAllRoles();
    },
    refetchOnWindowFocus: false,
    keepPreviousData : true,
    onError: (error) => {
      closeSnackbar(notificationId);
      enqueueSnackbar(error?.length > 0 && error[0] === CONST_UNAUTHORIZED ? NOTIFICATION_MESSAGES.NOT_AUTHORIZED_MSG : NOTIFICATION_MESSAGES.FAILED_TO_FETCH_ALL_ROLES_MSG, {
        variant: NOTIFICATIONS.ERROR,
        preventDuplicate: true,
        autoHideDuration: 3000
      });
    },
    onSuccess: async (data) => {
      dispatch.user.setUserRoles(data);
      closeSnackbar(notificationId);
    },
    staleTime: Infinity
  });
}