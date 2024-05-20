import { FC, ReactElement } from 'react';
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from '@mui/material';
import { IRadioGroup } from './radioGroup.interface';

export const RadioButtonsGroup: FC<IRadioGroup> = (props): ReactElement => {
  const { options, label, inputRef, onChange, value } = props;
  return (
    <FormControl>
      {label && (
        <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
      )}
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="female"
        name="radio-buttons-group"
      >
        {Array.isArray(options) &&
          options?.map((item, index) => (
            <FormControlLabel
              value={item.value}
              onChange={onChange}
              control={<Radio checked={value === item.value} />}
              label={item.label}
              key={index}
              inputRef={inputRef}
            />
          ))}
      </RadioGroup>
    </FormControl>
  );
};
