import React, { FC, ReactElement } from 'react';
import { FormControl } from '@mui/material';
import { Controller } from 'react-hook-form';
import { ListSelect } from '@monorepo/material-ui-components';
import { filter } from 'lodash';

export const ProfileMultichoiceControl: FC<any> = ({
  settingDisplayName,
  control,
  validations,
  errors,
  settingName,
  settingOptions,
}): ReactElement => {
  return (
    <FormControl size="small" fullWidth>
      <Controller
        name={settingName}
        control={control}
        rules={validations}
        render={({ field: { onChange, value, ref } }) => (
          <ListSelect
            label={settingDisplayName}
            size="small"
            inputRef={ref}
            value={value}
            error={!!errors[settingName]}
            helperText={errors[settingName]?.message}
            setValue={(ev) => onChange(ev)}
            options={settingOptions}
          />
        )}
      />
    </FormControl>
  );
};
