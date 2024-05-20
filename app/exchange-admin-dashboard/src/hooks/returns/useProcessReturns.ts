import { useMutation } from "@tanstack/react-query";
import { attemptProcessReturnsFile } from '../../api/ClientReturnsApi';
import { NOTIFICATIONS, NOTIFICATION_MESSAGES, CONST_UNAUTHORIZED } from "../../configs/constants";
import { useState } from "react";
import { enqueueSnackbar, closeSnackbar, SnackbarKey } from 'notistack';

interface IProcessReturns {
  from_date: Date,
  to_date: Date,
  campaign_id: string,
  lead_type_id: string,
  returnsData: any[]
}

export const processReturns = (data: any) =>{
    return attemptProcessReturnsFile(data).then((res) => res.data);
}

export const useProcessReturns = () => {

  const [notificationId, setNotificationId] = useState<SnackbarKey>('');

    return useMutation<IProcessReturns, Error, any>({
        mutationFn: (data) => {
          closeSnackbar();
          setNotificationId(enqueueSnackbar(NOTIFICATION_MESSAGES.PROCESSING_RETURNS_FILE, {
            variant: NOTIFICATIONS.INFO,
            preventDuplicate: true,
            autoHideDuration: null
          }));
            return processReturns(data);
        },
        onSuccess: async () => {
          closeSnackbar(notificationId);
          enqueueSnackbar(NOTIFICATION_MESSAGES.PROCESSING_RETURNS_FILE, {
            variant: NOTIFICATIONS.SUCCESS,
            preventDuplicate: true,
            autoHideDuration: 3000
          });
        },
        onError: (error) => {
          closeSnackbar(notificationId);
          enqueueSnackbar(error?.length > 0 && error[0] === CONST_UNAUTHORIZED ? NOTIFICATION_MESSAGES.NOT_AUTHORIZED_MSG : NOTIFICATION_MESSAGES.FAILED_TO_PROCESS_RETURNS_FILE_MSG, {
            variant: NOTIFICATIONS.ERROR,
            preventDuplicate: true,
            autoHideDuration: 3000
          });
        },
      }
      )
}