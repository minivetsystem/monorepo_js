import React, { FC, ReactElement } from 'react';
import { LoginLayout } from '@monorepo/react-dashboard';
import { LoginSidebar } from '../../components';

export const Login: FC = (): ReactElement => {
  return (
    <LoginLayout
      image="/assets/images/loginHero.png"
      loginSidebar={<LoginSidebar />}
    />
  );
};

export default Login;
