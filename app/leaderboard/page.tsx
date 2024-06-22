"use client";
import { LeaderboardData } from "@/components/LeaderboardItem/LeaderboardData";
import LeaderboardItem from "@/components/LeaderboardItem/LeaderboardItem";
import {
  Box,
  Divider,
  List,
  ListItem,
  Paper,
  Skeleton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import assert from "assert";
import { enqueueSnackbar } from "notistack";
import React, { useEffect, useState } from "react";

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardData[] | null>(
    null
  );

  useEffect(() => {
    if (leaderboard == null) {
      fetch("/api/leaderboard")
        .then((res) => res.json())
        .then((res) => {
          assert(Array.isArray(res.name));
          setLeaderboard(res.name);
        })
        .catch((err) => {
          enqueueSnackbar("Error getting issues");
          console.log(err);
        });
    }
  }, [leaderboard]);

  return (
    <>
      <Box sx={{ marginX: "auto", maxWidth: "500px" }}>
        <Stack gap={1}>
          <Typography variant="h4">Leaderboard</Typography>
        </Stack>
        <TableContainer component={Paper} sx={{ marginY: "10px" }}>
          {Array.isArray(leaderboard) ? (
            leaderboard.length > 0 ? (
              <Table aria-label="leaderboard table">
                <TableHead>
                  <TableRow>
                    <TableCell>Rank</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell align="right">Points</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {leaderboard.map((row: any, index: any) => (
                    <LeaderboardItem
                      key={index}
                      data={{ ...row, rank: index + 1 }}
                    ></LeaderboardItem>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <Typography align="center" padding="10px 0">
                The leaderboard is empty.
              </Typography>
            )
          ) : (
            <List>
              {[1, 2, 3].map((item, index) => (
                <React.Fragment key={index}>
                  {index > 0 && <Divider component="li" />}
                  <ListItem>
                    <Box sx={{ width: "100%" }}>
                      <Skeleton variant="text" width="60%" height={20} />
                      <Skeleton variant="text" width="40%" height={20} />
                    </Box>
                  </ListItem>
                </React.Fragment>
              ))}
            </List>
          )}
        </TableContainer>
      </Box>
    </>
  );
}
