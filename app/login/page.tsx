import {
  Button,
  Card,
  Divider,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { MailOutline, Google } from "@mui/icons-material";

export default function LoginPage() {
  return (
    <Card
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
      >
        <TextField
          id="login-email"
          type="email"
          label="Email Address"
          required
        />
        <Button startIcon={<MailOutline />} variant="outlined">
          Continue with Email
        </Button>
      </form>
      <Stack direction="row" gap={1}>
        <Divider sx={{ flex: 1, height: "13px" }} />
        <Typography>OR</Typography>
        <Divider sx={{ flex: 1, height: "13px" }} />
      </Stack>
      <Button startIcon={<Google />} variant="outlined" color="secondary">
        Continue with Google
      </Button>
    </Card>
  );
}
