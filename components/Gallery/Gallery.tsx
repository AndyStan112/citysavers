import "./Gallery.css";
import Image from "next/image";
import GalleryImage from "./GalleryImage";

export default function Gallery({
  imageList,
  tileHeight = 200,
}: {
  imageList?: string[];
  tileHeight?: number;
}) {
  return (
    <div className="gallery-wrap">
      <div className="gallery-overflow-left"></div>
      <div className="gallery-list">
        {imageList?.map((image, index) => (
          <GalleryImage key={index} image={image} tileHeight={tileHeight} />
        ))}
      </div>
      <div className="gallery-overflow-right"></div>
    </div>
  );
}
