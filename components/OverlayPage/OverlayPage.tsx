"use client";
import { IconButton } from "@mui/material";
import "./OverlayPage.css";
import { Close } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { useState } from "react";

function OverlayPage({
  animate = true,
  children,
  className = "",
  closeButton = true,
  fullHeight = false,
  minimized = false,
}: {
  animate?: boolean;
  children: React.ReactNode;
  className?: string;
  closeButton?: boolean;
  fullHeight?: boolean;
  minimized?: boolean;
}) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(() => {
      router.replace("/map");
    }, 350);
  };

  return (
    <div
      className={
        className +
        " overlay-page " +
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
