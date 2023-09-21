import { Stack, Grid, Container, CircularProgress } from "@mui/material";
import { Ad } from "../types/ad";
import ImageSlider from "./ImageSlider";
import AdDescription from "./AdDescription";
import { Link as RouterLink } from "react-router-dom";
export default function AdsList({ adverts }: { adverts: Ad[] | undefined }) {
  return (
    <div>
      {adverts ? (
        <Stack spacing={2}>
          {adverts?.map((advert, index) => (
            <Grid container spacing={0} key={index}>
              <Grid item xs={2}>
                <ImageSlider photos={advert.photos} />
              </Grid>
              <Grid item xs={2} sm={3}>
                <AdDescription advert={advert} />
              </Grid>
            </Grid>
          ))}
        </Stack>
      ) : (
        <Container
          maxWidth="xs"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh", // Set the container to full viewport height
          }}
        >
          <CircularProgress />
        </Container>
      )}
    </div>
  );
}
