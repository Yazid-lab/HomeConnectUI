import { Stack, Grid } from "@mui/material";
import { Ad } from "../types/ad";
import ImageSlider from "./ImageSlider";
import AdDescription from "./AdDescription";

export default function AdsList({adverts}:{adverts:Ad[] |undefined}) {
  return (
    <Stack spacing={2}>
      {adverts?.map((advert, index) => (
        <Grid container spacing={0} key={index}>
          <Grid item xs={2}>
            <ImageSlider photos={advert.photos}/>
          </Grid>
          <Grid item xs={2} sm={3}>
            <AdDescription advert={advert}/>
          </Grid>
        </Grid>
      ))}
    </Stack>
  );
}
