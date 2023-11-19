"use client";
import ChipsList from "@/components/ChipsList/ChipsList";
import Gallery from "@/components/Gallery/Gallery";
import OverlayPage from "@/components/OverlayPage/OverlayPage";
import {
  AccessAlarm,
  BookmarkBorder,
  DoNotDisturbOn,
  Done,
  Launch,
  Share,
} from "@mui/icons-material";
import { Button, Chip, Skeleton, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { enqueueSnackbar } from "notistack";

export default function ViewSolutionPage({
  params,
}: {
  params: { id: string };
}) {
  const [solutionData, setSolutionData] = useState<any>(null);

  useEffect(() => {
    if (!solutionData) {
      fetch("/api/solution/id/" + params.id)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.error == "Not found") {
            enqueueSnackbar(`Solution with id: "${params.id}" not found.`);
          } else {
            setSolutionData(data);
          }
        })
        .catch((error) => {
          console.log(error);
          enqueueSnackbar("An error occurred.");
        });
    }
  }, [solutionData, params.id]);

  return (
    <OverlayPage>
      {solutionData ? (
        <>
          <Typography variant="h6">{solutionData.shortDescription}</Typography>
          <ChipsList>
            {solutionData.status == "pending" ? (
              <Chip
                icon={<AccessAlarm />}
                label="Pending approval"
                size="small"
                color="warning"
              />
            ) : solutionData.status == "rejected" ? (
              <Chip
                icon={<DoNotDisturbOn />}
                label="Rejected"
                size="small"
                color="error"
              />
            ) : solutionData.status == "pending_solution" ? (
              <Chip
                icon={<AccessAlarm />}
                label="Pending solution"
                size="small"
                color="info"
              />
            ) : solutionData.status == "solved" ? (
              <Chip
                icon={<Done />}
                label="Solved"
                size="small"
                color="success"
              />
            ) : (
              <></>
            )}
          </ChipsList>
          <Typography>Images:</Typography>
          <Gallery imageList={solutionData.photosUrl} />
          <Typography>
            <strong>More details:</strong>
            <br />
            {solutionData.moreDetails}
          </Typography>
          <Button
            color="primary"
            variant="contained"
            fullWidth
            startIcon={<Launch />}
          >
            View issue
          </Button>
          <Stack direction="row" gap={1}>
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
