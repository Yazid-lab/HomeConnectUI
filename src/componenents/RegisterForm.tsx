import { Form, Formik } from "formik";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import { Typography, TextField, Button, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

export default function RegisterForm() {
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
    console.log("register");
  };
  const RegisterFormHeader = () => {
    return (
      <div>
        <Typography
          align="left"
          component="h1"
          variant="h4"
          sx={{ fontWeight: "bold", marginBottom: "16px" }}
        >
          {t("auth.register.title")}
        </Typography>
      </div>
    );
  };
  const RegisterFormFooter = () => {
    return (
      <div>
        <Link component={RouterLink} to="/login" underline="hover">
          {t("auth.register.alreadyRegistered")}
        </Link>
      </div>
    );
  };
  return (
    <div>
      <RegisterFormHeader />
      <Formik
        initialValues={loginFormInitialValues}
        onSubmit={handleLogin}
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
              error={props.touched.email && Boolean(props.errors.email)}
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
          </Form>
        )}
      </Formik>
      <RegisterFormFooter />
    </div>
  );
}
