import { styled } from '@mui/material/styles';

export const ContainerStyle = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    height: "calc(100% - 100px)",
    background: '#fff',
    paddingBottom:"2rem"
});

export const GridContainerStyle = styled('div')({
    paddingRight: '0.5rem',
});

export const HeaderStyle = styled('div')({
    flex: '0 0 auto',
});

export const FooterStyle = styled('div')({
    flex: '0 0 auto',
});

export const ContentContainerStyle = styled('div')({
    display: 'flex',
    marginTop: '-1rem'
});

export const FixedLayoutStyle = styled('div')({
    flex: '0 0 auto',
    overflow: 'auto',
    marginLeft:'0.2rem'
});

export const ScrollLayoutStyle = styled('div')({
    overflow: 'auto',
    overflowY: 'hidden',
    overflowX: 'auto',
    display: 'flex',
    marginRight: '0.2rem'
});

