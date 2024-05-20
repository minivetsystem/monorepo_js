import React, { FC, ReactElement } from 'react';
import { FormControl } from '@mui/material';
import { Controller } from 'react-hook-form';
import { CustomTextField } from '@monorepo/material-ui-components';

export const ProfileTextControl: FC<any> = ({
  settingDisplayName,
  control,
  validations,
  errors,
  settingName,
}): ReactElement => {
  return (
    <FormControl size="small" fullWidth>
      <Controller
        name={settingName}
        control={control}
        rules={validations}
        render={({ field: { onChange, value, ref } }) => (
          <CustomTextField
            label={settingDisplayName}
            name={settingName}
            size="small"
            variant="outlined"
            error={!!errors[settingName]}
            onChange={onChange}
            value={value}
            inputRef={ref}
            helperText={errors[settingName]?.message}
            placeholder={`Enter ${settingDisplayName}`}
          />
        )}
      />
    </FormControl>
  );
};
