import { useMutation } from "@tanstack/react-query";
import { attemptEditEducationCampaigns } from '../../api/EducationCampaignsApi';
import { NOTIFICATIONS, NOTIFICATION_MESSAGES, CONST_UNAUTHORIZED } from "../../configs/constants";
import { useState } from "react";
import { enqueueSnackbar, closeSnackbar, SnackbarKey } from 'notistack';

interface EditRequest {
  campaign_id: string;
  name: string;
  active: boolean;
  start_date: string;
  commission_percentage: number;
  buyers: string[];
  vendor: string;
  
}

export const EditEducationCampaign = (data: EditRequest) =>{
    return attemptEditEducationCampaigns(data).then((res) => res.data);
}

export const useEditEducationCampaign = () => {

  const [notificationId, setNotificationId] = useState<SnackbarKey>('');

    return useMutation<Error, any>({
        mutationFn: (data) => {
          closeSnackbar();
          setNotificationId(enqueueSnackbar(NOTIFICATION_MESSAGES.PROCESSING_RETURNS_FILE, {
            variant: NOTIFICATIONS.INFO,
            preventDuplicate: true,
            autoHideDuration: null
          }));
            return EditEducationCampaign(data);
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