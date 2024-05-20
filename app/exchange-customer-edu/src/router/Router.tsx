import { FC, ReactElement } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Login, Dashboard } from '../pages';

export const Router: FC = (): ReactElement => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
};
