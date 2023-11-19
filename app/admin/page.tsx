"use client";
import { Logout } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
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
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { Session } from "next-auth";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import { useEffect, useState } from "react";

export default function AdminPage() {
  const { status, data } = useSession();
  const router = useRouter();
  const [issuesArray, setIssuesArray] = useState([]);
  const [pendingType, setPendingType] = useState("issue");

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
  }, [data?.user.role, router, status]);

  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: "background.paper",
        display: "flex",
        height: "calc(100vh - 115px)",
      }}
    >
      <Stack
        direction="row"
        gap={3}
        sx={{ width: "100%", alignItems: "stretch" }}
      >
        <Paper sx={{ flex: 1 }} elevation={3}>
          <Stack>
            <Stack direction="row">
              <Typography sx={{ p: "8px 16px" }}>Pending</Typography>
              <ToggleButtonGroup
                value={pendingType}
                exclusive
                onChange={(
                  event: React.MouseEvent<HTMLElement>,
                  newPriority: string
                ) => {
                  setPendingType(newPriority);
                }}
                size="small"
                color="primary"
                fullWidth
              >
                <ToggleButton value="issue">Issue</ToggleButton>
                <ToggleButton value="solution">Solution</ToggleButton>
              </ToggleButtonGroup>
            </Stack>
            <Divider />
            <List>
              <ListItemButton>
                <ListItemText primary="Issue Short Description" />
              </ListItemButton>
            </List>
          </Stack>
        </Paper>
        <Paper
          sx={{
            flex: 2,
            display: "flex",
            flexDirection: "row",
            width: "100%",
            height: "100%",
          }}
          elevation={3}
        >
          <Stack direction="row" sx={{ width: "100%" }}>
            <Box sx={{ flex: 1 }}>
              <Stack sx={{ height: "100%" }}>
                <Typography
                  sx={{
                    padding: "6px 10px",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Issue
                </Typography>
                <Divider />
                <Box sx={{ flex: 4, oveflowY: "auto" }}></Box>
                <Divider />
                <Stack direction="row" sx={{ height: "38px" }}>
                  <Button fullWidth color="success">
                    Approve
                  </Button>
                  <Divider orientation="vertical" />
                  <Button fullWidth color="error">
                    Reject
                  </Button>
                </Stack>
              </Stack>
            </Box>
            <Divider
              orientation="vertical"
              sx={{ width: "1px", height: "100%" }}
            />
            <Box sx={{ flex: 1 }}>
              <Stack sx={{ height: "100%" }}>
                <Typography
                  sx={{
                    padding: "6px 10px",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Solution
                </Typography>
                <Divider />
                <Box sx={{ flex: 4, oveflowY: "auto" }}></Box>
                <Divider />
                <Stack direction="row" sx={{ height: "38px" }}>
                  <Button fullWidth color="success">
                    Approve
                  </Button>
                  <Divider orientation="vertical" />
                  <Button fullWidth color="error">
                    Reject
                  </Button>
                </Stack>
              </Stack>
            </Box>
          </Stack>
        </Paper>
      </Stack>
    </Box>
  );
}
