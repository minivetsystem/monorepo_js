import React from 'react';
import { DragDropContext, Droppable, OnDragEndResponder, Draggable } from 'react-beautiful-dnd';
import { Done, WarningAmber, Close } from '@mui/icons-material';
import {ListItem, ListItemText, Tooltip } from '@mui/material';

export type Item = {
  id: string;
  primary: string;
  status: boolean;
};

export type DraggableListProps = {
  items: Item[];
  onDragEnd: OnDragEndResponder;
};

const DraggableList = React.memo(({ items, onDragEnd, setItems }: DraggableListProps) => {

  const handleDoneStatus = (id:any) => {
    const updatedArr = items.map((item:any) => {
      if (item.id === id) {

        return  { ...item, status: item.status ? false : true };
      }
      return item;
    });
    setItems(updatedArr);
  };

  const handleRemoveItem = (idToRemove:any) => {
    const updatedArr = items.filter(item => item.id !== idToRemove);
    setItems(updatedArr);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable-list">
        {(provided:any) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {items.map((item, index) => (
              <Draggable draggableId={item.id} key={item.id} index={index}>
                {(provided:any) => (
                  <ListItem
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    sx={{ background: "#f3e8ff", mb: 1 }}
                  >
                    <Tooltip title="Active/Inactive Filter set" onClick={()=>handleDoneStatus(item.id)}>
                      {item.status  ? <Done sx={{ cursor: "pointer", color: "#008000" }}/> : <Close sx={{ cursor: "pointer", color: "#ff0000" }}/> }
                    </Tooltip>

                    <span style={{ display: "inline-block", verticalAlign: "top", margin: "0 8px" }}>|</span>

                    <ListItemText primary={ item.primary} />
                      <Tooltip title="No Conditions set">
                        <WarningAmber sx={{ color: "#ff0000" }}/>
                      </Tooltip>
                      <span style={{ display: "inline-block", verticalAlign: "super", margin: "0 8px", color: "#000" }}>|</span>
                      <Tooltip onClick={()=>handleRemoveItem(item.id)} title="Delete Filter Set">
                        <Close sx={{ display: "inline-block", verticalAlign: "super", color: "#ff0000", fontSize: "18px", cursor: "pointer" }} />
                      </Tooltip>
                  </ListItem>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
});

export default DraggableList;
