import React from "react";
import LoginForm from "../componenents/LoginForm";
import { Container } from "@mui/material";
export default function Login() {
  return (
    <div>
      <Container
        maxWidth="xs"
        sx={{
          display: "flex",
          flexDirection: "column",
          marginTop: 25,
        }}
      >
        <LoginForm />
      </Container>
    </div>
  );
}
