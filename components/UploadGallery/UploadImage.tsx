import { Close } from "@mui/icons-material";
import { CircularProgress, IconButton } from "@mui/material";
import Image from "next/image";

export default function UploadImage({
  imageUrl = "",
  loading = false,
  tileSize = 60,
  onDelete,
}: {
  imageUrl?: string;
  loading?: boolean;
  tileSize?: number;
  onDelete: () => void;
}) {
  return (
    <div className={"upload-image " + (loading ? "loading" : "")}>
      {loading ? (
        <CircularProgress color="secondary" size="20px" />
      ) : (
        <>
          <Image
            className="image-preview"
            src={imageUrl}
            alt="Uploaded image"
            width={tileSize}
            height={tileSize}
          />
          <IconButton className="delete-button" size="small" onClick={onDelete}>
            <Close />
          </IconButton>
        </>
      )}
    </div>
  );
}
