import { Grid, TextField, Button } from "@mui/material";

interface TextFieldsProps {
  formData: any; // Replace 'any' with the actual type for formData
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleFileUpload:any
}

export default function AdDetailsFields({ formData, handleChange,handleFileUpload }:TextFieldsProps) {
  return (
    <Grid container direction="column"  justifyContent="space-evenly" spacing={2}>
      <Grid item xs={1}>
        <TextField
          label="Title"
          name="title"
          variant="outlined"
          fullWidth
          value={formData.title}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={1}>
        <TextField
          label="Description"
          name="description"
          variant="outlined"
          fullWidth
          value={formData.description}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={1}>
        <TextField
          label="Price"
          name="price"
          variant="outlined"
          fullWidth
          value={formData.price}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={1}>
        <TextField
          label="Area"
          name="area"
          variant="outlined"
          fullWidth
          value={formData.area}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={1}>
        <TextField
          label="Number of Rooms"
          name="nbRooms"
          variant="outlined"
          fullWidth
          value={formData.nbRooms}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={1}>
        <TextField
          label="Street"
          name="street"
          variant="outlined"
          fullWidth
          value={formData.street}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={1}>
        <TextField
          label="Town"
          name="town"
          variant="outlined"
          fullWidth
          value={formData.town}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={1}>
        <TextField
          label="Post Code"
          name="postCode"
          variant="outlined"
          fullWidth
          value={formData.postCode}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={1}>
        <TextField
          label="Country"
          name="country"
          variant="outlined"
          fullWidth
          value={formData.country}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={1}>
        <input
          type="file"
          accept=".jpg, .png, .jpeg"
          onChange={handleFileUpload}
          multiple
        />
      </Grid>
      <Grid item xs={1} alignSelf="center">
        <Button type="submit" variant="contained" color="primary" style={{padding:"8px",marginBottom:"5px"}}>
          Submit
        </Button>
      </Grid>
    </Grid>
  );
}
