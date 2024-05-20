import React, { useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const Authenticate = () => {
  const state = useSelector((state: any) => state.user);
  const history = useNavigate();

  useEffect(() => {
    try {
      if (!state) {
        history('/');
        return;
      }
      const decode = jwtDecode(state.user?.accessToken || '');
      if (state.user !== null && decode && decode?.exp < new Date().getTime()) {
        //ToDo SAVED USER IS VALID
      } else {
        history('/');
      }
    } catch (err) {
      history('/');
    }
  }, []);

  return (
    <div className="spinner">
      <span>Loading...</span>
    </div>
  );
};
