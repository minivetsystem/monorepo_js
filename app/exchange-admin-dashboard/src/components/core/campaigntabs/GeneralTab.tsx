import React, { FC, ReactElement } from 'react';
import { FormControl, Grid, Stack, Typography } from '@mui/material';
import { Controller } from 'react-hook-form';
import {
  CAMPAIGNS_MIN_ACCEPTED_QUALITIES,
  CAMPAIGNS_POSTING_METHODS,
  CAMPAIGNS_POST_HEADERS,
  CAMPAIGNS_RESPONSE_METHODS,
  CAMPAIGN_STATUS_OPTIONS,
} from '../../../configs/constants';
import {
  ChipToggle,
  CustomTextField,
  ListSelect,
} from '@monorepo/material-ui-components';
import { filter } from 'lodash';

interface IProps {
  control: any;
  error: any;
  allLeadTypes: any;
  allClients: any;
}

export const CampaignGeneralTab: FC<IProps> = ({
  control,
  error,
  allLeadTypes,
  allClients,
}): ReactElement => {
  return (
    <Grid container>
      <Grid xs={12} lg={6}>
        <Stack gap={1} m={1}>
          <FormControl size="small">
            <Controller
              name="campaign_name"
              control={control}
              rules={{
                required: 'Campaign name is required.',
              }}
              render={({ field: { onChange, value, ref } }) => (
                <CustomTextField
                  label="Campaign Name:"
                  size="small"
                  variant="outlined"
                  onChange={(e) => onChange(e.target.value)}
                  value={value}
                  inputRef={ref}
                  error={!!error?.campaign_name}
                  helperText={error?.campaign_name?.message}
                  placeholder="Enter Campaign name"
                />
              )}
            />
          </FormControl>
          <FormControl size="small">
            <Controller
              name="client_handler"
              control={control}
              rules={{
                required: 'Client handler is required.',
              }}
              render={({ field: { onChange, value, ref } }) => (
                <CustomTextField
                  label="Client handler:"
                  size="small"
                  variant="outlined"
                  onChange={(e) => onChange(e.target.value)}
                  value={value}
                  inputRef={ref}
                  error={!!error?.client_handler}
                  helperText={error?.client_handler?.message}
                  placeholder="Enter Campaign Handler"
                />
              )}
            />
          </FormControl>
          <FormControl size="small">
            <Controller
              name="client_id"
              control={control}
              rules={{
                required: 'Client is required.',
              }}
              render={({ field: { onChange, value, ref } }) => {
                return (
                  <ListSelect
                    label="Client:"
                    size="small"
                    inputRef={ref}
                    value={value}
                    error={!!error?.client_id}
                    helperText={error?.client_id?.message}
                    setValue={(ev) => onChange(ev)}
                    options={allClients?.map((option) => ({
                      value: option._id,
                      name: option.first_name + ' ' + option.last_name,
                    }))}
                  />
                );
              }}
            />
          </FormControl>
          <FormControl size="small">
            <Typography variant="subtitle1" sx={{ color: 'text.primary' }}>
              Lead flow status
            </Typography>
            <Controller
              name="is_lead_flow_status"
              control={control}
              render={({ field: { onChange, value, ref } }) => (
                <ChipToggle
                  toggleText1={'Running'}
                  toggleText2={'Paused'}
                  handleOnChange={onChange}
                  isTrue={value}
                  inputRef={ref}
                />
              )}
            />
          </FormControl>
          <FormControl size="small">
            <Typography variant="subtitle1" sx={{ color: 'text.primary' }}>
              Sends returns
            </Typography>
            <Controller
              name="is_sends_returns"
              control={control}
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
          <FormControl size="small">
            <Controller
              name="posting_method"
              control={control}
              render={({ field: { onChange, value, ref } }) => (
                <ListSelect
                  label="Posting Method:"
                  size="small"
                  inputRef={ref}
                  value={value || ''}
                  setValue={(ev) => onChange(ev)}
                  options={CAMPAIGNS_POSTING_METHODS.map((option) => ({
                    value: option.value,
                    name: option.label,
                  }))}
                />
              )}
            />
          </FormControl>
          <FormControl size="small">
            <Controller
              name="ping_test_url"
              control={control}
              rules={{
                validate: {
                  matchPattern: (v) =>
                    /^((http|https):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/g.test(
                      v,
                    ) || 'Value must be a valid url',
                },
              }}
              render={({ field: { onChange, value, ref } }) => (
                <CustomTextField
                  label="Ping test url:"
                  size="small"
                  variant="outlined"
                  onChange={(e) => onChange(e.target.value)}
                  value={value}
                  inputRef={ref}
                  error={!!error?.ping_test_url}
                  helperText={error?.ping_test_url?.message}
                  placeholder="Enter Ping test url"
                />
              )}
            />
          </FormControl>
          <FormControl size="small">
            <Controller
              name="post_live_url"
              control={control}
              rules={{
                validate: {
                  matchPattern: (v) =>
                    /^((http|https):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/g.test(
                      v,
                    ) || 'Value must be a valid url',
                },
              }}
              render={({ field: { onChange, value, ref } }) => (
                <CustomTextField
                  label="Post live url:"
                  size="small"
                  variant="outlined"
                  onChange={(e) => onChange(e.target.value)}
                  value={value}
                  inputRef={ref}
                  error={!!error?.post_live_url}
                  helperText={error?.post_live_url?.message}
                  placeholder="Enter Post live url"
                />
              )}
            />
          </FormControl>
          <FormControl size="small">
            <Controller
              name="response_method"
              control={control}
              render={({ field: { onChange, value, ref } }) => (
                <ListSelect
                  label="Response method:"
                  size="small"
                  inputRef={ref}
                  value={value}
                  setValue={(ev) => onChange(ev)}
                  options={CAMPAIGNS_RESPONSE_METHODS.map((option) => ({
                    value: option.value,
                    name: option.label,
                  }))}
                />
              )}
            />
          </FormControl>
          <FormControl size="small">
            <Controller
              name="parameter1"
              control={control}
              render={({ field: { onChange, value, ref } }) => (
                <CustomTextField
                  label="Parameter 1:"
                  size="small"
                  variant="outlined"
                  onChange={(e) => onChange(e.target.value)}
                  value={value}
                  inputRef={ref}
                  placeholder="Enter Parameter 1"
                />
              )}
            />
          </FormControl>
          <FormControl size="small">
            <Controller
              name="parameter2"
              control={control}
              render={({ field: { onChange, value, ref } }) => (
                <CustomTextField
                  label="Parameter 2:"
                  size="small"
                  variant="outlined"
                  onChange={(e) => onChange(e.target.value)}
                  value={value}
                  inputRef={ref}
                  placeholder="Enter Parameter 2"
                />
              )}
            />
          </FormControl>
          <FormControl size="small">
            <Controller
              name="parameter3"
              control={control}
              render={({ field: { onChange, value, ref } }) => (
                <CustomTextField
                  label="Parameter 3:"
                  size="small"
                  variant="outlined"
                  onChange={(e) => onChange(e.target.value)}
                  value={value}
                  inputRef={ref}
                  placeholder="Enter Parameter 3"
                />
              )}
            />
          </FormControl>
          <FormControl size="small">
            <Controller
              name="parameter4"
              control={control}
              render={({ field: { onChange, value, ref } }) => (
                <CustomTextField
                  label="Parameter 4:"
                  size="small"
                  variant="outlined"
                  onChange={(e) => onChange(e.target.value)}
                  value={value}
                  inputRef={ref}
                  placeholder="Enter Parameter 4"
                />
              )}
            />
          </FormControl>
          <FormControl size="small">
            <Controller
              name="bidding_floor_attempt_1"
              control={control}
              render={({ field: { onChange, value, ref } }) => (
                <CustomTextField
                  label="Bidding floot: Attempt 1"
                  size="small"
                  variant="outlined"
                  onChange={(e) => onChange(e.target.value)}
                  value={value}
                  inputRef={ref}
                  type="number"
                  placeholder="Enter attempt 1"
                />
              )}
            />
          </FormControl>
          <FormControl size="small">
            <Controller
              name="bidding_floor_attempt_2"
              control={control}
              render={({ field: { onChange, value, ref } }) => (
                <CustomTextField
                  label="Bidding floot: Attempt 2"
                  size="small"
                  variant="outlined"
                  onChange={(e) => onChange(e.target.value)}
                  value={value}
                  inputRef={ref}
                  type="number"
                  placeholder="Enter attempt 2"
                />
              )}
            />
          </FormControl>
          <FormControl size="small">
            <Controller
              name="bidding_floor_attempt_3"
              control={control}
              render={({ field: { onChange, value, ref } }) => (
                <CustomTextField
                  label="Bidding floot: Attempt 3"
                  size="small"
                  variant="outlined"
                  onChange={(e) => onChange(e.target.value)}
                  value={value}
                  inputRef={ref}
                  type="number"
                  placeholder="Enter attempt 3"
                />
              )}
            />
          </FormControl>
          <FormControl size="small">
            <Controller
              name="bidding_floor_attempt_4"
              control={control}
              render={({ field: { onChange, value, ref } }) => (
                <CustomTextField
                  label="Bidding floot: Attempt 4"
                  size="small"
                  variant="outlined"
                  onChange={(e) => onChange(e.target.value)}
                  value={value}
                  inputRef={ref}
                  type="number"
                  placeholder="Enter attempt 4"
                />
              )}
            />
          </FormControl>
          <FormControl size="small">
            <Controller
              name="bidding_floor_attempt_5"
              control={control}
              render={({ field: { onChange, value, ref } }) => (
                <CustomTextField
                  label="Bidding floot: Attempt 5"
                  size="small"
                  variant="outlined"
                  onChange={(e) => onChange(e.target.value)}
                  value={value}
                  inputRef={ref}
                  type="number"
                  placeholder="Enter attempt 5"
                />
              )}
            />
          </FormControl>
        </Stack>
      </Grid>
      <Grid xs={12} lg={6}>
        <Stack gap={1} m={1}>
          <FormControl size="small">
            <Controller
              name="campaign_status"
              control={control}
              render={({ field: { onChange, value, ref } }) => (
                <ListSelect
                  label="Status:"
                  size="small"
                  inputRef={ref}
                  value={value}
                  setValue={(ev) => onChange(ev)}
                  options={CAMPAIGN_STATUS_OPTIONS.map((option) => ({
                    value: option.value,
                    name: option.label,
                  }))}
                />
              )}
            />
          </FormControl>
          <FormControl size="small">
            <Controller
              name="lead_type_id"
              control={control}
              rules={{
                required: 'Lead type is required.',
              }}
              render={({ field: { onChange, value, ref } }) => {
                return (
                  <ListSelect
                    label="Lead Type:"
                    size="small"
                    inputRef={ref}
                    value={value}
                    error={error?.lead_type_id}
                    setValue={(ev) => onChange(ev)}
                    options={allLeadTypes?.map((option) => ({
                      value: option._id,
                      name: option.lead_type,
                    }))}
                  />
                );
              }}
            />
          </FormControl>
          <FormControl size="small">
            <Typography variant="subtitle1" sx={{ color: 'text.primary' }}>
              Allowed By EWS?
            </Typography>
            <Controller
              name="is_allowed_by_ews"
              control={control}
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
          <FormControl size="small">
            <Typography variant="subtitle1" sx={{ color: 'text.primary' }}>
              Accepts call center leads
            </Typography>
            <Controller
              name="is_accepts_call_center_leads"
              control={control}
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
          <FormControl size="small">
            <Controller
              name="min_accepted_quality"
              control={control}
              render={({ field: { onChange, value, ref } }) => (
                <ListSelect
                  label=" Min accepted quality:"
                  size="small"
                  inputRef={ref}
                  value={value}
                  setValue={(ev) => onChange(ev)}
                  options={CAMPAIGNS_MIN_ACCEPTED_QUALITIES.map((option) => ({
                    value: option.value,
                    name: option.label,
                  }))}
                />
              )}
            />
          </FormControl>
          <FormControl size="small">
            <Controller
              name="ping_live_url"
              control={control}
              rules={{
                validate: {
                  matchPattern: (v) =>
                    /^((http|https):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/g.test(
                      v,
                    ) || 'Value must be a valid url',
                },
              }}
              render={({ field: { onChange, value, ref } }) => (
                <CustomTextField
                  label="Ping live url:"
                  size="small"
                  variant="outlined"
                  onChange={(e) => onChange(e.target.value)}
                  value={value}
                  inputRef={ref}
                  error={!!error?.ping_live_url}
                  helperText={error?.ping_live_url?.message}
                  placeholder="Enter Ping live url"
                />
              )}
            />
          </FormControl>
          <FormControl size="small">
            <Controller
              name="post_test_url"
              control={control}
              rules={{
                validate: {
                  matchPattern: (v) =>
                    /^((http|https):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/g.test(
                      v,
                    ) || 'Value must be a valid url',
                },
              }}
              render={({ field: { onChange, value, ref } }) => (
                <CustomTextField
                  label="Post test url:"
                  size="small"
                  variant="outlined"
                  onChange={(e) => onChange(e.target.value)}
                  value={value}
                  inputRef={ref}
                  error={!!error?.post_test_url}
                  helperText={error?.post_test_url?.message}
                  placeholder="Enter Post test url"
                />
              )}
            />
          </FormControl>
          <FormControl size="small">
            <Controller
              name="post_header"
              control={control}
              render={({ field: { onChange, value, ref } }) => (
                <ListSelect
                  label="Post header:"
                  size="small"
                  inputRef={ref}
                  value={value}
                  setValue={(ev) => onChange(ev)}
                  options={CAMPAIGNS_POST_HEADERS.map((option) => ({
                    value: option.value,
                    name: option.label,
                  }))}
                />
              )}
            />
          </FormControl>
          <FormControl size="small">
            <Controller
              name="price"
              control={control}
              render={({ field: { onChange, value, ref } }) => (
                <CustomTextField
                  label="Price:"
                  size="small"
                  variant="outlined"
                  onChange={(e) => onChange(e.target.value)}
                  value={value}
                  inputRef={ref}
                  type="number"
                  placeholder="Enter price"
                />
              )}
            />
          </FormControl>
          <FormControl size="small">
            <Controller
              name="tier"
              control={control}
              render={({ field: { onChange, value, ref } }) => (
                <CustomTextField
                  label="Tier:"
                  size="small"
                  variant="outlined"
                  onChange={(e) => onChange(e.target.value)}
                  value={value}
                  inputRef={ref}
                  placeholder="Enter tier"
                />
              )}
            />
          </FormControl>
          <FormControl size="small">
            <Typography variant="subtitle1" sx={{ color: 'text.primary' }}>
              Third Party Verification
            </Typography>
            <Controller
              name="is_third_party_verification"
              control={control}
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
          <FormControl size="small">
            <Typography variant="subtitle1" sx={{ color: 'text.primary' }}>
              Auto Verify Numbers
            </Typography>
            <Controller
              name="is_auto_verify_numbers"
              control={control}
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
          <FormControl size="small">
            <Typography variant="subtitle1" sx={{ color: 'text.primary' }}>
              Is TCPA Shield Active?
            </Typography>
            <Controller
              name="is_tcpa_shield_active"
              control={control}
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
          <FormControl size="small">
            <Controller
              name="max_revenue_limit"
              control={control}
              render={({ field: { onChange, value, ref } }) => (
                <CustomTextField
                  label="Max Revenue Limit:"
                  size="small"
                  variant="outlined"
                  onChange={(e) => onChange(e.target.value)}
                  value={value}
                  inputRef={ref}
                  type="number"
                  placeholder="Enter Max revenue limit"
                />
              )}
            />
          </FormControl>
          <FormControl size="small">
            <Controller
              name="adjusted_client_margin"
              control={control}
              render={({ field: { onChange, value, ref } }) => (
                <CustomTextField
                  label="Adjusted Client Margin %"
                  size="small"
                  variant="outlined"
                  onChange={(e) => onChange(e.target.value)}
                  value={value}
                  inputRef={ref}
                  type="number"
                  placeholder="Enter client margin"
                />
              )}
            />
          </FormControl>
        </Stack>
      </Grid>
    </Grid>
  );
};
