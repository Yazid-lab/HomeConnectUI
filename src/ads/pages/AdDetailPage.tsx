import { useParams } from "react-router-dom";
import useGetAd from "../hooks/useGetAd";
import {
  CircularProgress,
  Container,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "../pages/LocationMap.css";
import icon from "leaflet/dist/images/marker-icon.png";
import L from "leaflet";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import { Ad } from "../types/ad";
import ImageSlider from "../components/ImageSlider";

const AdMap = ({ ad }: { ad: Ad }) => {
  return (
    <>
      <MapContainer
        center={[ad.address.latitude, ad.address.longitude]}
        zoom={13}
        scrollWheelZoom={true}
        style={{ height: 400, width: 800 }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[ad.address.latitude, ad.address.longitude]}></Marker>
      </MapContainer>
    </>
  );
};

const AdDetails = ({ ad }: { ad: Ad }) => {
  return (
    <Container>
      <Paper elevation={3} style={{ padding: "20px" }}>
        <Typography variant="h5" gutterBottom>
          {ad.title}
        </Typography>
        <Typography variant="subtitle1">
          <strong>Price:</strong> {ad.price}
        </Typography>
        <Typography variant="subtitle1">
          <strong>Area:</strong> {ad.area} m²
        </Typography>
        <Typography variant="subtitle1">
          <strong>Rooms:</strong> {ad.nbRooms}
        </Typography>
        <Typography variant="subtitle1">
          <strong>Location:</strong> {ad.address.country}, {ad.address.town},{" "}
          {ad.address.street}
        </Typography>
        <Typography variant="subtitle1">
          <strong>Description:</strong>{" "}
          <Typography paragraph={true}>{ad.description} </Typography>
        </Typography>
      </Paper>
    </Container>
  );
};
export default function AdDetail() {
  const { id } = useParams();
  const numberId = id ? parseInt(id) : -1;
  const ad = useGetAd(numberId);
  console.log(ad);

  let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
  });

  L.Marker.prototype.options.icon = DefaultIcon;
  return (
    <div>
      {ad ? (
        <>
          <Grid
            container
            spacing={0}
            direction="row"
            alignItems="center"
            justifyContent="start"
            marginBottom="2em"
            marginTop="5em"
          >
            <Grid item xs={5}>
              <AdDetails ad={ad} />
            </Grid>
            <Grid item xs={3} >
              <ImageSlider photos={ad.photos}></ImageSlider>
            </Grid>
          </Grid>
          <Container sx={{ marginBottom: "3em" }}>
            <AdMap ad={ad} />
          </Container>
        </>
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
