"use client";
import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import { AccountCircle, Map } from "@mui/icons-material";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function MainNavbar() {
  const { status } = useSession();

  return (
    <AppBar position="fixed" component="nav" sx={{ zIndex: 1300 }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          CitySavers
        </Typography>
        <Link href="/map">
          <Button endIcon={<Map />} sx={{ color: "#fff" }}>
            Map
          </Button>
        </Link>
        {status === "authenticated" ? (
          <Link href="/account">
            <Button endIcon={<AccountCircle />} sx={{ color: "#fff" }}>
              Account
            </Button>
          </Link>
        ) : (
          <Link href="/login">
            <Button endIcon={<AccountCircle />} sx={{ color: "#fff" }}>
              Login
            </Button>
          </Link>
        )}
      </Toolbar>
    </AppBar>
  );
}
