"use client";
import { IconButton } from "@mui/material";
import "./OverlayPage.css";
import { Close } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { useState } from "react";

function OverlayPage({
  animate = true,
  closeButton = true,
  children,
  fullHeight = false,
  minimized = false,
}: {
  animate?: boolean;
  closeButton?: boolean;
  children: React.ReactNode;
  fullHeight?: boolean;
  minimized?: boolean;
}) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(() => {
      router.back();
    }, 350);
  };

  return (
    <div
      className={
        "overlay-page " +
        (isOpen ? "" : "closed ") +
        (animate ? "animate " : "") +
        (minimized ? "minimized " : "") +
        (fullHeight ? "full-height" : "")
      }
    >
      {closeButton && (
        <IconButton
          aria-label="close"
          className="overlay-page-close-btn"
          size="small"
          onClick={handleClose}
        >
          <Close />
        </IconButton>
      )}
      {children}
    </div>
  );
}

export default OverlayPage;
