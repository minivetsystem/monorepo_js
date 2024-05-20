import React, { ReactElement, FC } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { Select, Button } from '@monorepo/react-dashboard';
import { hoursMinutesArray } from '@monorepo/react-dashboard';
import { IDayWiseTime } from './dayWiseTime.interface';

export const DayWiseTime: FC<IDayWiseTime> = (props): ReactElement => {
  const { fields, onChangeTime, onClickDayName, onClickTimeButton } = props;

  return (
    <Grid
      container
      spacing={2}
      pb={2}
      px={3}
      mt={2}
      boxShadow="rgba(149, 157, 165, 0.2) 0px 8px 24px"
    >
      {Array.isArray(fields) &&
        fields?.map((item, i) => (
          <Grid
            display="grid"
            justifyContent="center"
            item
            xs={12}
            sm={6}
            md={4}
          >
            <Box display="flex">
              <Button
                buttonText={item.dayName}
                variant={item.hours === 0 ? 'outlined' : 'contained'}
                onClick={() => onClickDayName(i)}
                style={{ width: '110px', height: '40px', marginRight: '20px' }}
              />
              <Button
                buttonText={
                  item.hours === 24
                    ? '24 Hours'
                    : item.hours === 0
                    ? 'Closed'
                    : 'Custom'
                }
                variant={
                  item.hours !== 24 && item.hours !== 0
                    ? 'outlined'
                    : 'contained'
                }
                onClick={() => onClickTimeButton(i)}
                style={{
                  width: '110px',
                  height: '40px',
                  backgroundColor:
                    item.hours === 0
                      ? 'red'
                      : item.hours === 24
                      ? 'var(--main)'
                      : 'white',
                }}
              />
            </Box>
            {item.hours !== 0 && item.hours !== 24 && (
              <Box
                display="flex"
                mt={1}
                mb={2}
                width="240px"
                justifyContent="space-between"
                alignItems="center"
              >
                <Select
                  onChange={(value) => onChangeTime(value, 'startTime', i)}
                  options={hoursMinutesArray}
                  style={{ width: '105px' }}
                  placeholder=""
                  value={item.startTime}
                />
                <Typography>To</Typography>
                <Select
                  onChange={(value) => onChangeTime(value, 'endTime', i)}
                  options={hoursMinutesArray}
                  style={{ width: '105px' }}
                  value={item.endTime}
                  placeholder=""
                />
              </Box>
            )}
          </Grid>
        ))}
    </Grid>
  );
};
