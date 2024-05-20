import React, { FC, ReactElement, useEffect, useState } from 'react';
import {
  Paper,
  Grid,
  Stack,
  FormControl,
  Box,
  Button,
  Typography,
  FormHelperText,
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import {
  DateInput,
  FileUpload,
  ListSelect,
} from '@monorepo/material-ui-components';
import moment from 'moment';
import { drop } from 'lodash';
import { useLeadTypes, useProcessReturns, useUsersByRole } from '../../hooks';
import { useSelector } from 'react-redux';

const ImportReturns: FC = (): ReactElement => {
  const state = useSelector((state: any) => state.user);
  const [returnLeads, setReturnLeads] = useState<any>([]);
  const [showResults, setShowResults] = useState(false);
  const {
    handleSubmit,
    control,
    formState: { errors: uploadReturnsFileError },
  } = useForm<any>({
    defaultValues: {
      from_date: moment().subtract(1, 'month').startOf('month'),
      to_date: moment().subtract(1, 'month').endOf('month'),
    },
  });

  const {
    mutate: processReturns,
    data: saveProcessReturns,
    status: processReturnsStatus,
  } = useProcessReturns();

  const { data: allLeadTypes } = useLeadTypes();

  const { data: allClients } = useUsersByRole({
    roleName: 'client',
    includeDisabled: false,
  });

  const handleFileUpload = async (file: any) => {
    const fileUrl = URL.createObjectURL(file);

    // 2. use fetch API to read the file
    const response = await fetch(fileUrl);

    // 3. get the text from the response
    const text = await response.text();

    // 4. split the text by newline
    const lines = text.split('\n');

    // 5. map through all the lines and split each line by comma.
    const _data = lines.map((line) => line.split(','));

    if (!_data.length) {
      throw new Error('Invalid client returns file.');
    }

    if (_data[0][0] !== 'email') {
      throw new Error(
        'Invalid client returns file. First row should be the column heading.',
      );
    }

    const finalData = drop(_data, 1).map((lead, idx) => {
      return {
        email: lead[0],
        return_code: parseInt(lead[1]),
        return_comments: lead[2],
      };
    });

    setReturnLeads(finalData);
  };

  const onSave = (data: any) => {
    const returnsDataObj = {
      ...data,
      returnsData: returnLeads,
      added_by: state.user?._id,
    };
    processReturns(returnsDataObj);
  };

  useEffect(() => {
    if (processReturnsStatus === 'success') {
      setShowResults(true);
    }
  }, [processReturnsStatus]);

  const onDownloadSampleCSV = () => {
    const csvUrl = '/assets/downloads/AutoIns_Return_0804.csv';
    const link = document.createElement('a');
    link.href = csvUrl;
    link.download = csvUrl; // specify the filename
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const onGoBack = () => {
    setShowResults(false);
  };

  return (
    <Paper elevation={0} sx={{ p: 3 }}>
      <Grid container>
        <Grid item xs={12}>
          <Box sx={{ textAlign: 'right' }}>
            {!showResults && (
              <Button
                sx={{
                  height: 48,
                  width: 200,
                  marginRight: '10px',
                  marginLeft: 'auto',
                  display: 'inline-flex',
                }}
                variant="outlined"
                onClick={() => onDownloadSampleCSV()}
              >
                Sample CSV File
              </Button>
            )}
            {!showResults && (
              <Button
                sx={{
                  height: 48,
                  width: 97,
                  marginLeft: 'auto',
                  display: 'inline-flex',
                }}
                disabled={returnLeads?.length === 0}
                variant="outlined"
                onClick={handleSubmit(onSave)}
              >
                Upload
              </Button>
            )}
            {showResults && (
              <Button
                sx={{
                  height: 48,
                  width: 97,
                  marginLeft: 'auto',
                  display: 'inline-flex',
                }}
                variant="outlined"
                onClick={() => onGoBack()}
              >
                Back
              </Button>
            )}
          </Box>

          {!showResults && (
            <Stack
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Stack gap={1} m={1}>
                <Box display="flex" gap={1}>
                  <FormControl size="small">
                    <Controller
                      name="from_date"
                      control={control}
                      rules={{
                        required: 'From date is required.',
                      }}
                      render={({ field: { onChange, value, ref } }) => (
                        <DateInput
                          label="From Date"
                          onChange={(e) => onChange(e)}
                          borderStyle={{
                            fieldset: { border: '1px solid #BABABA' },
                          }}
                          error={!!uploadReturnsFileError.from_date}
                          inputRef={ref}
                          minDate={moment()
                            .subtract(1, 'month')
                            .startOf('month')}
                          value={
                            value ||
                            moment().subtract(1, 'month').startOf('month')
                          }
                        />
                      )}
                    />
                    {uploadReturnsFileError.from_date?.message && (
                      <FormHelperText error>
                        {uploadReturnsFileError.from_date?.message}
                      </FormHelperText>
                    )}
                  </FormControl>
                  <FormControl size="small">
                    <Controller
                      name="to_date"
                      control={control}
                      rules={{
                        required: 'To date is required.',
                      }}
                      render={({ field: { onChange, value, ref } }) => (
                        <DateInput
                          label="To Date"
                          onChange={(e) => onChange(e)}
                          borderStyle={{
                            fieldset: { border: '1px solid #BABABA' },
                          }}
                          error={!!uploadReturnsFileError.to_date}
                          minDate={moment()
                            .subtract(1, 'month')
                            .startOf('month')}
                          inputRef={ref}
                          value={
                            value ||
                            moment().subtract(1, 'month').endOf('month')
                          }
                        />
                      )}
                    />
                    {uploadReturnsFileError.to_date?.message && (
                      <FormHelperText error>
                        {uploadReturnsFileError.to_date?.message}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Box>
                <FormControl size="small">
                  <Controller
                    name="lead_type_id"
                    control={control}
                    rules={{
                      required: 'Lead type is required.',
                    }}
                    render={({ field: { onChange, value, ref } }) => {
                      const leadTypeData = allLeadTypes
                        ? allLeadTypes.map((data) => ({
                            value: data._id,
                            name: data.lead_type,
                          }))
                        : [];

                      return (
                        <ListSelect
                          label="Lead Type:"
                          size="small"
                          inputRef={ref}
                          value={value}
                          error={uploadReturnsFileError.lead_type_id}
                          setValue={(ev) => onChange(ev)}
                          options={leadTypeData}
                        />
                      );
                    }}
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
                      const userData = allClients
                        ? allClients.map((data: any) => ({
                            value: data._id,
                            name: `${data.first_name} ${data.last_name}`,
                          }))
                        : [];
                      return (
                        <ListSelect
                          label="Client:"
                          size="small"
                          inputRef={ref}
                          value={value || ''}
                          error={uploadReturnsFileError.client_id}
                          setValue={(ev) => onChange(ev)}
                          options={userData}
                        />
                      );
                    }}
                  />
                </FormControl>
                <Typography variant="subtitle1">
                  Total <b>{returnLeads.length}</b> records selected!
                </Typography>
                <FileUpload setFiles={handleFileUpload} isMultiple={false} />
              </Stack>
            </Stack>
          )}
          {showResults && (
            <Grid container>
              <Grid item xs={12}>
                <b>
                  Total {saveProcessReturns?.returnsAdded?.length} leads were
                  found!
                </b>
                <br />
                <br />
                {saveProcessReturns?.leadsNotFound?.length > 0 ? (
                  <div>
                    <b>Following email ids were not found:</b>
                    <br />
                    {saveProcessReturns?.leadsNotFound.map((email, idx) => {
                      return (
                        <Typography key={idx} variant="subtitle2">
                          {email}
                        </Typography>
                      );
                    })}
                  </div>
                ) : (
                  <b>No mismatch leads found!</b>
                )}
              </Grid>
            </Grid>
          )}
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ImportReturns;
