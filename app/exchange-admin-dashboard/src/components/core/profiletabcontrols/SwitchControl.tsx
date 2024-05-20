import React, { FC, ReactElement } from 'react';
import { Typography, FormControl } from '@mui/material';
import { Controller } from 'react-hook-form';
import { ChipToggle } from '@monorepo/material-ui-components';

export const ProfileSwitchControl: FC<any> = ({
  settingDisplayName,
  control,
  validations,
  settingName,
}): ReactElement => {
  return (
    <FormControl size="small">
      <Typography variant="subtitle1" sx={{ color: 'text.primary' }}>
        {settingDisplayName}
      </Typography>
      <Controller
        name={settingName}
        control={control}
        rules={validations}
        render={({ field: { onChange, value, ref } }) => (
          <ChipToggle
            toggleText1={'Yes'}
            toggleText2={'No'}
            handleOnChange={onChange}
            isTrue={value}
            inputRef={ref}
          />
        )}
      />
    </FormControl>
  );
};
