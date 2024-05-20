import React, { FC, ReactElement } from 'react';
import { Box, Typography } from '@mui/material';
import { ThemesWrapper, Title } from './themeList.style';
import { IThemeListProps } from './themeList.interface';

export const ThemeList: FC<IThemeListProps> = (props): ReactElement => {
  const { categories, onClick, selectedCategory } = props;
  return (
    <Box>
      <Typography variant="h3">Choose Catagory</Typography>
      <ThemesWrapper
        display="flex"
        flexWrap="wrap"
        columnGap="18px"
        rowGap="18px"
        sx={{ mt: '20px' }}
      >
        {categories?.map((item, index) => (
          <Box
            position="relative"
            key={index}
            sx={{
              cursor: 'pointer',
            }}
            onClick={() => onClick(item._id)}
          >
            <img
              src={`/images/Theme${index + 1}.png`}
              alt=""
              style={{
                maxWidth: selectedCategory === item._id ? 200 : 210,
                border:
                  selectedCategory === item._id ? '6px solid #4F51FD' : 'none',
                borderRadius: selectedCategory === item._id ? '14px' : '0px',
              }}
            />
            <Title
              variant={selectedCategory === item._id ? 'h5' : 'subtitle2'}
              color={'background.paper'}
            >
              {item.category_name}
            </Title>
          </Box>
        ))}
      </ThemesWrapper>
    </Box>
  );
};
