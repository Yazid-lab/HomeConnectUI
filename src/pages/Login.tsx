import React from "react";
import { Form, Formik } from "formik";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import { Typography, Box, TextField } from "@mui/material";
export default function Login() {
  const { t } = useTranslation();
  const loginValidationSchema = Yup.object({
    email: Yup.string()
      .email(t("common.validations.email"))
      .required(t("common.validations.required")),
    password: Yup.string()
      .min(8, t("common.validations.min", { size: 8 }))
      .required(t("common.validations.required")),
  });
  const loginFormInitialValues = {
    email: "",
    password: "",
  };
  const handleLogin = () => {
    console.log("login");
  };
  return (
    <Formik
      initialValues={loginFormInitialValues}
      onSubmit={handleLogin}
      validationSchema={loginValidationSchema}
    >
      {(props) => (
        <Form>
          <Box
            mt={20}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h4" sx={{fontWeight:'bold'}}>
              {t("auth.login.title")}
            </Typography>
            <TextField
              margin="normal"
              variant="filled"
              required
              id="email"
              label={t("auth.login.form.email.label")}
              name="email"
              autoComplete="email"
              autoFocus
              value={props.values.email}
              onChange={props.handleChange}
              error={props.touched.email && Boolean(props.errors.email)}
              helperText={props.touched.email && props.errors.email}
            />
            <TextField
              margin="normal"
              variant="filled"
              required
              name="password"
              label={t("auth.login.form.password.label")}
              type="password"
              id="password"
              autoComplete="current-password"
              value={props.values.password}
              onChange={props.handleChange}
              error={props.touched.password && Boolean(props.errors.password)}
              helperText={props.touched.password && props.errors.password}
            />
          </Box>
        </Form>
      )}
    </Formik>
  );
}
