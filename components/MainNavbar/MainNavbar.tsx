"use client";
import { useState, MouseEvent } from "react";
import {
  AppBar,
  Button,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
} from "@mui/material";
import {
  AccountCircle,
  Map,
  Code,
  List,
  Menu as MenuIcon,
} from "@mui/icons-material";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Theme } from "@mui/material/styles";
import { SxProps } from "@mui/system";

export default function MainNavbar() {
  const { status, data } = useSession();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("md")
  );

  const handleMenuClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const linkStyle: SxProps<Theme> = {
    textDecoration: "none",
    color: "black",
  };

  return (
    <AppBar position="fixed" component="nav" sx={{ zIndex: 1300 }}>
      <Toolbar sx={{ gap: "0.5rem" }}>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          CitySavers
        </Typography>

        {isMobile ? (
          <>
            <IconButton
              color="inherit"
              aria-label="menu"
              onClick={handleMenuClick}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              {data?.user.role == "admin" && (
                <Link href="/admin" passHref>
                  <MenuItem
                    onClick={handleMenuClose}
                    component="a"
                    sx={linkStyle}
                  >
                    <ListItemIcon>
                      <Code />
                    </ListItemIcon>
                    <ListItemText primary="Admin" />
                  </MenuItem>
                </Link>
              )}
              <Link href="/map" passHref>
                <MenuItem
                  onClick={handleMenuClose}
                  component="a"
                  sx={linkStyle}
                >
                  <ListItemIcon>
                    <Map />
                  </ListItemIcon>
                  <ListItemText primary="Map" />
                </MenuItem>
              </Link>
              <Link href="/leaderboard" passHref>
                <MenuItem
                  onClick={handleMenuClose}
                  component="a"
                  sx={linkStyle}
                >
                  <ListItemIcon>
                    <List />
                  </ListItemIcon>
                  <ListItemText primary="Leaderboard" />
                </MenuItem>
              </Link>
              {status === "unauthenticated" ? (
                <Link href="/login" passHref>
                  <MenuItem
                    onClick={handleMenuClose}
                    component="a"
                    sx={linkStyle}
                  >
                    <ListItemIcon>
                      <AccountCircle />
                    </ListItemIcon>
                    <ListItemText primary="Login" />
                  </MenuItem>
                </Link>
              ) : (
                <Link href="/account" passHref>
                  <MenuItem
                    onClick={handleMenuClose}
                    component="a"
                    sx={linkStyle}
                  >
                    <ListItemIcon>
                      <AccountCircle />
                    </ListItemIcon>
                    <ListItemText primary="Account" />
                  </MenuItem>
                </Link>
              )}
            </Menu>
          </>
        ) : (
          <>
            {data?.user.role == "admin" && (
              <Link href="/admin" passHref>
                <Button
                  endIcon={<Code />}
                  sx={{ color: "#fff", textDecoration: "none" }}
                >
                  Admin
                </Button>
              </Link>
            )}
            <Link href="/map" passHref>
              <Button
                endIcon={<Map />}
                sx={{ color: "#fff", textDecoration: "none" }}
              >
                Map
              </Button>
            </Link>
            <Link href="/leaderboard" passHref>
              <Button
                endIcon={<List />}
                sx={{ color: "#fff", textDecoration: "none" }}
              >
                Leaderboard
              </Button>
            </Link>
            {status === "unauthenticated" ? (
              <Link href="/login" passHref>
                <Button
                  endIcon={<AccountCircle />}
                  sx={{ color: "#fff", textDecoration: "none" }}
                >
                  Login
                </Button>
              </Link>
            ) : (
              <Link href="/account" passHref>
                <Button
                  endIcon={<AccountCircle />}
                  sx={{ color: "#fff", textDecoration: "none" }}
                >
                  Account
                </Button>
              </Link>
            )}
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}
