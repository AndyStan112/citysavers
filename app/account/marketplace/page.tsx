"use client";
import MarketplaceItem from "@/components/Marketplace/MarketplaceItem";
import { Box, Divider, List, Paper, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";

export default function Marketplace() {
  const [offers, setOffers] = useState<[]>([]);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await fetch('/api/admin/market/offers');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setOffers(data); // Assuming data is an array of Offer objects
      } catch (error) {
        console.error('Error fetching offers:', error);
      }
    };

    fetchOffers();
  }, []);  

  return (
    <>
      <Box sx={{ marginX: "auto", maxWidth: "500px" }}>
        <Stack gap={1}>
          <Typography variant="h4">Marketplace</Typography>
          <Typography>Redeem coins for benefits at our partners:</Typography>
        </Stack>
        <Paper>
          <List>
            {offers.map((value, index) => (
              <>
                {index > 0 && <Divider component="hr" key={2 * index} />}
                <MarketplaceItem data={value} key={2 * index + 1} />
              </>
            ))}
          </List>
        </Paper>
      </Box>
    </>
  );
}
