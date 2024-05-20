import { useState } from 'react';
import { useQuery } from  "@tanstack/react-query"
import { attemptGetCampaign } from '../../api/CampaignApi';
import { enqueueSnackbar, closeSnackbar, SnackbarKey } from 'notistack';
import { NOTIFICATIONS, NOTIFICATION_MESSAGES, CONST_UNAUTHORIZED } from "../../configs/constants";

export const fetchCampaignById = (campaign_id: string) =>{
    return attemptGetCampaign(campaign_id).then((res) => res.data);
}

export const useCampaign = (campaign_id: string) => {

  const [notificationId, setNotificationId] = useState<SnackbarKey>('');

  return useQuery<any, Error>({
    queryKey: ['campaign', campaign_id],
    queryFn: () => {
      closeSnackbar();
      setNotificationId(enqueueSnackbar(NOTIFICATION_MESSAGES.GETTING_CAMPAIGN_DETAILS_MSG, {
        variant: NOTIFICATIONS.INFO,
        preventDuplicate: true,
        autoHideDuration: null
      }));
      return fetchCampaignById(campaign_id);
    },
    refetchOnWindowFocus: false,
    enabled: campaign_id?.length > 0,
    onError: (error) => {
      closeSnackbar(notificationId);
      enqueueSnackbar(error?.length > 0 && error[0] === CONST_UNAUTHORIZED ? NOTIFICATION_MESSAGES.NOT_AUTHORIZED_MSG : NOTIFICATION_MESSAGES.FAILED_TO_FETCH_ALL_CAMPAIGNS_MSG, {
        variant: NOTIFICATIONS.ERROR,
        preventDuplicate: true,
        autoHideDuration: 3000
      });
    },
    onSuccess: async (values) => {
      closeSnackbar(notificationId);
    },
  })
}