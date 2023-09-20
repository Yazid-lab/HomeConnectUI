import React, {useState} from "react"
import { Form, Formik } from "formik";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import { Typography, TextField, Button, Link, Alert } from "@mui/material";
import { Navigate, Link as RouterLink, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";
import { useLocalStorage } from "../../core/hooks/useLocalStorage";
export default function LoginForm() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [showMessage,setShowMessage] = useState<boolean>(false)
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
  const { isLoggingIn, login, isLoggedIn } = useAuth();
  const handleLogin = (email: string, password: string) => {
    login(email, password)
      .then((isLoggedIn) => {
        console.log(isLoggedIn)
        if (isLoggedIn) {
          navigate(`/${process.env.PUBLIC_URL}`)
        }
      })
      .catch((err) => {

      setShowMessage(true)
      });
  };
  const LoginFormHeader = () => {
    return (
      <div>
        <Typography
          align="left"
          component="h1"
          variant="h4"
          sx={{ fontWeight: "bold", marginBottom: "16px" }}
        >
          {t("auth.login.title")}
        </Typography>
        <Typography>
          {t("auth.login.newAccountLabel")}
          <Link component={RouterLink} to="/register" underline="hover">
            {t("auth.login.newAccountLink")}
          </Link>
        </Typography>
      </div>
    );
  };
  const LoginFormFooter = () => {
    return (
      <div>
        <Link component={RouterLink} to="/password_reset" underline="hover">
          {t("auth.login.forgotPasswordLink")}
        </Link>
      </div>
    );
  };
  return (
    <div>
      <LoginFormHeader />
      <Formik
        initialValues={loginFormInitialValues}
        onSubmit={(values) => handleLogin(values.email, values.password)}
        validationSchema={loginValidationSchema}
      >
        {(props) => (
          <Form>
            <TextField
              margin="normal"
              variant="outlined"
              fullWidth
              required
              id="email"
              label={t("auth.login.form.email.label")}
              name="email"
              autoComplete="email"
              autoFocus
              value={props.values.email}
              onChange={props.handleChange}
              error={(props.touched.email && Boolean(props.errors.email)) || isLoggedIn}
              helperText={props.touched.email && props.errors.email}
            />
            <TextField
              margin="normal"
              variant="outlined"
              fullWidth
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
            <Button
              variant="contained"
              fullWidth
              style={{
                marginTop: 10,
                marginBottom: 30,
                backgroundColor: "#2EA555",
              }}
              type="submit"
            >
              {t("auth.login.title")}
            </Button>
          {showMessage&& <Alert severity="error">Wrong Credentials</Alert>}
          </Form>
        )}
      </Formik>
      <LoginFormFooter />
    </div>
  );
}
