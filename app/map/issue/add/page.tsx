"use client";
import OverlayPage from "@/components/OverlayPage/OverlayPage";
import {
  Button,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { LocationOn } from "@mui/icons-material";
import { useState } from "react";
import { LocationTypes } from "@/constants/LocationTypes";
import UploadGallery from "@/components/UploadGallery/UploadGallery";

export default function AddIssuePage() {
  const [locType, setLocType] = useState("");

  const locTypeChange = (event: SelectChangeEvent) => {
    setLocType(event.target.value as string);
  };

  return (
    <OverlayPage>
      <Stack gap={2}>
        <Typography variant="h5">Add issue</Typography>
        <TextField
          label="Location"
          color="secondary"
          variant="standard"
          required
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LocationOn />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <Button color="secondary">Pick on map</Button>
              </InputAdornment>
            ),
          }}
        />
        <FormControl fullWidth variant="standard" color="secondary" required>
          <InputLabel id="location-type-label">Location Type</InputLabel>
          <Select
            labelId="location-type-label"
            id="location-type"
            value={locType}
            label="Location Type"
            color="secondary"
            variant="standard"
            required
            onChange={locTypeChange}
          >
            {LocationTypes.map(({ key, name, icon }) => (
              <MenuItem key={key} value={key}>
                <Stack gap={0.75} direction="row">
                  {icon}
                  {name}
                </Stack>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="Description"
          color="secondary"
          variant="standard"
          fullWidth
          multiline
          required
        />
        <UploadGallery />
        <Button variant="contained" color="secondary">
          Submit
        </Button>
      </Stack>
    </OverlayPage>
  );
}
