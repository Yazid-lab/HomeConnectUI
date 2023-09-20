import { Container, Paper, Typography } from "@mui/material";
import { Ad } from "../types/ad";

export default function AdDescription( {advert}:{advert:Ad}){

    return(
            <Container>
              <Paper elevation={3} style={{ padding: "20px" }}>
                <Typography variant="h5" gutterBottom>
                  {advert.title}
                </Typography>
                <Typography variant="subtitle1">
                  <strong>Price:</strong> {advert.price}
                </Typography>
                <Typography variant="subtitle1">
                  <strong>Location:</strong> {advert.address.country}
                </Typography>
                <Typography variant="subtitle1">
                  <strong>Area:</strong> {advert.area} m²
                </Typography>
                <Typography variant="subtitle1">
                  <strong>Rooms:</strong> {advert.nbRooms}
                </Typography>
                {/* Add more details as needed */}
              </Paper>
            </Container>
    )
}