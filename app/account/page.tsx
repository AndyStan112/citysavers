"use client";
import { Logout } from "@mui/icons-material";
import {
  Box,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Paper,
  Typography,
} from "@mui/material";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import { useEffect } from "react";

export default function AccountPage() {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status !== "authenticated") {
      router.replace("/login");
    }
  }, [router, status]);

  const logoutHandler = async () => {
    try {
      await signOut({ callbackUrl: "/" });
    } catch (error) {
      console.log(error);
      enqueueSnackbar("Failed to log you out.");
    }
  };

  return (
    <Box sx={{ marginX: "auto", maxWidth: "900px" }}>
      <Paper>
        <MenuList>
          <MenuItem onClick={logoutHandler}>
            <ListItemIcon>
              <Logout />
            </ListItemIcon>
            <ListItemText>Log out</ListItemText>
          </MenuItem>
        </MenuList>
      </Paper>
    </Box>
  );
}
