import React, { useState } from "react";
import { Typography, Container, Box } from "@mui/material";
import axios from "axios";
import { useAuth } from "../../auth/contexts/AuthProvider";
import { Ad } from "../types/ad";
import LocationMap from "../components/DraggableLocationMap";
import AdDetailsFields from "../components/AdDetailsFields";
export default function Sell() {
  const { userInfo } = useAuth();
  const [location, setLocation] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: 0,
    area: 0,
    nbRooms: 0,
    street: "",
    town: "",
    postCode: "",
    country: "",
    file: null as File | null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    console.log(formData);
    console.log(location);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    console.log(e.target.files)
/*     if (file != null) {
      setFormData({
        ...formData,
        file: file!,
      });
    } */
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(formData.file);
    console.log(e);
    console.log(formData);
    let photoUrl = "";
    if (formData.file != null) {
      const { data } = await axios({
        method: "post",
        url: "https://localhost:7262/image",
        data: { image: formData.file },
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      photoUrl = data;
      console.log(photoUrl);
    }
    const adObject: Partial<Ad> = {
      title: formData.title,
      datePublication: new Date(),
      price: formData.price,
      area: formData.area,
      nbRooms: formData.nbRooms,
      photos: [{ url: photoUrl, description: "" }],
      address: {
        street: formData.street,
        town: formData.town,
        postCode: formData.postCode,
        country: formData.country,
        latitude: location.latitude,
        longitude: location.longitude,
      },
      applicationUserId: userInfo?.id,
      description: formData.description,
      isPublished: true,
    };
    const { data } = await axios.post(
      "https://localhost:7262/api/ads",
      adObject
    );
    console.log(data);
    setFormData({
      title: "",
      description: "",
      price: 0,
      area: 0,
      nbRooms: 0,
      street: "",
      town: "",
      postCode: "",
      country: "",
      file: null as File | null,
    });
  };

  return (
    <>
      <Typography variant="h4" gutterBottom style={{ marginTop: "1em" }}>
        Post an advert:
      </Typography>
      <Container>
        <form onSubmit={handleSubmit}>
          <Box display="flex">
            <Box flex="auto" marginRight="1em">
              <AdDetailsFields
                handleChange={handleChange}
                handleFileUpload={handleFileUpload}
                formData={formData}
              />
            </Box>
            <Box flex="1" marginTop="2em">
              <LocationMap handleLocationChange={setLocation} />
            </Box>
          </Box>
        </form>
      </Container>
    </>
  );
}
