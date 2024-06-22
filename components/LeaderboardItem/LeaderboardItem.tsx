import { Avatar, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import { LeaderboardData } from "./LeaderboardData";

export default function LeaderboardItem({ data }: { data: LeaderboardData }) {
  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar src={data.image} alt={data.name ? data.name : "Unknown"} />
      </ListItemAvatar>
      <ListItemText
        primary={data.name ? data.name : "Unknown"}
        secondary={data.points + " points"}
      />
    </ListItem>
  );
}
