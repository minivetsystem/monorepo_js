import { useQuery } from '@tanstack/react-query';
import { attemptGetEducationCampaigns } from '../../api/EducationCampaignsApi';
import { enqueueSnackbar, closeSnackbar, SnackbarKey } from 'notistack';
import { NOTIFICATIONS, NOTIFICATION_MESSAGES, CONST_UNAUTHORIZED } from '../../configs/constants';
import { useState } from 'react';

interface SearchRequest {
  start_date: string;
  end_date: string;
  limit: number;
  skip: number;
  campaign_id: string;
}

export const fetchEducationCampaignsReports = (params: SearchRequest ) => {
    return attemptGetEducationCampaigns (params).then((res) => {
      return res.data
    });
  }

  export const useEducationCampaignsReports = (params: any) => {

    const [notificationId, setNotificationId] = useState<SnackbarKey>('');

    return useQuery<any, Error>({
      queryKey: ['education-campaign', { params }],
      retry: false,
      queryFn: () => {
        closeSnackbar();
        setNotificationId(enqueueSnackbar(NOTIFICATION_MESSAGES.GETTING_EDUCATION_CAMPAIGNS_MSG, {
          variant: NOTIFICATIONS.INFO,
          preventDuplicate: true,
          autoHideDuration: null
        }));
        return fetchEducationCampaignsReports(params);
      },
      refetchOnWindowFocus: false,
      keepPreviousData : true,
      onError: (error) => {
        closeSnackbar(notificationId);
        enqueueSnackbar(error?.length > 0 && error[0] === CONST_UNAUTHORIZED ? NOTIFICATION_MESSAGES.NOT_AUTHORIZED_MSG : NOTIFICATION_MESSAGES.FAILED_EDUCATION_CAMPAIGNS_MSG, {
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