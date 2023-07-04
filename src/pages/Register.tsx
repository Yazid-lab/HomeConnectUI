import React from "react";
import { Container } from "@mui/material";
import RegisterForm from "../componenents/RegisterForm";
export default function Register() {
  return (
    <Container
      maxWidth="xs"
      sx={{
        display: "flex",
        flexDirection: "column",
        marginTop: 25,
      }}
    >
      <RegisterForm />
    </Container>
  );
}
