"use client";
import { IssueData } from "@/components/IssueListItem/IssueData";
import IssueListItem from "@/components/IssueListItem/IssueListItem";
import OverlayPage from "@/components/OverlayPage/OverlayPage";
import { MyLocationCoords } from "@/constants/MapGeolocation";
import {
  Box,
  Divider,
  List,
  ListItem,
  Skeleton,
  Slider,
  Stack,
  Typography,
} from "@mui/material";
import { useAtomValue } from "jotai";
import { enqueueSnackbar } from "notistack";
import { SyntheticEvent, useEffect, useState } from "react";

const radiusMarks = [
  {
    value: 0.5,
  },
  {
    value: 1,
  },
  {
    value: 1.5,
  },
  {
    value: 2,
  },
  {
    value: 2.5,
  },
  {
    value: 3,
  },
  {
    value: 4,
  },
  {
    value: 5,
  },
  {
    value: 6,
  },
  {
    value: 7,
  },
  {
    value: 8,
  },
  {
    value: 9,
  },
  {
    value: 10,
  },
];

type Coords = {
  latitude: number;
  longitude: number;
};

export default function NearMePage() {
  const [issues, setIssues] = useState<IssueData[] | null>(null);
  const myLocation = useAtomValue(MyLocationCoords);

  const [radius, setRadius] = useState(0.5);
  const handleSetRadius = (
    event: Event,
    value: number | number[],
    activeThumb: number
  ) => {
    if (!Array.isArray(value)) {
      setRadius(value);
    }
  };

  const [searchRadius, setSearchRadius] = useState(0.5);
  const handleSetSearchRadius = (
    event: Event | SyntheticEvent<Element, Event>,
    value: number | number[]
  ) => {
    if (!Array.isArray(value)) {
      setSearchRadius(value);
      fetchData(value);
    }
  };

  const fetchData = async (radius: number = -1) => {
    if (myLocation == null) return;

    await fetch(
      `/api/map/nearme?r=${radius > 0 ? radius : searchRadius}&lat=${
        myLocation.lat
      }&lon=${myLocation.lng}`
    )
      .then((res) => res.json())
      .then((data) => {
        setIssues(data);
      })
      .catch((error) => {
        console.log(error);
        enqueueSnackbar("Failed to get issues.");
      });
  };

  useEffect(() => {
    if (myLocation && issues == null) fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [myLocation, issues]);

  return (
    <OverlayPage>
      <Typography variant="h6">Issues open near me</Typography>
      <Stack direction="row" gap={2} alignItems="center">
        <Slider
          step={null}
          defaultValue={0.5}
          value={radius}
          onChange={handleSetRadius}
          onChangeCommitted={handleSetSearchRadius}
          min={0}
          max={10}
          marks={radiusMarks}
          valueLabelDisplay="auto"
        />
        <Typography fontSize="11pt" minWidth="50px">
          {radius} km
        </Typography>
      </Stack>
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
              <Typography>No issues found in the selected radius.</Typography>
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
