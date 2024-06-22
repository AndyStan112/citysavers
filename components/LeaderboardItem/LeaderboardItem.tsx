import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { LeaderboardData } from "./LeaderboardData";

const emojis = ["", "🥇", "🥈", "🥉"];

export default function LeaderboardItem({ data }: { data: LeaderboardData }) {
  return (
    <TableRow key={data.rank}>
      <TableCell component="th" scope="row">
        <Typography fontWeight="bold">#{data.rank}</Typography>
      </TableCell>
      <TableCell>
        <Stack direction="row" alignItems="center">
          <Avatar src={data.image} alt={data.name : "Unknown"} />
          <Typography padding="0px 10px">{data.name : "Unknown"}</Typography>
          <Typography fontSize="30px">{emojis[data.rank] ?? ""}</Typography>
        </Stack>
      </TableCell>
      <TableCell align="right">{data.points}</TableCell>
    </TableRow>
  );
}
