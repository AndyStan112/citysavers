"use client";
import ChipsList from "@/components/ChipsList/ChipsList";
import Gallery from "@/components/Gallery/Gallery";
import OverlayPage from "@/components/OverlayPage/OverlayPage";
import {
  AccessAlarm,
  Add,
  BookmarkBorder,
  DoNotDisturbOn,
  Done,
  Launch,
  Share,
} from "@mui/icons-material";
import { Button, Chip, Skeleton, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { enqueueSnackbar } from "notistack";
import { LocationTypesData } from "@/constants/LocationTypes";
import { IssueTypesData } from "@/constants/IssueTypes";
import Link from "next/link";
import StatusChip from "@/components/StatusChip/StatusChip";

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

  const shareClickHandler = async () => {
    if (!issueData) return;
    const shareUrl = window.location.href;
    console.log(shareUrl);
    if (navigator.share) {
      const shareData = {
        title: issueData.shortDescription + " - CitySavers",
        text: issueData.moreDetails,
        url: shareUrl,
      };
      await navigator.share(shareData);
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl);
      enqueueSnackbar("Link copied to clipboard!");
    } else {
      enqueueSnackbar("Failed to share, copy the link manually.");
    }
  };

  return (
    <OverlayPage>
      {issueData ? (
        <>
          <Typography variant="h6">{issueData.shortDescription}</Typography>
          <ChipsList>
            <StatusChip status={issueData.status} />
            <Chip
              icon={LocationTypesData[issueData.locationType].icon}
              label={LocationTypesData[issueData.locationType].name}
              size="small"
            />
            <Chip
              icon={IssueTypesData[issueData.category].icon}
              label={IssueTypesData[issueData.category].name}
              size="small"
            />

            {/* <Chip avatar={<Avatar>AU</Avatar>} label="App User" size="small" /> */}
          </ChipsList>
          <Gallery imageList={issueData.photosUrl} />
          <Typography>{issueData.moreDetails}</Typography>
          {issueData.status == "approved" ? (
            <Link href={`/map/solution/add/${params.id}`}>
              <Button
                color="primary"
                variant="contained"
                fullWidth
                startIcon={<Add />}
              >
                Add solution
              </Button>
            </Link>
          ) : (
            <></>
          )}
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
              onClick={shareClickHandler}
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
