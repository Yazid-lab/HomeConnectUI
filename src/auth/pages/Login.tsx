import React from "react";
import LoginForm from "../components/LoginForm";
import { Container } from "@mui/material";
import { useAuth } from "../contexts/AuthProvider";
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
