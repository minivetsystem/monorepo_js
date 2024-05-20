import React, { FC, ReactElement, useEffect, useState } from 'react';
import { Grid, Button, Divider , List, Card, CardHeader, ListItem, ListItemText } from '@mui/material';
import {KeyboardArrowLeft, KeyboardArrowRight} from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';

export const Transferlist: FC<Props> = (props): ReactElement => {

  const { stateData } = useSelector((state: any) => state.transferlist)
  const [leftItems, setLeftItems]   = useState(stateData.filter((item:any) => !item.is_blocked));
  const [rightItems, setRightItems] = useState(stateData.filter((item:any) => item.is_blocked));

  const dispatch = useDispatch();

  const handleMoveToRight = () => {
    let selectedItems = leftItems.filter((item:any) => item.isSelected);
    selectedItems = selectedItems.map((obj:any) => ({ ...obj, isSelected: false }));
    selectedItems = selectedItems.map((item:any) => {
      return {
          ...item,
          is_blocked: true
      };
    });

    setRightItems((prevState:any) => [...prevState, ...selectedItems]);
    setLeftItems((prevState:any) => prevState.filter((item:any) => !item.isSelected));
  };

  useEffect(()=>{
    dispatch.transferlist. addToDataList([...leftItems, ...rightItems]);
    props.setValue([...leftItems, ...rightItems]);
  }, [leftItems, rightItems]);

  const handleMoveToLeft = () => {
    let selectedItems = rightItems.filter((item:any) => item.isSelected);
    selectedItems = selectedItems.map((obj:any) => ({ ...obj, isSelected: false }));

    selectedItems = selectedItems.map((item:any) => {
      return {
          ...item,
          is_blocked: false
      };
    });

    setLeftItems((prevState:any) => [...prevState, ...selectedItems]);
    setRightItems((prevState:any) => prevState.filter((item:any) => !item.isSelected));
  };

  const handleToggle = (item: Item, list: 'left' | 'right') => {
    const updatedItems = list === 'left' ? [...leftItems] : [...rightItems];
    const selectedItem = updatedItems.find(i => i._id === item._id);
    if (selectedItem) {
      selectedItem.isSelected = !selectedItem.isSelected;
      list === 'left' ? setLeftItems(updatedItems) : setRightItems(updatedItems);
    }
  };

  const customList = (title: React.ReactNode, items: readonly number[], position:any) => {
    return (
    <Card>
      <CardHeader
        sx={{ px: 2, py: 1, fontFamily: 'Work Sans', fontWeight: "600", fontSize: '14px' }}
        title={title}
      />
      <Divider />
      <List
        sx={{
          width: "100%",
          height: 230,
          bgcolor: 'background.paper',
          overflow: 'auto',
        }}
        dense
        component="div"
        role="list"
      >
        {items.map((item:any) => {
          return (
            <ListItem
              className='transferlist'
              key={item._id}
              role="listitem"
              button
              onClick={() => handleToggle(item, position)}
              selected={item.isSelected}
            >
              <ListItemText primary={item.sub_id} primaryTypographyProps={{fontSize: '14px'}}/>
            </ListItem>
          );
        })}
      </List>
    </Card>
  )};

  return (
    <>
      <Grid item xs={4}>{customList('Allowed List', leftItems, 'left')}</Grid>
      <Grid item xs={1}>
        <Grid container direction="column" alignItems="center">
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            aria-label="move selected right"
            onClick={handleMoveToRight}
            disabled={leftItems.filter((item:any) => item.isSelected).length === 0}
          >
           <KeyboardArrowRight/>
          </Button>
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            aria-label="move selected left"
            onClick={handleMoveToLeft}
            disabled={rightItems.filter((item:any) => item.isSelected).length === 0}
          >
            <KeyboardArrowLeft/>
          </Button>
        </Grid>
      </Grid>
      <Grid item xs={4}>{customList('Blocked List', rightItems, 'right')}</Grid>
    </>
  );
};
