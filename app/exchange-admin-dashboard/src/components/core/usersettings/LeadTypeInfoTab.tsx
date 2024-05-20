import React, { FC, ReactElement } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  FormControl,
  Grid,
  Link,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import {
  VENDOR_LEAD_TYPE_STATUSES,
  VENDOR_LEAD_FLOW_STATUSES,
  LEAD_TYPE_PAYMENT_MODELS,
  PAYMENT_MODELS,
} from '../../../configs/constants';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { filter } from 'lodash';
import {
  ChipToggle,
  CustomTextField,
  ListSelect,
  TextArea,
} from '@monorepo/material-ui-components';

const InputComponent = ({ inputRef, ...other }) => <div {...other} />;
const OutlinedDiv = ({ children, label }) => {
  return (
    <TextField
      variant="outlined"
      sx={{ margin: 1 }}
      label={label}
      multiline
      InputLabelProps={{ shrink: true }}
      InputProps={{
        inputComponent: InputComponent,
      }}
      inputProps={{ children: children }}
    />
  );
};

const LeadTypeForm: FC<IProps> = ({
  item,
  register,
  setValue,
  index,
  allLeadTypes,
}): ReactElement => {
  return (
    <Grid container m={0} p={0}>
      <Grid xs={12} lg={6}>
        <Stack gap={1} m={0}>
          <OutlinedDiv label="General Settings">
            <Stack gap={1} m={1}>
              <FormControl size="small">
                <ListSelect
                  label="Lead Type:"
                  size="small"
                  value={item?.lead_type._id}
                  defaultValue={item.lead_type._id}
                  setValue={(opt) => {
                    setValue(`lead_type._id`, opt, index, item);
                  }}
                  options={allLeadTypes.map((leadType) => ({
                    value: leadType._id,
                    name: leadType.lead_type,
                  }))}
                />
              </FormControl>
              <FormControl size="small">
                <ListSelect
                  label="Status/Mode:"
                  size="small"
                  value={item?.status}
                  defaultValue={item.status}
                  setValue={(opt) => {
                    setValue(`status`, opt, index, item);
                  }}
                  options={VENDOR_LEAD_TYPE_STATUSES.map((option) => ({
                    value: option.value,
                    name: option.label,
                  }))}
                />
              </FormControl>
              <FormControl size="small">
                <ListSelect
                  label="Lead Flow Status:"
                  size="small"
                  value={item?.lead_flow_status}
                  defaultValue={item.lead_flow_status}
                  setValue={(opt) => {
                    setValue(`lead_flow_status`, opt, index, item);
                  }}
                  options={VENDOR_LEAD_FLOW_STATUSES.map((option) => ({
                    value: option.value,
                    name: option.label,
                  }))}
                />
              </FormControl>
            </Stack>
          </OutlinedDiv>
          <OutlinedDiv label="Payment Model">
            <Stack gap={1} m={0}>
              <FormControl size="small">
                <ListSelect
                  label="Payment Model:"
                  size="small"
                  value={item?.payment_model}
                  defaultValue={item.payment_model}
                  setValue={(opt) => {
                    setValue(`payment_model`, opt, index, item);
                  }}
                  options={LEAD_TYPE_PAYMENT_MODELS.map((option) => ({
                    value: option.value,
                    name: option.label,
                  }))}
                />
              </FormControl>
              <FormControl size="small">
                <CustomTextField
                  label={
                    item.payment_model === 'rev_share'
                      ? 'Rev Share:'
                      : 'Fixed price per lead $'
                  }
                  size="small"
                  variant="outlined"
                  defaultValue={item.rev_share}
                  onChange={(ev) => {
                    setValue(`rev_share`, ev.target.value, index, item);
                  }}
                  placeholder="Enter daily accepted cap"
                />
              </FormControl>
              {item.payment_model === PAYMENT_MODELS.REVENUE_SHARING && (
                <>
                  <FormControl size="small">
                    <CustomTextField
                      label=" Vendor Min Payout Cap $:"
                      size="small"
                      variant="outlined"
                      defaultValue={item.vendor_min_payout_cap}
                      onChange={(ev) => {
                        setValue(
                          `vendor_min_payout_cap`,
                          ev.target.value,
                          index,
                          item,
                        );
                      }}
                      placeholder="Enter min payout cap"
                    />
                  </FormControl>
                  <FormControl size="small">
                    <CustomTextField
                      label=" Vendor Max Payout Cap $:"
                      size="small"
                      variant="outlined"
                      defaultValue={item.vendor_max_payout_cap}
                      onChange={(ev) => {
                        setValue(
                          `vendor_max_payout_cap`,
                          ev.target.value,
                          index,
                          item,
                        );
                      }}
                      placeholder="Enter max payout cap"
                    />
                  </FormControl>
                </>
              )}
              {item.payment_model === PAYMENT_MODELS.FIXED_PRICE && (
                <FormControl size="small">
                  <CustomTextField
                    label="Min. profit percent:"
                    size="small"
                    variant="outlined"
                    defaultValue={item.vendor_min_payout_cap}
                    onChange={(ev) => {
                      setValue(
                        `min_profit_percent`,
                        ev.target.value,
                        index,
                        item,
                      );
                    }}
                    placeholder="Enter min profit percent"
                  />
                </FormControl>
              )}
            </Stack>
          </OutlinedDiv>
        </Stack>
      </Grid>
      <Grid xs={12} lg={6}>
        <Stack gap={1} m={0}>
          <OutlinedDiv label="Safety Settings">
            <Stack gap={1} m={1}>
              <FormControl size="small">
                <CustomTextField
                  label="Daily Accepted Cap:"
                  size="small"
                  variant="outlined"
                  defaultValue={item.daily_accepted_cap}
                  onChange={(ev) => {
                    setValue(
                      `daily_accepted_cap`,
                      ev.target.value,
                      index,
                      item,
                    );
                  }}
                  placeholder="Enter daily accepted cap"
                />
              </FormControl>
              <FormControl size="small">
                <CustomTextField
                  label="Hourly Accepted Cap:"
                  size="small"
                  variant="outlined"
                  defaultValue={item.hourly_accepted_cap}
                  onChange={(ev) => {
                    setValue(
                      `hourly_accepted_cap`,
                      ev.target.value,
                      index,
                      item,
                    );
                  }}
                  placeholder="Enter hourly accepted cap"
                />
              </FormControl>
              <FormControl size="small">
                <CustomTextField
                  label="Pings/Min Cap"
                  size="small"
                  variant="outlined"
                  defaultValue={item.max_pings_per_min_cap}
                  onChange={(ev) => {
                    setValue(
                      `max_pings_per_min_cap`,
                      ev.target.value,
                      index,
                      item,
                    );
                  }}
                  placeholder="Enter max pings per min cap"
                />
              </FormControl>
            </Stack>
          </OutlinedDiv>
          <OutlinedDiv label="TCPA Text">
            <Stack gap={1} m={0}>
              <FormControl size="small">
                <TextArea
                  label="TCPA Text:"
                  minRows={3}
                  variant="outlined"
                  defaultValue={item.tcpa_text}
                  onChange={(ev) => {
                    setValue(`tcpa_text`, ev.target.value, index, item);
                  }}
                  placeholder="Enter TCPA Text"
                />
              </FormControl>
              <FormControl size="small">
                <Typography variant="subtitle1" sx={{ color: 'text.primary' }}>
                  TCPA Text Active:
                </Typography>
                <ChipToggle
                  toggleText1={'Yes'}
                  toggleText2={'No'}
                  isTrue={item.is_tcpa_text_active}
                  handleOnChange={(ev) =>
                    setValue(`is_tcpa_text_active`, ev, index, item)
                  }
                />
              </FormControl>
            </Stack>
          </OutlinedDiv>
        </Stack>
      </Grid>
    </Grid>
  );
};

interface IProps {
  control: any;
}

export const LeadTypeInfoTab: FC<IProps> = ({
  fields,
  register,
  setValue,
  allLeadTypes,
  onAddNewLeadTypeInfo,
  onDeleteLeadTypeSetting,
}): ReactElement => {
  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ textAlign: 'right', width: '100%', my: 2 }}>
        <Link
          component="button"
          variant="subtitle2"
          onClick={() => onAddNewLeadTypeInfo()}
        >
          + Add New
        </Link>
      </Box>
      {fields.map((item, index) => {
        return (
          <Accordion sx={{ width: '100%' }} key={index}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              sx={{ border: '1px solid #BABABA' }}
              id="panel1a-header"
            >
              <Typography variant="subtitle2">
                {item?.lead_type?.lead_type || '*New Lead Type'}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Stack direction="row" justifyContent="end">
                <Link
                  component="button"
                  variant="subtitle2"
                  display="flex"
                  justifyContent="flex-end"
                  sx={{ textAlign: 'right', m: 0, p: 0, color: 'red' }}
                  onClick={() => onDeleteLeadTypeSetting(index)}
                >
                  - Delete
                </Link>
              </Stack>
              <LeadTypeForm
                allLeadTypes={allLeadTypes}
                register={register}
                setValue={setValue}
                index={index}
                item={item}
              />
            </AccordionDetails>
          </Accordion>
        );
      })}
    </Box>
  );
};
