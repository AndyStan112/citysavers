/* eslint-disable @next/next/no-img-element */
"use client";
import { Close } from "@mui/icons-material";
import { IconButton, Modal } from "@mui/material";
import { useState } from "react";

export default function GalleryImage({
  key,
  image = "",
  tileHeight = 100,
}: {
  key?: any;
  image?: string;
  tileHeight?: number;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Modal open={open} onClose={() => setOpen(false)}>
        <>
          <IconButton
            className="gallery-full-screen-close"
            onClick={() => setOpen(false)}
          >
            <Close />
          </IconButton>
          <div className="gallery-full-screen">
            <img
              className="gallery-full-screen-image"
              src={image}
              alt="Gallery image"
            />
          </div>
        </>
      </Modal>
      <div
        key={key}
        tabIndex={0}
        className="gallery-image"
        onClick={() => setOpen(true)}
      >
        <img
          className="gallery-image-object"
          src={image}
          alt="Gallery image"
          height={tileHeight}
        />
      </div>
    </>
  );
}
