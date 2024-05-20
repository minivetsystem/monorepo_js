import React, { FC, ReactElement } from 'react';
import { ListItem } from '@mui/material';
import { IInstaImageProps } from './instaImage.interface';
import styles from './instaImage.module.scss';

export const InstaImage: FC<IInstaImageProps> = (props): ReactElement => {
  const { image } = props;
  return (
    <ListItem sx={{ padding: 0 }}>
      <img src={image} alt="" className={styles.instaImage} />
    </ListItem>
  );
};
