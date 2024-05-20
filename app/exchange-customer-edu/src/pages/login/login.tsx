import { FC, ReactElement } from 'react';
import { LoginLayout } from '@monorepo/react-dashboard';
import { LoginSidebar } from './loginSidebar';

// import static assets

export const Login: FC = (): ReactElement => {
  return (
    <LoginLayout
      image="/assets/images/loginHero.png"
      loginSidebar={<LoginSidebar />}
    />
  );
};
