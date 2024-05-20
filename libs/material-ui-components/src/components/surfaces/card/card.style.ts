import { styled } from '@mui/material/styles';
import { Card, CardContent, CardActions, Box } from '@mui/material';

export const CardCotainer = styled(Card)`
  border: none;
  box-shadow: none;
  margin-bottom: 10px;
  max-width: 380px;
  @media screen and (max-width: 1220px) {
    margin: 0 auto;
    max-width: 300px;
  }
`;

export const CardContentSection = styled(CardContent)`
  padding: 24px 48px;
  p {
    line-height: 26px;
    letter-spacing: 0.02em;
  }
`;

export const CardActionSection = styled(CardActions)`
  padding: 0px 48px;
  cursor: pointer;
  button {
    font-weight: 700;
    font-size: 16px;
    line-height: 18px;
    letter-spacing: 0.02em;
    margin-right: 13px;
    padding: 0px;
  }
`;

export const ImageContainer = styled(Box)`
  @media screen and (max-width: 1220px) {
    img {
      width: 300px;
    }
  }
`;
