import { Form, Formik } from "formik";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import { Typography, TextField, Button, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
export default function PasswordResetForm() {
  const { t } = useTranslation();
  const loginValidationSchema = Yup.object({
    email: Yup.string()
      .email(t("common.validations.email"))
      .required(t("common.validations.required")),
  });
  const loginFormInitialValues = {
    email: "",
  };
  const handleLogin = () => {
    console.log("reset password");
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
          {t("auth.resetPassword.title")}
        </Typography>
        <Typography align="justify">
          {t("auth.resetPassword.subTitle")}
        </Typography>
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
              {t("auth.resetPassword.button.label")}
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
