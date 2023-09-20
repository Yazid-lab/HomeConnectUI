import React from "react";
import { Typography, Button, Container } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
export default function Home() {
  return (
    <section>
      <Container
        maxWidth="xl"
        sx={{
          display: "flex",
          flexDirection: "column",
          marginTop: 25,
        }}
      >
        <div>
          <Typography
            variant="h1"
            component="h1"
            sx={{
              fontSize: "5rem", // Adjust this value as needed for a very big heading
            }}
          >
            Welcome to Home Connect
          </Typography>
          <Typography variant="body1">Find your dream home with us.</Typography>
          <Button variant="contained" color="primary" href="#property-listings">
            <Typography
              component={RouterLink}
              to={"/rent"}
              textAlign="center"
              sx={{ textDecoration: "none", color: "white" }}
            >
              Explore Listings
            </Typography>
          </Button>
        </div>
      </Container>
    </section>
  );
}
