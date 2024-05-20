import React, { FC, ReactElement} from 'react';

import { CloseOutlined } from '@mui/icons-material';
import moment from 'moment';

import {
  Box,
  Modal,
  Button,
  Grid,
  FormControl,
  Stack,
  Typography
} from '@mui/material';
import {
  ChipToggle,
  CustomTextField,
  ListSelect,
  DateInput,
} from '@monorepo/material-ui-components';
import { MultiListSelect } from '../../common/multiListSelect/multiListSelect';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  // border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};
interface IProps {
  control: any;
  open: boolean;
  handleClose: () => void;
  handleSave: () => void;
  handleFieldChange: (ev: any, prop: any) => void;
  fromData?: any;
  onSave: any;
  allBuyers?: any;
  allVendors?: any;
  fieldRefs?: any;
}

export const AddEducationCampaign: FC<IProps> = ({
  open,
  handleClose,
  handleSave,
  handleFieldChange,
  fromData,
  allBuyers,
  allVendors,
  fieldRefs,
}): ReactElement => {
  const [error, setError] = React.useState(true);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          ...style,
          width: 800,
          height: 500,
          overflow: 'auto',
          fontSize: '12px',
          padding: '10px',
          margin: '0px',
        }}
      >
        <CloseOutlined
          sx={{ float: 'right', cursor: 'pointer' }}
          onClick={handleClose}
        />
        <Grid container>
          <Grid xs={12}>
            <Stack gap={1} ml={3}>
              <Typography variant="h1" color="text.primary">
                Add Education Campaign
              </Typography>
            </Stack>
          </Grid>
          <Grid xs={12} lg={6}>
            <Stack gap={1} m={3}>
              <FormControl size="small">
                <CustomTextField
                  label="Education Campaign Name:"
                  size="small"
                  variant="outlined"
                  onChange={(e) => handleFieldChange(e, 'name')}
                  value={fromData.name}
                  placeholder="Enter Education Campaign name"
                  inputRef={fieldRefs.name}
                  // error={!!error}
                  // helperText={error? 'Please Enter Campaign Name': ''}
                />
              </FormControl>
              <FormControl size="small">
                <Typography variant="subtitle1" sx={{ color: 'text.primary' }}>
                  Status
                </Typography>

                <ChipToggle
                  toggleText1={'Active'}
                  toggleText2={'Inactive'}
                  handleOnChange={(e) => handleFieldChange(e, 'active')}
                  isTrue={fromData.active}
                />
              </FormControl>
              <FormControl size="small">
                <DateInput
                  label="From Date"
                  onChange={(e) => handleFieldChange(e, 'start_date')}
                  borderStyle={{
                    fieldset: {
                      border: '1px solid #BABABA',
                      Padding: '10px 14px',
                    },
                  }}
                  minDate={moment().subtract(3, 'month')}
                  value={
                    fromData.start_date
                      ? moment(fromData.start_date)
                      : moment().subtract(1, 'days')
                  }
                  inputRef={fieldRefs.start_date}
                />
              </FormControl>
            </Stack>
          </Grid>
          <Grid xs={12} lg={6}>
            <Stack gap={1} m={3}>
              <FormControl size="small">
                <CustomTextField
                  label="Commission percentage %"
                  size="small"
                  variant="outlined"
                  onChange={(e) =>
                    handleFieldChange(e, 'commission_percentage')
                  }
                  value={fromData.commission_percentage}
                  type="number"
                  placeholder="0"
                  inputRef={fieldRefs.commission_percentage}
                  // error={!!error}
                  // helperText={error? 'Please Enter Commission Percentage': ''}
                />
              </FormControl>

           

              <FormControl size="small">
                <MultiListSelect
                  options={
                    allBuyers &&
                    allBuyers.map((data: any) => ({
                      value: `${data.first_name} ${data.last_name}`,
                      name: `${data.first_name} ${data.last_name}`,
                    }))
                  }
                  label="Buyers Name:"
                  value={fromData.buyers || []}
                  setValue={(e) => handleFieldChange(e, 'buyers')}
                  multiple={true}
                  inputRef={fieldRefs.buyers}
                />
              </FormControl>

              
              <FormControl size="small">
                <ListSelect
                  label="Vandor Name:"
                  size="small"
                  value={fromData.vendor || ''}
                  setValue={(e) => handleFieldChange(e, 'vendor')}
                  options={
                    allVendors
                      ? allVendors.map((data: any) => ({
                          value: `${data.first_name} ${data.last_name}`,
                          name: `${data.first_name} ${data.last_name}`,
                        }))
                      : []
                  }
                  inputRef={fieldRefs.vendor}
                />
              </FormControl>

             


            </Stack>
          </Grid>
        </Grid>
        <Grid xs={12}>
          <Stack gap={1} m={3}>
            <Button
              sx={{
                height: 48,
                width: 97,
                marginRight: 'auto',
                display: 'flex',
              }}
              variant="outlined"
              type="submit"
              onClick={handleSave}
            >
              Save
            </Button>
          </Stack>
        </Grid>
      </Box>
    </Modal>
  );
};
