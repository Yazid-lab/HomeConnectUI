import { useCallback, useMemo, useRef, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  MarkerProps,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "../pages/LocationMap.css";
import icon from "leaflet/dist/images/marker-icon.png";
import L from "leaflet";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

export interface Location {
  latitude: number;
  longitude: number;
}
const center = {
  lat: 36.72375056469924,
  lng: 10.21282196044922,
};

interface MapProps {
  handleLocationChange: any;
}

function DraggableMarker({ handleLocationChange }: MapProps) {
  const [draggable, setDraggable] = useState(false);
  const [position, setPosition] = useState(center);
  const markerRef = useRef<any>(null);
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          setPosition(marker.getLatLng());
        }
        handleLocationChange({
          latitude: marker.getLatLng()["lat"],
          longitude: marker.getLatLng()["lng"],
        });
        console.log(marker.getLatLng());
      },
    }),
    []
  );
  const toggleDraggable = useCallback(() => {
    setDraggable((d) => !d);
  }, []);

  return (
    <Marker
      draggable={draggable}
      eventHandlers={eventHandlers}
      position={position}
      ref={markerRef}
    >
      <Popup minWidth={90}>
        <span onClick={toggleDraggable}>
          {draggable
            ? "Marker is draggable"
            : "Click here to make marker draggable"}
        </span>
      </Popup>
    </Marker>
  );
}

const LocationMap = ({ handleLocationChange }: MapProps) => {
  let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
  });

  L.Marker.prototype.options.icon = DefaultIcon;

  return (
    <div>
      <MapContainer
        center={center}
        zoom={13}
        scrollWheelZoom={true}
        style={{ height: 600, width: 800 }}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <DraggableMarker handleLocationChange={handleLocationChange} />
      </MapContainer>
    </div>
  );
};

export default LocationMap;
