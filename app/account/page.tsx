"use client";
import { Logout, Store } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Divider,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import assert from "assert";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import { useEffect, useState } from "react";

export default function AccountPage() {
  const { update, data, status } = useSession();
  const [coins, setCoins] = useState("-");
  const [points, setPoints] = useState("-");
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

  useEffect(() => {
    fetch("/api/points_and_coins/get")
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        assert(res.coins !== undefined);
        assert(res.points !== undefined);

        setCoins(res.coins);
        setPoints(res.points);
      })
      .catch((err) => {
        enqueueSnackbar("Error getting points and coins");
        console.log(err);
      });
  }, [setCoins, setPoints]);

  return data ? (
    <Box sx={{ marginX: "auto", maxWidth: "500px" }}>
      <Paper sx={{ marginTop: "75px" }}>
        <Stack gap={0.5}>
          <Stack alignItems="center" gap={1.5}>
            <Avatar
              sx={{ width: "150px", height: "150px", marginTop: "-75px" }}
              alt={data.user.name ? data.user.name : "Unknown"}
              src={data.user.image ? data.user.image : ""}
            />
            <Typography variant="h5">
              {data.user.name ? data.user.name : "Unknown"}
            </Typography>
            <Typography>
              {coins} coins | {points} points
            </Typography>
          </Stack>
          <Divider component="hr" />
          <MenuList>
            <MenuItem onClick={() => router.push("/account/marketplace")}>
              <ListItemIcon>
                <Store />
              </ListItemIcon>
              <ListItemText>Marketplace</ListItemText>
            </MenuItem>

            <MenuItem onClick={logoutHandler}>
              <ListItemIcon>
                <Logout />
              </ListItemIcon>
              <ListItemText>Log out</ListItemText>
            </MenuItem>
          </MenuList>
        </Stack>
      </Paper>
    </Box>
  ) : (
    <></>
  );
}
