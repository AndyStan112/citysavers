import "./UploadGallery.css";
import { Add } from "@mui/icons-material";
import { Button, Snackbar } from "@mui/material";
import UploadImage from "./UploadImage";
import { ChangeEvent, useRef, useState } from "react";
import { enqueueSnackbar } from "notistack";

interface UploadedImage {
  file: File;
  imageUrl: string;
}

export default function UploadGallery({
  disabled = false,
  label = "Images",
  max = 8,
  tileSize = 60,
}: {
  disabled?: boolean;
  label?: string;
  max?: number;
  tileSize?: number;
}) {
  const inputImageFile = useRef<HTMLInputElement>(null);
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);

  const handleAddButtonClick = () => {
    if (inputImageFile.current) {
      inputImageFile.current.click();
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files) {
      let fileArray = Array.from(files);

      console.log(fileArray.length);
      if (fileArray.length + uploadedImages.length > max) {
        fileArray = fileArray.slice(0, max - uploadedImages.length);

        enqueueSnackbar(
          "Maximum number of images " +
            (fileArray.length == 0 ? "exceeded" : "reached")
        );
      }

      const newImages: UploadedImage[] = fileArray.map((file) => ({
        file,
        imageUrl: URL.createObjectURL(file),
      }));

      setUploadedImages((prevImages) => [...prevImages, ...newImages]);
    }
  };

  const handleDeleteButtonClick = (index: number) => {
    setUploadedImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  return (
    <>
      <div className="upload-gallery-wrap">
        <div className="upload-gallery-label">
          {label}:&nbsp;
          {uploadedImages.length} / {max}
        </div>
        <div className="upload-gallery">
          {uploadedImages.map((image, index) => (
            <UploadImage
              key={index}
              imageUrl={image.imageUrl}
              loading={false}
              tileSize={tileSize}
              onDelete={() => handleDeleteButtonClick(index)}
            />
          ))}
          <Button
            className="upload-button"
            color="secondary"
            variant="outlined"
            disabled={disabled || uploadedImages.length == max}
            onClick={handleAddButtonClick}
          >
            <Add />
          </Button>
          <input
            type="file"
            accept="image/*"
            ref={inputImageFile}
            onChange={handleFileChange}
            style={{ display: "none" }}
            multiple
          />
        </div>
      </div>
    </>
  );
}
