"use client";
import ChipsList from "@/components/ChipsList/ChipsList";
import Gallery from "@/components/Gallery/Gallery";
import { IssueData } from "@/components/IssueListItem/IssueData";
import IssueListItem from "@/components/IssueListItem/IssueListItem";
import { IssueTypesData } from "@/constants/IssueTypes";
import { LocationTypesData } from "@/constants/LocationTypes";
import {
  AccessAlarm,
  BookmarkBorder,
  DoNotDisturbOn,
  Done,
  Launch,
  Share,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Chip,
  Divider,
  List,
  ListItemButton,
  ListItemText,
  Paper,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import { useEffect, useState } from "react";

export default function AdminPage() {
  const { status, data } = useSession();
  const router = useRouter();
  const [issuesArray, setIssuesArray] = useState<IssueData[]>([]);
  const [pendingType, setPendingType] = useState("issue");
  const [currentIssue, setCurrentIssue] = useState<string>("");
  const [issueData, setIssueData] = useState<any>(null);
  const [solutionData, setSolutionData] = useState<any>(null);

  useEffect(() => {
    fetch("/api/admin/issue/get?type=all")
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setIssuesArray(res);
      })
      .catch((err) => {
        enqueueSnackbar("Error getting issues");
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (currentIssue.length > 0) {
      fetch("/api/issue/id/" + currentIssue)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.error == "Not found") {
            enqueueSnackbar(`Issue with id: "${currentIssue}" not found.`);
          } else {
            setIssueData(data);
          }
        })
        .catch((error) => {
          console.log(error);
          enqueueSnackbar("An error occurred.");
        });
    }
  }, [currentIssue]);

  useEffect(() => {
    if (status !== "authenticated") {
      enqueueSnackbar("You are not logged in");
      router.replace("/login");
    }
    if (data?.user.role != "admin") {
      enqueueSnackbar("You do not have privileges");
      router.replace("/login");
    }
  }, [data?.user.role, router, status]);

  const modifyIssue = (status: string) => {
    fetch("/api/admin/issue/modify/" + status, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: data?.user.id,
        issueId: currentIssue,
        priority: "medium",
      }),
    })
      .then((data) => {
        enqueueSnackbar("Set succesful!");
      })
      .catch((error) => {
        console.log(error);
        enqueueSnackbar("Operation failed.");
      });
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: "background.paper",
        display: "flex",
        height: "calc(100vh - 115px)",
      }}
    >
      <Stack
        direction="row"
        gap={3}
        sx={{ width: "100%", alignItems: "stretch" }}
      >
        <Paper sx={{ flex: 1 }} elevation={3}>
          <Stack>
            <Stack direction="row">
              <Typography sx={{ p: "8px 16px" }}>Pending</Typography>
              <ToggleButtonGroup
                value={pendingType}
                exclusive
                onChange={(
                  event: React.MouseEvent<HTMLElement>,
                  newPriority: string
                ) => {
                  setPendingType(newPriority);
                }}
                size="small"
                color="primary"
                fullWidth
              >
                <ToggleButton value="issue">Issue</ToggleButton>
                <ToggleButton value="solution">Solution</ToggleButton>
              </ToggleButtonGroup>
            </Stack>
            <Divider />
            <List>
              {issuesArray.map((value, key) => (
                <IssueListItem
                  key={key}
                  data={value}
                  clickHandler={() => setCurrentIssue(value.id)}
                />
              ))}
            </List>
          </Stack>
        </Paper>
        <Paper
          sx={{
            flex: 2,
            display: "flex",
            flexDirection: "row",
            width: "100%",
            height: "100%",
          }}
          elevation={3}
        >
          <Stack direction="row" sx={{ width: "100%" }}>
            <Box sx={{ flex: 1 }}>
              <Stack sx={{ height: "100%" }}>
                <Typography
                  sx={{
                    padding: "6px 10px",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Issue
                </Typography>
                <Divider />
                <Box sx={{ flex: 4, oveflowY: "auto", padding: "10px 18px" }}>
                  {issueData && (
                    <>
                      <Typography variant="h6">
                        {issueData.shortDescription}
                      </Typography>
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
                        ) : issueData.status == "approved" ? (
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
                      </ChipsList>
                      <Typography>Images:</Typography>
                      <Gallery imageList={issueData.photosUrl} />
                      <Typography>
                        <strong>More details:</strong>
                        <br />
                        {issueData.moreDetails}
                      </Typography>
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
                      </Stack>
                    </>
                  )}
                </Box>
                <Divider />
                <Stack direction="row" sx={{ height: "38px" }}>
                  <Button
                    fullWidth
                    color="success"
                    onClick={() => modifyIssue("approved")}
                  >
                    Approve
                  </Button>
                  <Divider orientation="vertical" />
                  <Button
                    fullWidth
                    color="error"
                    onClick={() => modifyIssue("rejected")}
                  >
                    Reject
                  </Button>
                </Stack>
              </Stack>
            </Box>
            <Divider
              orientation="vertical"
              sx={{ width: "1px", height: "100%" }}
            />
            <Box sx={{ flex: 1 }}>
              <Stack sx={{ height: "100%" }}>
                <Typography
                  sx={{
                    padding: "6px 10px",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Solution
                </Typography>
                <Divider />
                <Box sx={{ flex: 4, oveflowY: "auto", padding: "10px 18px" }}>
                  {solutionData && (
                    <>
                      <Typography variant="h6">
                        {solutionData.shortDescription}
                      </Typography>
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
                  )}
                </Box>
                <Divider />
                <Stack direction="row" sx={{ height: "38px" }}>
                  <Button fullWidth color="success">
                    Approve
                  </Button>
                  <Divider orientation="vertical" />
                  <Button fullWidth color="error">
                    Reject
                  </Button>
                </Stack>
              </Stack>
            </Box>
          </Stack>
        </Paper>
      </Stack>
    </Box>
  );
}
