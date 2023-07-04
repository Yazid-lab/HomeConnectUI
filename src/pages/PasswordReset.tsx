import { Container } from "@mui/material";
import PasswordResetForm from "../componenents/PasswordResetForm";

export default function PasswordReset() {
  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        flexDirection: "column",
        marginTop: 25,
      }}
    >
      <PasswordResetForm />
    </Container>
  );
}
