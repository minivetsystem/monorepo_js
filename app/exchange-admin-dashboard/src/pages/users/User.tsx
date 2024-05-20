import React, { FC, ReactElement, useState, useEffect } from 'react';
import { Paper, Grid, Stack, Button, Divider, Typography, TextField, MenuItem, Box } from '@mui/material';
import { Tabs, ProfileTabManager, LeadTypeInfoTab, ManageSubIDs } from '../../components';
import { useNavigate, useParams } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { useUser } from '../../hooks/users/useUser';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useLeadTypes, useProfileTabs, useSaveUser, useSettings } from '../../hooks';
import { filter, orderBy, uniqBy } from 'lodash';
import { fetchProfileTabsForRole } from '../../hooks/app/useProfileTabs';
import { enqueueSnackbar } from 'notistack';
import { NOTIFICATIONS, NOTIFICATION_MESSAGES } from '../../configs/constants';
import { generatePassword } from '../../helpers/helper';

interface IRole {
  role: string;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      style={{ width: '100%', margin: 0, padding: 0 }}
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const User: FC = (): ReactElement => {
  const history = useNavigate();
  const { user_id } = useParams();
  const queryClient = useQueryClient();
  const [selectedRole, setSelectedRole] = useState('');
  const [tabValue, setTabValue] = useState(0);
  const [userTabs, setUserTabs] = useState([]);
  const [manageSubIDs, setManageSubIDs] = useState([]);
  const { data: user } = useUser(user_id);

  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch.transferlist.addToDataList(user?.vendor_subids || []);
  },[user])

  const {
    mutate: saveUser,
    data: saveUserResponse,
    status: saveUserStatus,
  } = useSaveUser();

  const { data: profileTabs } = useProfileTabs(selectedRole);

  const { data: allSettings } = useSettings();

  const {
    handleSubmit: handleRoleSubmit,
    control: roleControl,
    formState: { errors: roleErrors },
  } = useForm<IRole>();

  const {
    handleSubmit,
    control,
    formState: { errors: saveUserError },
    clearErrors,
    reset,
  } = useForm<any>();

  const {
    register: registerLeadType,
    control: leadTypeControl,
    handleSubmit: handleLeadTypeSubmit,
    reset: resetLeadType,
    setValue: setLeadTypeSettingValue,
  } = useForm({
    defaultValues: {
      lead_type_settings: [],
    },
  });

  const {
    fields,
    update: updateLeadTypeSettingValue,
    append,
    remove,
  } = useFieldArray({
    control: leadTypeControl,
    name: 'lead_type_settings',
  });

  const userState = useSelector((state: any) => state.user);

  const { data: allLeadTypes } = useLeadTypes();

  React.useEffect(() => {
    if (!user_id) {
      queryClient.invalidateQueries(['profile_tabs', selectedRole]);
      queryClient.invalidateQueries({
        predicate: function (query) {
          return query.queryKey[0] === 'user';
        },
      });

      setUserTabs(
        userTabs.map((tab, idx) => {
          if (idx > 0) {
            tab.disabled = true;
          }
          return tab;
        }),
      );
      setSelectedRole('');
      reset({
        first_name: '',
        middle_name: '',
        last_name: '',
        email: '',
        username: '',
        password: generatePassword({
          length: 10,
          includeLowerCase: true,
          includeUpperCase: false,
          includeNumber: false,
          includeSymbols: true,
        }),
        role: '',
        primary_phone: '',
        secondary_phone: '',
        address: '',
        city: '',
        zip: '',
        country: '',
        website: '',
        user_status: '',
        is_call_center: false,
        accept_returns: false,
        is_hide_all_leads_reports: false,
        is_io_received: false,
        vendor_lead_quality: '',
        lead_flow_status: false,
        is_allowed_by_ews: false,
        is_trusted_form_claim_enabled: false,
        payment_method: '',
        is_return_reminder_email: false,
        prepays: false,
        main_email_list: '',
        tech_email_list: '',
        returns_email_list: '',
      });
    }
  }, [user_id]);

  React.useEffect(() => {
    if (user && user._id) {
      setSelectedRole(user.role._id);
      reset({
        ...user,
        lead_flow_status: user.lead_flow_status === 'running' ? true : false,
      });
      resetLeadType({ lead_type_settings: user.lead_type_settings || [] });
      setUserTabs(
        userTabs.map((tab) => {
          tab.disabled = false;
          return tab;
        }),
      );
    }
  }, [user]);

  React.useEffect(() => {
    if (userState?.userRoles?.length > 0 && profileTabs?.length > 0) {
      const isVendorUser =
        filter(userState?.userRoles, (role) => {
          if (role.name === 'Vendor' && role._id === selectedRole) {
            return role;
          }
        }).length > 0
          ? true
          : false;

      if (isVendorUser) {
        setUserTabs([
          ...orderBy(profileTabs, 'index', 'asc').map((tab, idx) => ({
            label: tab.tab,
            disabled: user || idx <= 1 ? false : true,
          })),
          {
            label: 'Lead Type Information',
            disabled: user ? false : true,
          },
          {
            label: 'Manage SubIDs',
            disabled: user ? false : true,
          },
        ]);
      } else {
        setUserTabs([
          ...orderBy(profileTabs, 'index', 'asc').map((tab, idx) => ({
            label: tab.tab,
            disabled: false,
          })),
        ]);
      }
    }
  }, [selectedRole, userState?.userRoles, profileTabs]);

  React.useEffect(() => {
    if (saveUserStatus === 'success') {
      history(`/user/${user_id}`);
    }
  }, [saveUserStatus]);

  const onDeleteLeadTypeSetting = (index) => {
    remove(index);
    setLeadTypeSettingValue(`lead_type_settings.${index}`, undefined);
  };

  const onSave = (data) => {
    handleLeadTypeSubmit(async (leadTypeData) => {
      const uniqueLeadTypeData = uniqBy(
        leadTypeData.lead_type_settings,
        (obj) => obj.lead_type._id,
      );
      if (
        leadTypeData.lead_type_settings.length !== uniqueLeadTypeData.length
      ) {
        enqueueSnackbar(NOTIFICATION_MESSAGES.DUPLICATE_LEAD_TYPES_FOUND_MSG, {
          variant: NOTIFICATIONS.ERROR,
          preventDuplicate: true,
          autoHideDuration: 3000,
        });
        return;
      }

      let valueManageSubItems=manageSubIDs;
      for (const obj of valueManageSubItems) {
        delete obj.isSelected;
      }
      saveUser({
        ...data,
        _id: user_id,
        lead_flow_status: data.lead_flow_status === true ? 'running' : 'paused',
        role: selectedRole,
        lead_type_settings: filter(
          leadTypeData.lead_type_settings,
          (setting) => {
            if (setting?.status.length > 0) {
              return setting;
            }
          },
        ),
        vendor_subids: valueManageSubItems
      });
    })();
  };

  const onFetchTabsForRole = (ev) => {
    clearErrors();
    setTabValue(0);
    setSelectedRole(ev.role);
    if (!queryClient.getQueriesData(['profile_tabs', ev.role])) {
      queryClient.prefetchQuery(
        ['profile_tabs', ev.role],
        fetchProfileTabsForRole,
        {
          staleTime: 1000 * 60,
        },
      );
    }
  };

  const getFieldValidations = (setting) => {
    let validations = {};
    if (!setting.validators) {
      return validations;
    }
    if (setting.validators.indexOf('required') >= 0) {
      validations['required'] = `Please enter ${setting.display_name}`;
    }
    if (setting.validators.indexOf('email') >= 0) {
      validations['validate'] = {
        maxLength: (v) =>
          v.length <= 50 || 'The email should have at most 50 characters',
        matchPattern: (v) =>
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          'Email address must be a valid address',
      };
    }

    return validations;
  };

  const onAddNewLeadTypeInfo = () => {
    const defaultPaymentModel = filter(allSettings, {
      name: 'VENDOR_LEAD_TYPE_PAYMENT_MODEL',
    })[0];
    const defaultRevShare = filter(allSettings, {
      name: 'VENDOR_LEAD_TYPE_REV_SHARE_PERCENT',
    })[0];
    const defaultMaxPayoutCap = filter(allSettings, {
      name: 'VENDOR_MAX_LEAD_TYPE_PAYOUT_CAP',
    })[0];
    const defaultMinPayoutCap = filter(allSettings, {
      name: 'VENDOR_MIN_LEAD_TYPE_PAYOUT_CAP',
    })[0];
    const defaultDailyAcceptedCap = filter(allSettings, {
      name: 'VENDOR_LEAD_TYPE_DAILY_ACCEPTED_CAP',
    })[0];
    const defaultDailyAutoVerifyEmail = filter(allSettings, {
      name: 'VENDOR_LEAD_TYPE_DAILY_AUTO_VERIFY_EMAIL',
    })[0];
    const defaultMinPingsCap = filter(allSettings, {
      name: 'VENDOR_LEAD_TYPE_MIN_PINGS_CAP',
    })[0];
    const defaultMaxPingsTime = filter(allSettings, {
      name: 'VENDOR_LEAD_TYPE_MAX_PING_TIME',
    })[0];
    const defaultMaxPostTime = filter(allSettings, {
      name: 'VENDOR_LEAD_TYPE_MAX_POST_TIME',
    })[0];
    append({
      lead_type: '',
      status: '',
      lead_flow_status: '',
      payment_model: defaultPaymentModel.value,
      rev_share: defaultRevShare.value,
      vendor_min_payout_cap: defaultMinPayoutCap.value,
      vendor_max_payout_cap: defaultMaxPayoutCap.value,
      tcpa_text: '',
      is_tcpa_text_active: false,
      daily_accepted_cap: defaultDailyAcceptedCap.value,
      is_daily_auto_verify_email: defaultDailyAutoVerifyEmail.value,
      is_bla_dnc_active: false,
      is_litigator_active: false,
      is_the_blacklist_tcpa_litigator_active: false,
      min_pings_cap: defaultMinPingsCap.value,
      max_pings_per_min_cap: '',
      max_ping_time: defaultMaxPingsTime.value,
      max_post_time: defaultMaxPostTime.value,
      is_enable_auto_resubmit: false,
    });
  };

  const onChange = (key, value, index, item) => {
    updateLeadTypeSettingValue(index, {
      ...item,
      key: value,
    });
    setLeadTypeSettingValue(`lead_type_settings.${index}.${key}`, value);
  };

  const onChangeManageSubIds=(data)=> {
setManageSubIDs(data);
  }

  const allRoles = userState?.userRoles?.map((role) => ({
    label: role.name,
    value: role._id,
  }));

  return (
    <Paper elevation={0} sx={{ p: 3 }}>
      <Grid container>
        {!user_id && (
          <Stack flexDirection="row" justifyContent="space-between">
            <Typography
              variant="subtitle1"
              sx={{ color: 'text.primary' }}
              display="inline"
            >
              Select User Type:
            </Typography>
            <Controller
              name="role"
              control={roleControl}
              rules={{ required: 'Please select a user type.' }}
              render={({ field: { onChange, value, ref } }) => (
                <TextField
                  select
                  sx={{ width: 200, mx: 2 }}
                  size="small"
                  inputRef={ref}
                  value={value || ''}
                  error={!!roleErrors?.role}
                  helperText={roleErrors?.role?.message}
                  onChange={(ev) => onChange(ev)}
                >
                  {allRoles?.map((option: any) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  )) || <div />}
                </TextField>
              )}
            />
            <Button
              sx={{
                height: 35,
                width: 200,
                marginLeft: 'auto',
                display: 'flex',
              }}
              onClick={handleRoleSubmit(onFetchTabsForRole)}
              variant="outlined"
            >
              Get Started
            </Button>
          </Stack>
        )}
        {profileTabs?.length > 0 && (
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
                  <Tabs
                    value={tabValue}
                    tabs={userTabs}
                    setValue={setTabValue}
                  />
                </Stack>
              </Stack>
              <Divider />
            </Grid>
            {orderBy(profileTabs, ['index', 'asc']).map((profileTab, idx) => {
              return (
                <CustomTabPanel value={tabValue} index={idx}>
                  {profileTab && (
                    <Grid container mt={1}>
                      {profileTab.settings.map((settingObj, idx) => {
                        const validations = getFieldValidations(
                          settingObj.setting,
                        );
                        return (
                          <ProfileTabManager
                            key={idx}
                            controlType={settingObj?.setting?.datatype}
                            settingOptions={settingObj?.setting?.options}
                            settingDisplayName={
                              settingObj?.setting?.display_name
                            }
                            control={control}
                            validations={validations}
                            errors={saveUserError}
                            settingName={settingObj?.setting?.name}
                          />
                        );
                      })}
                    </Grid>
                  )}
                </CustomTabPanel>
              );
            })}
            {tabValue === profileTabs.length && (
              <LeadTypeInfoTab
                fields={fields}
                setValue={onChange}
                register={registerLeadType}
                errors={saveUserError}
                allLeadTypes={allLeadTypes}
                onAddNewLeadTypeInfo={() => onAddNewLeadTypeInfo()}
                onDeleteLeadTypeSetting={(id) => onDeleteLeadTypeSetting(id)}
              />
            )}
           {tabValue === 3 && (
              <ManageSubIDs setValue={onChangeManageSubIds}/>
            )}

          </Grid>
        )}
      </Grid>
    </Paper>
  );
};

export default User;
