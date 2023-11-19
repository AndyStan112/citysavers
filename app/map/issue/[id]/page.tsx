"use client";
import ChipsList from "@/components/ChipsList/ChipsList";
import Gallery from "@/components/Gallery/Gallery";
import OverlayPage from "@/components/OverlayPage/OverlayPage";
import {
  AccessAlarm,
  Add,
  BookmarkBorder,
  DirectionsBus,
  DoNotDisturbOn,
  DoNotStep,
  Done,
  Launch,
  Share,
} from "@mui/icons-material";
import {
  Avatar,
  Button,
  Chip,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { enqueueSnackbar } from "notistack";

export default function ViewIssuePage({ params }: { params: { id: string } }) {
  const [issueData, setIssueData] = useState<any>(null);

  useEffect(() => {
    if (!issueData) {
      fetch("/api/issue/id/" + params.id)
        .then((res) => res.json())
        .then((data) => {
          // console.log(data);
          if (data.error == "Not found") {
            enqueueSnackbar(`Issue with id: "${params.id}" not found.`);
          } else {
            setIssueData(data);
          }
        })
        .catch((error) => {
          console.log(error);
          enqueueSnackbar("An error occurred.");
        });
    }
  }, [issueData, params.id]);

  return (
    <OverlayPage>
      {issueData ? (
        <>
          <Typography variant="h6">{issueData.shortDescription}</Typography>
          <ChipsList>
            {issueData.status == "pending" ? (
              <Chip
                icon={<AccessAlarm />}
                label="Pending approval"
                size="small"
                color="warning"
              />
            ) : issueData.status == "rejected" ? (
              <Chip
                icon={<DoNotDisturbOn />}
                label="Rejected"
                size="small"
                color="error"
              />
            ) : issueData.status == "pending_solution" ? (
              <Chip
                icon={<AccessAlarm />}
                label="Pending solution"
                size="small"
                color="info"
              />
            ) : issueData.status == "solved" ? (
              <Chip
                icon={<Done />}
                label="Solved"
                size="small"
                color="success"
              />
            ) : (
              <></>
            )}
            <Chip icon={<DirectionsBus />} label="Bus Station" size="small" />
            <Chip icon={<DoNotStep />} label="Vandalism" size="small" />
            <Chip avatar={<Avatar>AU</Avatar>} label="App User" size="small" />
          </ChipsList>
          <Typography>Images:</Typography>
          <Gallery imageList={issueData.photosUrl} />
          <Typography>
            <strong>More details:</strong>
            <br />
            {issueData.moreDetails}
          </Typography>
          <Button
            color="primary"
            variant="contained"
            fullWidth
            startIcon={<Add />}
          >
            Add solution
          </Button>
          <Stack direction="row" gap={1}>
            <a
              href={
                "https://maps.google.com/maps?z=12&t=m&q=loc:" +
                issueData.latitude +
                "+" +
                issueData.longitude
              }
              target="_blank"
            >
              <Button
                color="success"
                variant="outlined"
                fullWidth
                startIcon={<Launch />}
              >
                GMaps
              </Button>
            </a>
            <Button
              color="primary"
              variant="outlined"
              fullWidth
              startIcon={<BookmarkBorder />}
              disabled
            >
              Save
            </Button>
            <Button
              color="secondary"
              variant="outlined"
              fullWidth
              startIcon={<Share />}
              disabled
            >
              Share
            </Button>
          </Stack>
        </>
      ) : (
        <>
          <Skeleton variant="text" sx={{ fontSize: "1.5rem", mr: "40px" }} />
          <Stack
            direction="row"
            gap={1.5}
            sx={{ width: "70%", fontSize: "1.1rem" }}
          >
            <Skeleton variant="text" sx={{ flex: 1 }} />
            <Skeleton variant="text" sx={{ flex: 1 }} />
            <Skeleton variant="text" sx={{ flex: 1 }} />
          </Stack>
          <Stack
            direction="row"
            gap={1.5}
            sx={{ width: "130%", fontSize: "1.1rem", mt: "10px" }}
          >
            <Skeleton variant="rounded" sx={{ flex: 1 }} height={200} />
            <Skeleton variant="rounded" sx={{ flex: 1 }} height={200} />
          </Stack>
          <Skeleton variant="text" sx={{ fontSize: "1.5rem" }} />
        </>
      )}
    </OverlayPage>
  );
}
