import { useParams } from "react-router-dom";
import useGetAd from "../hooks/useGetAd";
import {
  Box,
  CircularProgress,
  Container,
  Paper,
  Typography,
} from "@mui/material";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "../pages/LocationMap.css";
import icon from "leaflet/dist/images/marker-icon.png";
import L from "leaflet";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import { Ad } from "../types/ad";

const AdMap = ({ ad }: { ad: Ad }) => {
  return (
    <Container>
      <MapContainer
        center={[ad.address.latitude, ad.address.longitude]}
        zoom={13}
        scrollWheelZoom={true}
        style={{ height: 600, width: 800 }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[ad.address.latitude, ad.address.longitude]}></Marker>
      </MapContainer>
    </Container>
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
        <Container maxWidth="xl" sx={{ marginTop: "5em" }}>
          <Box display="flex">
            <Box flex="auto" sx={{ marginRight: "4em" }}>
              <Container style={{ marginTop: "180px" }}>
                <AdDetails ad={ad} />
              </Container>
            </Box>
            <Box flex="auto">
              <AdMap ad={ad} />
            </Box>
          </Box>
        </Container>
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
