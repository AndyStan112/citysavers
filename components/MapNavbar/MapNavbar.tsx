"use client";
import "./MapNavbar.css";
import {
  MapOutlined,
  TaskAltOutlined,
  BookmarkBorderOutlined,
  LocationOnOutlined,
} from "@mui/icons-material";
import { Button } from "@mui/material";

import { useRouter } from "next/navigation";

export default function MapNavbar() {
  const router = useRouter();

  const navbarButtonList = [
    {
      label: "Explore",
      icon: <MapOutlined />,
      target: "/map",
    },
    {
      label: "Near Me",
      icon: <LocationOnOutlined />,
      target: "/map/nearme",
    },
    {
      label: "Saved",
      icon: <BookmarkBorderOutlined />,
      target: "/map/saved",
    },
    {
      spacer: true,
      target: "",
    },
  ];

  return (
    <nav className="navbar">
      {navbarButtonList.map((props, key) =>
        props.spacer ? (
          <div key={key} className="spacer"></div>
        ) : (
          <Button key={key} onClick={() => router.push(props.target)}>
            {props.icon}
            <span>{props.label}</span>
          </Button>
        )
      )}
    </nav>
  );
}
