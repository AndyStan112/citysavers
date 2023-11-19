"use client";
import OverlayPage from "@/components/OverlayPage/OverlayPage";
import { Button, Stack, TextField, Typography } from "@mui/material";
import { useState, useEffect, FormEventHandler } from "react";
import UploadGallery from "@/components/UploadGallery/UploadGallery";
import { useSession } from "next-auth/react";
import { enqueueSnackbar } from "notistack";
import { useRouter } from "next/navigation";

export default function AddSolutionPage({
  params,
}: {
  params: { issueId: string };
}) {
  const [formDisabled, setFormDisabled] = useState(false);
  const [shortDescription, setShortDescription] = useState("");
  const [moreDetails, setMoreDetails] = useState("");
  const [photoFileList, setPhotoFileList] = useState<string[]>();
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    setFormDisabled(status !== "authenticated");
  }, [status]);

  const submitIssue: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const requestBody = {
      userId: session?.user.id,
      issueId: params.issueId,
      shortDescription: shortDescription,
      moreDetails: moreDetails,
      photosUrl: photoFileList,
    };

    setFormDisabled(true);
    fetch("/api/solution/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        enqueueSnackbar("Submission was successful!");
        setFormDisabled(false);
        router.push("/map/issue/" + data.id);
      })
      .catch((error) => {
        console.log(error);
        enqueueSnackbar("An error occurred!");
        setFormDisabled(false);
      });
  };

  return (
    <OverlayPage>
      <form onSubmit={submitIssue}>
        <Stack className="form-controls" gap={2}>
          <Typography variant="h5">Add solution</Typography>

          <TextField
            label="Short description"
            variant="standard"
            fullWidth
            required
            disabled={formDisabled}
            value={shortDescription}
            onChange={(event) => setShortDescription(event.target.value)}
          />

          <UploadGallery
            disabled={formDisabled}
            onFileListChange={(files) => {
              setPhotoFileList(files);
            }}
          />

          <TextField
            label="More details"
            variant="standard"
            value={moreDetails}
            onChange={(event) => setMoreDetails(event.target.value)}
            fullWidth
            multiline
            disabled={formDisabled}
          />

          <Button variant="contained" type="submit" disabled={formDisabled}>
            Submit
          </Button>
        </Stack>
      </form>
    </OverlayPage>
  );
}
