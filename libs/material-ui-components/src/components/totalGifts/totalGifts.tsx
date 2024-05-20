import React, { FC, ReactElement } from 'react';
import { Box, Typography } from '@mui/material';
import { FullWidthSection, CustomButton } from '../../index';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Gifts, Seperator } from './totalGifts.style';
import { ITotalGifts } from './totalGifts.interface';

export const TotalGifts: FC<ITotalGifts> = (props): ReactElement => {
  const {
    userName1,
    userName2,
    registry_id,
    showAddGuest,
    showEdit,
    onNavigate,
  } = props;

  return (
    <FullWidthSection>
      <Gifts
        bgcolor="info.main"
        width="100%"
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexWrap="wrap"
        gap="10px"
      >
        <Typography variant="subtitle1" lineHeight="18px">
          {userName1}
          <b> {userName2}</b>
        </Typography>
        <Seperator display="flex" alignItems="center">
          <Box borderRight="1px solid #D9D9D9" height="27px" mx={2}></Box>
        </Seperator>
        <Box display="flex">
          <CustomButton
            buttonText="View Registry"
            variant="contained"
            style={{
              backgroundColor: 'text.primary',
              height: '40px',
              fontSize: '14px',
            }}
            onClick={() => {
              onNavigate(`/view-registry/${registry_id}`);
            }}
          />
          {showAddGuest && (
            <CustomButton
              variant="contained"
              buttonText="Guest List"
              style={{
                height: '40px',
                fontSize: '14px',
                ml: 1,
              }}
              startIcon={<AddCircleOutlineIcon />}
              onClick={() => {
                onNavigate(`/guest-list/${registry_id}`);
              }}
            />
          )}
          {showEdit && (
            <CustomButton
              variant="contained"
              buttonText="Edit Registry"
              style={{
                height: '40px',
                fontSize: '14px',
                ml: 1,
              }}
              onClick={() => {
                onNavigate(`/registry/${registry_id}`);
              }}
            />
          )}
        </Box>
      </Gifts>
    </FullWidthSection>
  );
};
