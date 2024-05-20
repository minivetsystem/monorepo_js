import React, { FC, ReactElement, useState } from 'react';
import { Typography, FormControl, InputAdornment } from '@mui/material';
import { Controller } from 'react-hook-form';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { TextInput } from '@monorepo/material-ui-components';

export const ProfilePasswordControl: FC<any> = ({
  settingDisplayName,
  control,
  validations,
  errors,
  settingName,
}): ReactElement => {
  const [hidePassword, setHidePassword] = useState(true);

  return (
    <FormControl size="small" fullWidth>
      <Typography variant="subtitle1" sx={{ color: 'text.primary' }}>
        {settingDisplayName}
      </Typography>
      <Controller
        name={settingName}
        control={control}
        rules={validations}
        render={({ field: { onChange, value, ref } }) => (
          <TextInput
            size="small"
            type={hidePassword ? 'password' : 'text'}
            autoComplete="new-password"
            error={!!errors[settingName]}
            onChange={onChange}
            value={value}
            inputRef={ref}
            placeholder={`Enter ${settingDisplayName}`}
            endAdornment={
              <InputAdornment
                position="start"
                onClick={() => setHidePassword(!hidePassword)}
              >
                {hidePassword ? (
                  <VisibilityIcon style={{ cursor: 'pointer' }} />
                ) : (
                  <VisibilityIcon style={{ cursor: 'pointer' }} />
                )}
              </InputAdornment>
            }
          />
        )}
      />
    </FormControl>
  );
};
