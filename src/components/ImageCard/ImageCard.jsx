import css from "./ImageCard.module.css";

export default function ImageCard({ imageThumbSrc, imageFullSrc, altText }) {
  return (
    <li>
      <img className={css.imageCardImage} src={imageThumbSrc} alt={altText} />
      {/* <img src={imageFullSrc} alt={altText} /> */}
    </li>
  );
}
