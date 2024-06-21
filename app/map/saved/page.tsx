"use client";
import { IssueData } from "@/components/IssueListItem/IssueData";
import IssueListItem from "@/components/IssueListItem/IssueListItem";
import OverlayPage from "@/components/OverlayPage/OverlayPage";
import {
  Box,
  Divider,
  List,
  ListItem,
  Skeleton,
  Typography,
} from "@mui/material";
import { enqueueSnackbar } from "notistack";
import { useEffect, useState } from "react";

export default function SavedPage() {
  const [issues, setIssues] = useState<IssueData[] | null>(null);

  const fetchData = async () => {
    await fetch("/api/saved/get")
      .then((res) => res.json())
      .then((data) => {
        setIssues(data);
      })
      .catch((error) => {
        console.log(error);
        enqueueSnackbar("Failed to get saved issues.");
      });
  };

  useEffect(() => {
    if (issues == null) fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [issues]);

  return (
    <OverlayPage>
      <Typography variant="h6">Saved</Typography>
      <List sx={{ marginX: "-18px", p: 0 }}>
        {issues !== null ? (
          issues.length > 0 ? (
            issues.map((value, index) => (
              <>
                <Divider key={2 * index} component="li" />
                <IssueListItem key={2 * index + 1} data={value} />
              </>
            ))
          ) : (
            <>
              <Typography align="center" padding="10px 0">
                No issues saved.
              </Typography>
            </>
          )
        ) : (
          [1, 2].map((item, index) => (
            <>
              <Divider key={2 * index} component="li" />
              <ListItem key={2 * index + 1}>
                <Box sx={{ width: "100%" }}>
                  <Skeleton variant="text" width="60%" height={30} />
                  <Skeleton variant="text" width="40%" height={30} />
                </Box>
              </ListItem>
            </>
          ))
        )}
      </List>
    </OverlayPage>
  );
}
