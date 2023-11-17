"use client";
import "./Navbar.css";
import {
  MapOutlined,
  AccountCircleOutlined,
  TaskAltOutlined,
  BookmarkBorderOutlined,
  LocationOnOutlined,
} from "@mui/icons-material";

import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  const navbarButtonList = [
    {
      label: "Explore",
      icon: <MapOutlined />,
      target: "/map",
    },
    {
      label: "Tasks",
      icon: <TaskAltOutlined />,
      target: "/map/tasks",
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
    {
      label: "Account",
      icon: <AccountCircleOutlined />,
      target: "/map/account",
    },
  ];

  return (
    <div className="navbar">
      {navbarButtonList.map((props, key) =>
        props.spacer ? (
          <div key={key} className="spacer"></div>
        ) : (
          <button key={key} onClick={() => router.push(props.target)}>
            {props.icon}
            <span>{props.label}</span>
          </button>
        )
      )}
    </div>
  );
}
