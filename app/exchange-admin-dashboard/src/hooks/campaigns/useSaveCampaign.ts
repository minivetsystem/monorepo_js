import { useMutation, useQueryClient } from "@tanstack/react-query";
import { attemptCreateCampaign, attemptUpdateCampaign } from '../../api/CampaignApi';
import { useSelector } from 'react-redux';
import { enqueueSnackbar, closeSnackbar, SnackbarKey } from 'notistack';
import { NOTIFICATIONS, NOTIFICATION_MESSAGES, CONST_UNAUTHORIZED } from "../../configs/constants";
import { useState } from "react";

export const createCampaign = (params: any) =>{
    return attemptCreateCampaign(params).then((res) => res.data);
}

export const updateCampaign = (params: any) =>{
    return attemptUpdateCampaign(params).then((res) => res.data);
}

export const useSaveCampaign = () => {

  const [notificationId, setNotificationId] = useState<SnackbarKey>('');

    const queryClient = useQueryClient();
    const userState = useSelector((state: any) => state.user);
  return useMutation({
    mutationFn: (values: any) => {
      closeSnackbar();
      setNotificationId(enqueueSnackbar(NOTIFICATION_MESSAGES.SAVING_CAMPAIGN_DETAILS_MSG, {
        variant: NOTIFICATIONS.INFO,
        preventDuplicate: true,
        autoHideDuration: null
      }));
        if(values._id) {
            return updateCampaign({
              ...values,
              updated_by: userState.user._id
            });
        } else {
            return createCampaign({
              ...values,
              added_by: userState.user._id
            });
        }
    },
      onError: (error) => {
        closeSnackbar(notificationId);
        enqueueSnackbar(error?.length > 0 && error[0] === CONST_UNAUTHORIZED ? NOTIFICATION_MESSAGES.NOT_AUTHORIZED_MSG : NOTIFICATION_MESSAGES.FAILED_TO_SAVE_CAMPAIGN_MSG, {
          variant: NOTIFICATIONS.ERROR,
          preventDuplicate: true,
          autoHideDuration: 3000
        });
      },
      onSuccess: async (values) => {
        await queryClient.refetchQueries({ queryKey: ['campaign', values._id]})
        closeSnackbar(notificationId);
        enqueueSnackbar(NOTIFICATION_MESSAGES.CAMPAIGN_DETAILS_SAVED_SUCCESS_MSG, {
          variant: NOTIFICATIONS.SUCCESS,
          preventDuplicate: true,
          autoHideDuration: 3000
        });
      },
  }
  )
}
