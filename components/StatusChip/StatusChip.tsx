import { AccessAlarm, DoNotDisturbOn, Done } from "@mui/icons-material";
import { Chip } from "@mui/material";

export default function StatusChip({ status }: { status: string | undefined }) {
  return status == "pending" ? (
    <Chip
      icon={<AccessAlarm />}
      label="Pending approval"
      size="small"
      color="warning"
    />
  ) : status == "rejected" ? (
    <Chip
      icon={<DoNotDisturbOn />}
      label="Rejected"
      size="small"
      color="error"
    />
  ) : status == "approved" ? (
    <Chip
      icon={<AccessAlarm />}
      label="Pending solution"
      size="small"
      color="info"
    />
  ) : status == "solved" ? (
    <Chip icon={<Done />} label="Solved" size="small" color="success" />
  ) : (
    <></>
  );
}
