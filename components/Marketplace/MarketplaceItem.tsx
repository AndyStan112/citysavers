import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { Offer } from "./Offer";
import { useState } from "react";
import { enqueueSnackbar } from "notistack";

export default function MarketplaceItem({ data }: { data: Offer }) {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleRedeem = async () => {
    
      const response = await fetch(`/api/admin/market/redeem/${data.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((res) => res.json())
      .then(response => {
        if (response.error) {
          throw new Error(`Failed to redeem offer: ${response.error}`);
        }
    
        enqueueSnackbar("Offer redeemed successfully! An email has been sent.");
        setOpen(false);}
    )
    .catch (error=> {
      enqueueSnackbar(error.message, { variant: 'error' });
    });
  }
  

  const clickHandler = () => {
    setOpen(true);
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{data.name}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {data.description}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleRedeem} autoFocus>
            Redeem for {data.value} coins
          </Button>
        </DialogActions>
      </Dialog>

      <ListItemButton onClick={clickHandler}>
        <ListItemText>
          <Stack direction="row">
            <Stack gap={0.5} sx={{ flex: 2 }}>
              <Typography>{data.name}</Typography>
              <Typography>{data.partner}</Typography>
            </Stack>
            <Typography>{data.value}</Typography>
          </Stack>
        </ListItemText>
      </ListItemButton>
    </>
  );
}
