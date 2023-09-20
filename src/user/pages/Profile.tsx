import { Navigate } from "react-router-dom";
import { useAuth } from "../../auth/contexts/AuthProvider";
import { Button, Container, Paper, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
export default function Profile() {
  const { userInfo } = useAuth();
  console.log(userInfo);
  if (!userInfo) {
    return <Navigate to={`${process.env.PUBLIC_URL}/login`} />;
  } else {
    return (
      <Container maxWidth="sm" sx={{ mt: 5 }}>
        <Paper elevation={3} style={{ padding: "20px" }}>
          <Typography variant="h4" gutterBottom>
            Profile Page
          </Typography>
          <div>
            <Typography variant="subtitle1">
              <strong>First Name:</strong> {userInfo.firstName}
            </Typography>
          </div>
          <div>
            <Typography variant="subtitle1">
              <strong>Last Name:</strong> {userInfo.lastName}
            </Typography>
          </div>
          <div>
            <Typography variant="subtitle1">
              <strong>Email:</strong> {userInfo.email}
            </Typography>
          </div>
          <div>
            <Typography variant="subtitle1">
              <strong>Telephone Number:</strong>{" "}
              {userInfo.telephone == "" ? "Not Specified" : userInfo.telephone}
            </Typography>
          </div>
        <Button variant="contained" color="primary" href="#property-listings">
          <Typography
            component={RouterLink}
            to={"http://localhost:3001/react-material-admin/admin"}
            textAlign="center"
            sx={{ textDecoration: "none", color: "white" }}
          >
          Go to Admin Dashboard
          </Typography>
        </Button>
        </Paper>
      </Container>
    );
  }
}
