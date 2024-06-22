import { WarningAmber, CheckCircle, Help } from "@mui/icons-material";
import { Chip } from "@mui/material";

export default function VerdictChip({ verdict }: { verdict: boolean | null }) {
  return verdict === null ? (
    <Chip color="default" icon={<Help />} label="Unknown" size="small" />
  ) : (
    <Chip
      color={verdict ? "success" : "error"}
      icon={verdict ? <CheckCircle /> : <WarningAmber />}
      label={verdict ? "Looks good" : "Potentially False"}
      size="small"
    />
  );
}
