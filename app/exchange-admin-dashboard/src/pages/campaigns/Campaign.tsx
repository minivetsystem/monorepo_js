import React, { FC, ReactElement, useState } from 'react';
import { Paper, Grid, Stack, Button, Divider } from '@mui/material';
import {
  CampaignGeneralTab,
  CampaignVendorsTab,
  CampaignFiltersTab,
  Tabs,
} from '../../components';
import { useNavigate, useParams } from 'react-router-dom';
import { useCampaign } from '../../hooks/campaigns/useCampaign';
import { setAutoFreeze } from 'immer';
import { useForm } from 'react-hook-form';
import { useSaveCampaign, useLeadTypes, useUsersByRole } from '../../hooks';
import { filter } from 'lodash';
import { useQueryClient } from '@tanstack/react-query';

function intersection(a: readonly any[], b: readonly any[]) {
  return filter(a, (value) => {
    if (filter(b, { _id: value._id }).length > 0) {
      return value;
    }
  });
}

const Campaign: FC = (): ReactElement => {
  setAutoFreeze(false);
  const history = useNavigate();
  const { campaign_id } = useParams();
  const [checked, setChecked] = React.useState<readonly any[]>([]);
  const [left, setLeft] = React.useState<readonly any[]>([]);
  const [right, setRight] = React.useState<readonly any[]>([]);
  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);
  const queryClient = useQueryClient();
  const [tabValue, setTabValue] = useState(0);
  const [tabs, setTabs] = useState([]);
  const { data: campaign } = useCampaign(campaign_id);

  const {
    mutate: saveCampaign,
    data: saveCampaignResponse,
    status: saveCampaignStatus,
  } = useSaveCampaign();

  const { data: allClients } = useUsersByRole({
    roleName: 'client',
    includeDisabled: false,
  });

  const { data: allLeadTypes } = useLeadTypes();

  const {
    handleSubmit,
    control,
    formState: { errors: saveCampaignError },
    reset,
  } = useForm<any>();

  React.useEffect(() => {
    if (!campaign_id) {
      queryClient.invalidateQueries({
        predicate: function (query) {
          return query.queryKey[0] === 'campaign';
        },
      });
      reset({
        campaign_name: '',
        client_id: '',
        is_lead_flow_status: false,
        is_sends_returns: false,
        posting_method: '',
        ping_test_url: '',
        post_live_url: '',
        response_method: '',
        parameter1: '',
        parameter2: '',
        parameter3: '',
        parameter4: '',
        bidding_floor_attempt_1: '',
        bidding_floor_attempt_2: '',
        bidding_floor_attempt_3: '',
        bidding_floor_attempt_4: '',
        bidding_floor_attempt_5: '',
        lead_type_id: '',
        is_allowed_by_ews: false,
        is_accepts_call_center_leads: false,
        min_accepted_quality: '',
        ping_live_url: '',
        post_test_url: '',
        post_header: '',
        price: '',
        tier: '',
        is_third_party_verification: false,
        is_auto_verify_numbers: false,
        is_tcpa_shield_active: false,
        max_revenue_limit: '',
        adjusted_client_margin: '',
      });
      setLeft([]);
      setRight([]);
      setTabs([
        { label: 'General', disabled: false },
        { label: 'Vendors', disabled: true },
        { label: 'Filters', disabled: true },
      ]);
    } else {
      setTabs([
        { label: 'General', disabled: false },
        { label: 'Vendors', disabled: false },
        { label: 'Filters', disabled: false },
      ]);
    }
  }, [campaign_id]);

  React.useEffect(() => {
    if (campaign && campaign._id) {
      reset({
        ...campaign,
        client_id: campaign.client._id,
        lead_type_id: campaign.lead_type._id,
      });
      if (campaign.vendors?.length > 0) {
        setLeft(
          campaign.vendors.map((vendor) => {
            return vendor;
          }),
        );
      }
    }
  }, [campaign]);

  React.useEffect(() => {
    if (saveCampaignStatus === 'success') {
      history(`/campaign/${saveCampaignResponse._id}`);
    }
  }, [saveCampaignStatus]);

  const onSave = (data) => {
    const campaignData = {
      ...data,
      _id: campaign_id,
      lead_type: data.lead_type_id,
      client: data.client_id,
      vendors: left.map((vendor) => {
        return vendor._id;
      }),
    };
    saveCampaign(campaignData);
  };

  return (
    <Paper elevation={0} sx={{ p: 3 }}>
      <Grid container xs={12}>
        <Grid item xs={12}>
          <Button
            sx={{
              height: 48,
              width: 97,
              marginLeft: 'auto',
              display: 'flex',
            }}
            variant="outlined"
            onClick={handleSubmit(onSave)}
          >
            Save
          </Button>
          <Stack
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Stack>
              <Tabs value={tabValue} tabs={tabs} setValue={setTabValue} />
            </Stack>
          </Stack>
          <Divider />
        </Grid>
        <Grid container mt={1}>
          {tabValue === 0 && (
            <CampaignGeneralTab
              onSave={onSave}
              control={control}
              error={saveCampaignError}
              allLeadTypes={allLeadTypes}
              allClients={allClients}
            />
          )}
          {tabValue === 1 && (
            <CampaignVendorsTab
              onSave={onSave}
              control={control}
              checked={checked}
              setChecked={setChecked}
              right={right}
              setRight={setRight}
              left={left}
              setLeft={setLeft}
              rightChecked={rightChecked}
              leftChecked={leftChecked}
              vendors={campaign?.vendors}
              error={saveCampaignError}
              allLeadTypes={allLeadTypes}
              allClients={allClients}
            />
          )}

          {tabValue === 2 && <CampaignFiltersTab />}
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Campaign;
