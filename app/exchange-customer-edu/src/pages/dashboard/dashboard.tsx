import { FC, ReactElement } from 'react';
import { PageLayout } from '../../components';
import { Home } from './home';

export const Dashboard: FC = (): ReactElement => {
  return <PageLayout component={<Home />} pageName="Dashboard" />;
};
