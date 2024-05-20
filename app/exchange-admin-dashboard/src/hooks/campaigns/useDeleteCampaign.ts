import { useMutation, useQueryClient } from "@tanstack/react-query";
import { attemptDeleteCampaign } from '../../api/CampaignApi';
import { enqueueSnackbar, closeSnackbar, SnackbarKey } from 'notistack';
import { NOTIFICATIONS, NOTIFICATION_MESSAGES, CONST_UNAUTHORIZED } from "../../configs/constants";
import { useState } from "react";

interface IDeleteCampaign {
  id: string,
}

export const deleteCampaign = (campaign_id: string) =>{
    return attemptDeleteCampaign(campaign_id).then((res) => res.data);
}

export const useDeleteCampaign = (campaign_id: string) => {

  const [notificationId, setNotificationId] = useState<SnackbarKey>('');

    const queryClient = useQueryClient();

    return useMutation<IDeleteCampaign, Error, any>({
        mutationFn: (campaign_id) => {
          closeSnackbar();
          setNotificationId(enqueueSnackbar(NOTIFICATION_MESSAGES.DELETING_CAMPAIGN_MSG, {
            variant: NOTIFICATIONS.INFO,
            preventDuplicate: true,
            autoHideDuration: null
          }));
            return deleteCampaign(campaign_id);
        },
        onSuccess: async () => {
          closeSnackbar(notificationId);
          enqueueSnackbar(NOTIFICATION_MESSAGES.CAMPAIGN_DELETED_SUCCESS_MSG, {
            variant: NOTIFICATIONS.SUCCESS,
            preventDuplicate: true,
            autoHideDuration: 3000
          });
          queryClient.refetchQueries({ queryKey: ['campaigns', {
            page : 0, page_size : 25, sort : [], filters : []
          }] });
          queryClient.removeQueries({ queryKey: ['campaign', campaign_id]})
        },
        onError: (error) => {
          closeSnackbar(notificationId);
          enqueueSnackbar(error?.length > 0 && error[0] === CONST_UNAUTHORIZED ? NOTIFICATION_MESSAGES.NOT_AUTHORIZED_MSG : NOTIFICATION_MESSAGES.FAILED_TO_DELETE_CAMPAIGN_MSG, {
            variant: NOTIFICATIONS.SUCCESS,
            preventDuplicate: true,
            autoHideDuration: 3000
          });
        },
      }
      )
}
