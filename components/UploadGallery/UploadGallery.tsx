import "./UploadGallery.css";
import { Add } from "@mui/icons-material";
import { Button, CircularProgress } from "@mui/material";
import UploadImage from "./UploadImage";
import { ChangeEvent, useRef, useState } from "react";
import { enqueueSnackbar } from "notistack";

export default function UploadGallery({
  disabled = false,
  label = "Images",
  max = 8,
  tileSize = 60,
  onFileListChange,
}: {
  disabled?: boolean;
  label?: string;
  max?: number;
  tileSize?: number;
  onFileListChange?: (fileURLs: string[]) => void;
}) {
  const inputImageFile = useRef<HTMLInputElement>(null);
  const [waitForUpload, setWaitForUpload] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);

  const updateFileList = (imageList: string[]) => {
    if (onFileListChange)
      onFileListChange(imageList.map((image: string) => image));
  };

  const handleAddButtonClick = () => {
    if (inputImageFile.current) {
      inputImageFile.current.click();
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files) {
      let fileArray = Array.from(files);

      if (fileArray.length + uploadedImages.length > max) {
        fileArray = fileArray.slice(0, max - uploadedImages.length);

        enqueueSnackbar(
          "Maximum number of images " +
            (fileArray.length == 0 ? "exceeded" : "reached")
        );
        return;
      }

      const newImage = fileArray[fileArray.length - 1];
      const formdata = new FormData();
      formdata.append("userpic", newImage, newImage.name);
      setWaitForUpload(true);
      fetch("/api/issue/addimage", {
        method: "post",
        body: formdata,
      })
        .then((res) => res.json())
        .then((json) => {
          if (!json.includes("photoUrl")) {
            throw new Error("Did not get an image URL.");
          }
          const { photoUrl } = json;
          updateFileList([...uploadedImages, photoUrl]);
          setUploadedImages((prevImages) => [...prevImages, photoUrl]);
          setWaitForUpload(false);
        })
        .catch((err) => {
          setWaitForUpload(false);
          enqueueSnackbar("Failed to upload image(s).");
          console.log(err);
        });
    }
  };

  const handleDeleteButtonClick = (index: number) => {
    updateFileList(uploadedImages.filter((_, i) => i !== index));
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
              imageUrl={image}
              loading={false}
              tileSize={tileSize}
              onDelete={() => handleDeleteButtonClick(index)}
            />
          ))}
          <Button
            className="upload-button"
            variant="outlined"
            disabled={disabled || waitForUpload || uploadedImages.length == max}
            onClick={handleAddButtonClick}
          >
            {waitForUpload ? <CircularProgress size={"20px"} /> : <Add />}
          </Button>
          <input
            type="file"
            accept="image/*"
            ref={inputImageFile}
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
        </div>
      </div>
    </>
  );
}
