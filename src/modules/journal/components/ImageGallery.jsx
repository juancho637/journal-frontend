import { ImageListItem, ImageList } from "@mui/material";

export const ImageGallery = ({ images = [] }) => {
  return (
    <ImageList sx={{ width: "100%", height: 500 }} cols={4} rowHeight={200}>
      {images.map((image) => (
        <ImageListItem key={image}>
          <img
            src={`${image}`}
            srcSet={`${image}`}
            alt={"imagen de la nota"}
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
};
