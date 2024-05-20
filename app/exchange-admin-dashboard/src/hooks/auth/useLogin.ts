import { useMutation } from "@tanstack/react-query";
import { useDispatch } from 'react-redux';
import { attemptSignIn } from '../../api/AuthApi';
import moment from 'moment';

export const useLogin = () => {

  const dispatch = useDispatch();

  return useMutation<any, any, any, any>({
    mutationFn: (values) => {
        return attemptSignIn(values).then((res) => res.data);
    },
    onSuccess: (data) => {
       dispatch.user.setUser(data);
       dispatch.user.setUserTokens({
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
        timestamp: moment().unix()
       });
    }
  }
  )
}
//mutationFn: (userData) => loginFn(userData),