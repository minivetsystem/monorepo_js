import { useQuery } from '@tanstack/react-query';
import { attemptGetUserDevVortexes } from '../../api/UserApi';

export const fetchDevVortexes = (params: any) =>{
  return attemptGetUserDevVortexes({
    user_id: params.queryKey[1]
  }).then((res) => res.data);
}

export const useDevVortexes = (user_id = '', user_type = '') => {

  return useQuery<any, Error>({
    queryKey: ['user_dev_vortex', { user_id, user_type }],
    queryFn: () => fetchDevVortexes({
      user_id,
      user_type
    }),
    refetchOnWindowFocus: false,
    keepPreviousData : true,
    enabled: user_id.length > 0 && user_type.length > 0
  });
}