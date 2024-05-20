import { useMutation, useQueryClient } from "@tanstack/react-query";
import { attemptDeleteUser } from '../../api/UserApi';
import { NOTIFICATIONS, NOTIFICATION_MESSAGES, CONST_UNAUTHORIZED } from "../../configs/constants";
import { useState } from "react";
import { enqueueSnackbar, closeSnackbar, SnackbarKey } from 'notistack';

interface IDeleteUser {
  id: string,
}

export const deleteUser = (user_id: string) =>{
    return attemptDeleteUser(user_id).then((res) => res.data);
}

export const useDeleteUser = (user_id: string) => {

  const [notificationId, setNotificationId] = useState<SnackbarKey>('');

    const queryClient = useQueryClient();
    return useMutation<IDeleteUser, Error, any>({
        mutationFn: (user_id) => {
          closeSnackbar();
          setNotificationId(enqueueSnackbar(NOTIFICATION_MESSAGES.DELETING_USER_MSG, {
            variant: NOTIFICATIONS.INFO,
            preventDuplicate: true,
            autoHideDuration: null
          }));
            return deleteUser(user_id);
        },
        onSuccess: async () => {
          closeSnackbar(notificationId);
          enqueueSnackbar(NOTIFICATION_MESSAGES.USER_DELETED_SUCCESS_MSG, {
            variant: NOTIFICATIONS.SUCCESS,
            preventDuplicate: true,
            autoHideDuration: 3000
          });
          queryClient.refetchQueries({ queryKey: ['users', {
            page : 0, page_size : 25, sort : [], filters : []
          }] });
          queryClient.removeQueries({ queryKey: ['user', user_id]})
        },
        onError: (error) => {
          closeSnackbar(notificationId);
          enqueueSnackbar(error?.length > 0 && error[0] === CONST_UNAUTHORIZED ? NOTIFICATION_MESSAGES.NOT_AUTHORIZED_MSG : NOTIFICATION_MESSAGES.FAILED_TO_DELETE_USER_MSG, {
            variant: NOTIFICATIONS.ERROR,
            preventDuplicate: true,
            autoHideDuration: 3000
          });
        },
      }
      )
}
