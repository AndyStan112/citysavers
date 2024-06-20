"use client";
import {
  Button,
  Paper,
  Divider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { MailOutline, Google } from "@mui/icons-material";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import { FormEventHandler, useEffect, useRef } from "react";

export default function LoginPage() {
  // const logIn = (provider: string, email = undefined) => {
  //   email ? signIn(provider, {}, email) : signIn(provider, {});
  // };

  const { status } = useSession();
  const router = useRouter();
  const emailInputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/account");
    }
  }, [router, status]);

  const emailLogin: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    const email = emailInputRef.current?.value || "";
    console.log(email);
    console.log("muuie");
    try {
      await signIn("email", { email });
    } catch (error) {
      console.log(error);
      enqueueSnackbar("Logging in with Email failed.");
    }
  };

  const googleLogin = async () => {
    try {
      await signIn("google");
    } catch (error) {
      console.log(error);
      enqueueSnackbar("Logging in with Google failed.");
    }
  };

  return (
    <Paper
      elevation={4}
      sx={{
        marginX: "auto",
        maxWidth: "400px",
        px: 2,
        py: 1.5,
        display: "flex",
        flexDirection: "column",
        gap: 1.5,
      }}
    >
      <Stack direction="row" gap={1}>
        <Divider sx={{ flex: 1, height: "16px" }} />
        <Typography
          sx={{
            fontSize: "16pt",
          }}
        >
          Login
        </Typography>
        <Divider sx={{ flex: 1, height: "16px" }} />
      </Stack>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0.9rem",
        }}
        onSubmit={emailLogin}
      >
        <TextField
          id="login-email"
          type="email"
          label="Email Address"
          inputRef={emailInputRef}
          required
        />
        <Button startIcon={<MailOutline />} variant="outlined" type="submit">
          Continue with Email
        </Button>
      </form>
      <Stack direction="row" gap={1}>
        <Divider sx={{ flex: 1, height: "13px" }} />
        <Typography>OR</Typography>
        <Divider sx={{ flex: 1, height: "13px" }} />
      </Stack>
      <Button
        startIcon={<Google />}
        variant="outlined"
        color="secondary"
        onClick={googleLogin}
      >
        Continue with Google
      </Button>
    </Paper>
  );
}
