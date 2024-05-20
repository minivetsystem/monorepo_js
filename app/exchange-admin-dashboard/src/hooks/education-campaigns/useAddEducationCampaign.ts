import { useMutation } from "@tanstack/react-query";
import { attemptAddEducationCampaigns } from '../../api/EducationCampaignsApi';
import { NOTIFICATIONS, NOTIFICATION_MESSAGES, CONST_UNAUTHORIZED } from "../../configs/constants";
import { useState } from "react";
import { enqueueSnackbar, closeSnackbar, SnackbarKey } from 'notistack';

interface AddRequest {
  name: string;
  active: boolean;
  start_date: string;
  commission_percentage: number;
  buyers: string[];
  vendor: string;
  
}

export const AddEducationCampaign = (data: AddRequest) =>{
    return attemptAddEducationCampaigns(data).then((res) => res.data);
}

export const useAddEducationCampaign = () => {

  const [notificationId, setNotificationId] = useState<SnackbarKey>('');

    return useMutation<Error, any>({
        mutationFn: (data) => {
          closeSnackbar();
          setNotificationId(enqueueSnackbar(NOTIFICATION_MESSAGES.PROCESSING_RETURNS_FILE, {
            variant: NOTIFICATIONS.INFO,
            preventDuplicate: true,
            autoHideDuration: null
          }));
            return AddEducationCampaign(data);
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