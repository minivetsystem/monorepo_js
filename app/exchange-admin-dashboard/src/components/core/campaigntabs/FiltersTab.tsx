import React, { FC, ReactElement, useState } from 'react';
import { Button, Grid, TextField, Typography, Box, FormControl, Select, MenuItem } from '@mui/material';
import { DropResult } from 'react-beautiful-dnd';
import DraggableList  from "./DraggableList";
import { HighlightOff } from '@mui/icons-material';

interface IProps {
  label?: string;
}

export const CampaignFiltersTab: FC<IProps> = (): ReactElement => {

  const [items, setItems] = React.useState([{id: 1, primary: "Accepted project", status: true}]);
  const [counter, setCounter] = React.useState(2);
  const [itemVal, setItemVal] = React.useState("");

  const onDragEnd = ({ destination, source }: DropResult) => {
    // dropped outside the list
    if (!destination) return;
  };

  const handleAddItem = () => {
    if (itemVal != "") {
      const newItem = [...items, {id: (counter+1), primary: itemVal, status: true}];

      setItems(newItem);
      setCounter(counter + 1);
      setItemVal("");
    }
  }

  const handleChangeItem = (e:any) => {
    setItemVal(e.target.value);
  }

  return (
    <Grid container>
      <Grid xs={4} sx={{ pr: 4 }}>
        <Typography sx={{ fontSize: "1rem", color: "rgba(0, 0, 0, 0.38)" }}>
          <span style={{ fontWeight: "600", paddingRight: "8px", color: "#27272A", lineHeight: "2.5rem" }}>Post Name:</span>
          1800Remodel_HI_PP_Insulation
        </Typography>

        <Typography sx={{ fontSize: "1rem", color: "rgba(0, 0, 0, 0.38)", lineHeight: "2.5rem" }}>
          <span style={{ fontWeight: "600", paddingRight: "8px", color: "#27272A" }}>Filter Sets:</span>
        </Typography>

        <Typography sx={{ fontSize: "14px", color: "rgba(0, 0, 0, 0.38)", mb: 2 }}>(Please drag and drop to change the filter set order.)</Typography>

        <DraggableList items={items} onDragEnd={onDragEnd} setItems={setItems}/>

        <div style={{ marginTop: "20px" }}>
          <TextField
            label="Enter Filter Set"
            size="small"
            value={itemVal}
            onChange={handleChangeItem}
          />

          <Button variant="contained" sx={{ height: "34px", ml: 1 }} onClick={() => handleAddItem()}>Add</Button>
        </div>
      </Grid>

      <Grid xs={7}>
        <Typography sx={{ fontSize: "1rem", color: "rgba(0, 0, 0, 0.38)" }}>
          <span style={{ fontWeight: "600", paddingRight: "8px", color: "#27272A", lineHeight: "2.5rem" }}>Filter Set:</span>
        </Typography>

        <Grid xs={5}>
          <TextField size="small"/>
        </Grid>

        <Box sx={{  marginTop:4 }}>
          <Grid xs={12} sx={{ mb: 1 }}>
            <TextField label="Field" size="small" sx={{ mr:1 }}/>
            <TextField label="Operator" size="small" sx={{ mr:1 }}/>
            <TextField label="Value" size="small" sx={{ mr:1 }}/>
            <HighlightOff sx={{ color: "#ff0000", fontSize: "18px", cursor: "pointer", marginTop: "7px" }}/>
          </Grid>

          <Grid xs={12}>
            <Button variant="contained" sx={{ height: "34px", m: "1rem 0" }}>Click here to add a row</Button>
          </Grid>

          <Grid xs={2}>
            <Typography sx={{ fontSize: "1rem", color: "rgba(0, 0, 0, 0.38)", lineHeight: "2.5rem" }}>
              <span style={{ fontWeight: "600", paddingRight: "8px", color: "#27272A" }}>THEN</span>
            </Typography>
          </Grid>

          <Grid xs={4}>
          <FormControl fullWidth>
            <Select value="1">
              <MenuItem value="1">ACCEPT</MenuItem>
              <MenuItem value="2">REJECT</MenuItem>
            </Select>
          </FormControl>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
};
