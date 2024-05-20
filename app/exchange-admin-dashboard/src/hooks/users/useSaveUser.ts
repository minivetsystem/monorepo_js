import { useMutation, useQueryClient } from "@tanstack/react-query";
import { attemptCreateUser, attemptUpdateUser } from '../../api/UserApi';
import { useSelector } from 'react-redux';
import { enqueueSnackbar, closeSnackbar, SnackbarKey } from 'notistack';
import { NOTIFICATIONS, NOTIFICATION_MESSAGES, CONST_UNAUTHORIZED } from "../../configs/constants";
import { useState } from "react";

export const createUser = (params: any) =>{
    return attemptCreateUser(params).then((res) => res.data);
}

export const updateUser = (params: any) =>{
    return attemptUpdateUser(params).then((res) => res.data);
}

export const useSaveUser = () => {
  const [notificationId, setNotificationId] = useState<SnackbarKey>('');

    const queryClient = useQueryClient();
    const userState = useSelector((state: any) => state.user);
  return useMutation({
    mutationFn: (values: any) => {
      closeSnackbar();
      setNotificationId(enqueueSnackbar(NOTIFICATION_MESSAGES.SAVING_USER_DETAILS_MSG, {
        variant: NOTIFICATIONS.INFO,
        preventDuplicate: true,
        autoHideDuration: null
      }));
        if(values._id) {
            return updateUser({
              ...values,
              updated_by: userState.user._id
            });
        } else {
            return createUser({
              ...values,
              added_by: userState.user._id
            });
        }
    },
      onError: (error) => {
        closeSnackbar(notificationId);
        enqueueSnackbar(error?.length > 0 && error[0] === CONST_UNAUTHORIZED ? NOTIFICATION_MESSAGES.NOT_AUTHORIZED_MSG : NOTIFICATION_MESSAGES.FAILED_TO_SAVE_USER_MSG, {
          variant: NOTIFICATIONS.ERROR,
          preventDuplicate: true,
          autoHideDuration: 3000
        });
      },
      onSuccess: async (values) => {
        await queryClient.refetchQueries({ queryKey: ['user', values._id]})
        closeSnackbar(notificationId);
        enqueueSnackbar(NOTIFICATION_MESSAGES.USER_DETAILS_SAVED_SUCCESS_MSG, {
          variant: NOTIFICATIONS.SUCCESS,
          preventDuplicate: true,
          autoHideDuration: 3000
        });
      },
  }
  )
}
