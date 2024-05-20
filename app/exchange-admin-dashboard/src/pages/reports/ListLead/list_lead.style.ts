import { styled } from '@mui/material/styles';

export const ContainerStyle = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    height: "calc(100% - 100px)",
    background: '#fff'
});

export const HeaderContainerStyle = styled('div')({
  width: "100%",
});

export const LeftHeaderStyle = styled('div')({
  width: "50%",
  float: "left"
});

export const RightHeaderStyle = styled('div')({
  width: "50%",
  float: "left"
});

export const ContentContainerStyle = styled('div')({
  display: 'flex',
});

export const ScrollLayoutStyle = styled('div')({
  overflow: 'auto',
  overflowY: 'hidden',
  overflowX: 'auto',
  display: 'flex',
  marginRight: '0.2rem'
});

