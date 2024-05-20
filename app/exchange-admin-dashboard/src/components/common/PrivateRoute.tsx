import React from 'react';
import { Authenticate } from './Authenticate';
import { useSelector } from 'react-redux';

export const PrivateRoute = ({ component: Component, ...rest }) => {
  const userState = useSelector((state: any) => state.user);

  return userState?.user?._id ? (
    <div>
      <Component {...rest} />
    </div>
  ) : (
    <Authenticate component={Component} {...rest} />
  );
};
