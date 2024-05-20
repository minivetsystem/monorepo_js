import React, { FC, ReactElement } from 'react';
import { Link } from '@mui/material';
import { IBrandingProps } from './branding.interface';
import styles from './branding.module.scss';

export const Branding: FC<IBrandingProps> = (props): ReactElement => {
  const { logo, onNavigate } = props;
  return (
    <Link onClick={() => onNavigate('/')}>
      <img className={styles.logo} src={logo} alt="" />
    </Link>
  );
};
