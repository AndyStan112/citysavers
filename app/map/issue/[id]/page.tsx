"use client";
import ChipsList from "@/components/ChipsList/ChipsList";
import Gallery from "@/components/Gallery/Gallery";
import OverlayPage from "@/components/OverlayPage/OverlayPage";
import {
  Add,
  BookmarkBorder,
  BookmarkRemoveOutlined,
  Launch,
  Share,
} from "@mui/icons-material";
import { Button, Skeleton, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { enqueueSnackbar } from "notistack";
import Link from "next/link";
import StatusChip from "@/components/Chips/StatusChip";
import CategoryChip from "@/components/Chips/CategoryChip";
import LocationTypeChip from "@/components/Chips/LocationTypeChip";

export default function ViewIssuePage({ params }: { params: { id: string } }) {
  const [issueData, setIssueData] = useState<any>(null);
  const [isSaved, setIsSaved] = useState(false);

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
            setIsSaved(data.isSaved);
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

  const saveClickHandler = async () => {
    if (!issueData) return;

    fetch(`/api/save/${params.id}`)
      .then((res) => res.json)
      .then((res) => {
        setIsSaved(true);
      })
      .catch((reason) => {
        console.log(reason);
        enqueueSnackbar("Failed to save.");
      });
  };

  return (
    <OverlayPage>
      {issueData ? (
        <>
          <Typography variant="h6">{issueData.shortDescription}</Typography>
          <ChipsList>
            <StatusChip status={issueData.status} />
            <CategoryChip category={issueData.category} />
            <LocationTypeChip type={issueData.locationType} />
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
            {isSaved ? (
              <Button
                color="primary"
                variant="outlined"
                fullWidth
                startIcon={<BookmarkRemoveOutlined />}
              >
                Saved
              </Button>
            ) : (
              <Button
                color="primary"
                variant="outlined"
                fullWidth
                startIcon={<BookmarkBorder />}
                onClick={saveClickHandler}
              >
                Save
              </Button>
            )}
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
