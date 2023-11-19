"use client";
import { Logout } from "@mui/icons-material";
import {
  Avatar,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Paper,
  Stack,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  Typography,
} from "@mui/material";
import { DataGrid, GRID_STRING_COL_DEF, GridColDef } from "@mui/x-data-grid";
import { Session } from "next-auth";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import { useEffect, useState } from "react";

export default function AdminPage() {
  const { status, data } = useSession();
  const router = useRouter();
  const [issuesArray, setIssuesArray] = useState([]);

  useEffect(() => {
    fetch("/api/admin/issue/get?type=all")
      .then((res) => res.json())
      .then((res) => setIssuesArray(res))
      .catch((err) => {
        enqueueSnackbar("Error getting issues");
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (status !== "authenticated") {
      enqueueSnackbar("You are not logged in");
      router.replace("/login");
    }
    if (data?.user.role != "admin") {
      enqueueSnackbar("You do not have privileges");
      router.replace("/login");
    }
  }, [router, status]);

  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: "background.paper",
        display: "flex",
        height: "100%",
      }}
    ></Box>
  );
}
