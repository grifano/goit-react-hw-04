import ImageCard from "../ImageCard/ImageCard";
import css from "./ImageGallery.module.css";

export default function ImageGallery({ images }) {
  return (
    <ul className={css.imageGalleryList}>
      {images.map((image) => {
        return (
          <ImageCard
            key={image.id}
            imageThumbSrc={image.urls.small}
            imageFullSrc={image.urls.regular}
            altText={image.alt_description}
          />
        );
      })}
    </ul>
  );
}
