import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';

export default function TitlebarBelowImageList(props) {
  
  return (
    <ImageList sx={{ width: 500, height: 450 }}>
      {props.map((prop) => (
        <ImageListItem key={prop.id}>
          <img
            src={`${prop.image_url}?w=248&fit=crop&auto=format`}
            srcSet={`${prop.image_url}?w=248&fit=crop&auto=format&dpr=2 2x`}
            alt={prop.home_name}
            loading="lazy"
          />
          <ImageListItemBar
            title={prop.home_name}
            subtitle={<span>by: {prop.home_type}</span>}
            position="below"
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}