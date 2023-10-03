import React, { useState } from "react";
import { Typography, Container, Box } from "@mui/material";
import axios from "axios";
import { useAuth } from "../../auth/contexts/AuthProvider";
import { Ad, adTypeEnum } from "../types/ad";
import LocationMap from "../components/DraggableLocationMap";
import AdDetailsFields from "../components/AdDetailsFields";
import { Navigate } from "react-router-dom";
export default function Sell() {
  const { userInfo } = useAuth();
  const [location, setLocation] = useState({
    latitude: 36.72375056469924,
    longitude: 10.21282196044922,
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
    adType: adTypeEnum.Rent,
    files: null as File[] | null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log(e.target);
    setFormData({
      ...formData,
      [name]: value,
    });
    console.log(formData);
    console.log(location);
  };
  const handleAdTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const adTypeValue =
      e.target.value === "Rent" ? adTypeEnum.Rent : adTypeEnum.Sell;
    setFormData({
      ...formData,
      adType: adTypeValue,
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files != null) {
      const filesArray = Array.from(files);
      setFormData({
        ...formData,
        files: filesArray,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.files != null) {
      const uploadPromises = formData.files.map(async (file) => {
        const response = await axios({
          method: "post",
          url: "https://localhost:7262/image",
          data: { image: file },
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log(response.data);
        return { url: response.data, description: "" };
      });

      const photosUrl = await Promise.all(uploadPromises);

      const adObject: Partial<Ad> = {
        title: formData.title,
        datePublication: new Date(),
        price: formData.price,
        area: formData.area,
        nbRooms: formData.nbRooms,
        photos: photosUrl,
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
        adType: formData.adType,
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
        adType: adTypeEnum.Rent,
        files: null as File[] | null,
      });
    }
  };

  if (userInfo)
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
                  handleAdTypeChange={handleAdTypeChange}
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
  else return <Navigate to="/login" />;
}
