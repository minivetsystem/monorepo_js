import { useQuery } from '@tanstack/react-query';
import { attemptGetUsers } from '../../api/UserApi';
import { enqueueSnackbar, closeSnackbar, SnackbarKey } from 'notistack';
import { NOTIFICATIONS, NOTIFICATION_MESSAGES, CONST_UNAUTHORIZED } from '../../configs/constants';
import { useState } from 'react';

export const fetchVendorsForLeadType = (params: any) =>{
  return attemptGetUsers(params).then((res) => res.data);
}

export const useVendorsForLeadType = (page = 0, page_size = 100, sort = [{ field: 'username', sort: 'asc' }], filters = []) => {

  const [notificationId, setNotificationId] = useState<SnackbarKey>('');

  return useQuery<any, Error>({
    queryKey: ['vendors_for_lead_type', { page, page_size, sort, filters }],
    queryFn: () => {
      closeSnackbar();
      setNotificationId(enqueueSnackbar(NOTIFICATION_MESSAGES.GETTING_ALL_USERS_MSG, {
        variant: NOTIFICATIONS.INFO,
        preventDuplicate: true,
        autoHideDuration: null
      }));
      return fetchVendorsForLeadType({
        page_size,
        page_offset: page,
        sort,
        filters
      });
    },
    refetchOnWindowFocus: false,
    keepPreviousData : true,
    enabled: filters[0].value?.length > 0,
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