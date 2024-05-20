import React, { FC, ReactElement } from 'react';
import { Grid } from '@mui/material';
import { ProfileTextControl } from './TextControl';
import { ProfilePasswordControl } from './PasswordControl';
import { ProfileMultichoiceControl } from './MultichoiceControl';
import { ProfileSwitchControl } from './SwitchControl';
import { ProfileTextAreaControl } from './TextAreaControl';
import { ProfileDoublechoiceControl } from './DoublechoiceControl';

export const ProfileTabManager: FC<any> = ({
  controlType,
  settingDisplayName,
  control,
  validations,
  errors,
  settingName,
  settingOptions,
}): ReactElement => {
  switch (controlType) {
    case 'string':
      return (
        <Grid item xs={6} p={1}>
          <ProfileTextControl
            settingDisplayName={settingDisplayName}
            control={control}
            validations={validations}
            errors={errors}
            settingName={settingName}
          />
        </Grid>
      );
    case 'text':
      return (
        <Grid item xs={6} p={1}>
          <ProfileTextAreaControl
            settingDisplayName={settingDisplayName}
            control={control}
            validations={validations}
            errors={errors}
            settingName={settingName}
          />
        </Grid>
      );
    case 'password':
      return (
        <Grid item xs={6} p={1}>
          <ProfilePasswordControl
            settingDisplayName={settingDisplayName}
            control={control}
            validations={validations}
            errors={errors}
            settingName={settingName}
          />
        </Grid>
      );
    case 'multi-choice':
      return (
        <Grid item xs={6} p={1}>
          <ProfileMultichoiceControl
            settingDisplayName={settingDisplayName}
            control={control}
            validations={validations}
            errors={errors}
            settingName={settingName}
            settingOptions={settingOptions}
          />
        </Grid>
      );
    case 'double-choice':
      return (
        <Grid item xs={6} p={1}>
          <ProfileDoublechoiceControl
            settingDisplayName={settingDisplayName}
            control={control}
            validations={validations}
            errors={errors}
            settingName={settingName}
            settingOptions={settingOptions}
          />
        </Grid>
      );
    case 'boolean':
      return (
        <Grid item xs={6}>
          <ProfileSwitchControl
            settingDisplayName={settingDisplayName}
            control={control}
            validations={validations}
            errors={errors}
            settingName={settingName}
          />
        </Grid>
      );
  }
};
