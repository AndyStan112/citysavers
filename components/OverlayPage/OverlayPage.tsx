"use client";
import { IconButton } from "@mui/material";
import "./OverlayPage.css";
import { Close } from "@mui/icons-material";
import { useRouter } from "next/navigation";

function OverlayPage({
  animate = true,
  closeButton = true,
  fullHeight = false,
  children,
}: {
  animate?: boolean;
  closeButton?: boolean;
  fullHeight?: boolean;
  children: React.ReactNode;
}) {
  const router = useRouter();

  return (
    <div
      className={
        "overlay-page " +
        (animate ? "animate " : "") +
        (fullHeight ? "full-height" : "")
      }
    >
      {closeButton && (
        <IconButton
          aria-label="close"
          className="overlay-page-close-btn"
          size="small"
          onClick={() => {
            router.back();
          }}
        >
          <Close />
        </IconButton>
      )}
      {children}
    </div>
  );
}

export default OverlayPage;
