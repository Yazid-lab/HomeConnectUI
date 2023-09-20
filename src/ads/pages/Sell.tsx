import React, { useState } from "react";
import {
  Typography,
  TextField,
  Button,
  Container,
  Grid,
  Input,
} from "@mui/material";

import axios from "axios";
import { useAuth } from "../../auth/contexts/AuthProvider";
import { Ad } from "../types/ad";
export default function Sell() {
  const { userInfo } = useAuth();
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
    latitude: 0,
    longitude: 0,
    file: null as File | null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file != null) {
      setFormData({
        ...formData,
        file: file!,
      });
    }
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
        latitude: formData.latitude,
        longitude: formData.longitude,
      },
      applicationUserId: userInfo?.id, 
      description: formData.description,
      isPublished: true, 
    };
    const {data} = await axios.post("https://localhost:7262/api/ads", adObject);
    console.log(data)
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
      latitude: 0,
      longitude: 0,
      file: null as File | null,
    });
  };

  return (
    <Container maxWidth="xs">
      <Typography variant="h4" gutterBottom style={{marginTop:"2em"}}>
      Post an advert:
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Title"
              name="title"
              variant="outlined"
              fullWidth
              value={formData.title}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Description"
              name="description"
              variant="outlined"
              fullWidth
              value={formData.description}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Price"
              name="price"
              variant="outlined"
              fullWidth
              value={formData.price}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Area"
              name="area"
              variant="outlined"
              fullWidth
              value={formData.area}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Number of Rooms"
              name="nbRooms"
              variant="outlined"
              fullWidth
              value={formData.nbRooms}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Street"
              name="street"
              variant="outlined"
              fullWidth
              value={formData.street}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Town"
              name="town"
              variant="outlined"
              fullWidth
              value={formData.town}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Post Code"
              name="postCode"
              variant="outlined"
              fullWidth
              value={formData.postCode}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Country"
              name="country"
              variant="outlined"
              fullWidth
              value={formData.country}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Latitude"
              name="latitude"
              variant="outlined"
              fullWidth
              value={formData.latitude}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Longitude"
              name="longitude"
              variant="outlined"
              fullWidth
              value={formData.longitude}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <input
              type="file"
              accept=".jpg, .png, .jpeg"
              onChange={handleFileUpload}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}
