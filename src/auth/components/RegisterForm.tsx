import { Form, Formik } from "formik";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import { Typography, TextField, Button, Link, Alert } from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { UserInfo } from "../types/userInfo";
import { useRegister } from "../hooks/useRegister";
import { useState } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

export default function RegisterForm() {
  const { isRegistered, isRegistering, register } = useRegister();
  const [showMessage, setShowMessage] = useState<boolean>(false);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const loginValidationSchema = Yup.object({
    firstName: Yup.string()
      .max(30, t("common.validations.max", { size: 30 }))
      .required(t("common.validations.required")),
    lastName: Yup.string()
      .max(30, t("common.validations.max", { size: 30 }))
      .required(t("common.validations.required")),
    email: Yup.string()
      .email(t("common.validations.email"))
      .required(t("common.validations.required")),
    password: Yup.string()
      .min(8, t("common.validations.min", { size: 8 }))
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[-+_!@#$%^&*.,?]).*$/,
        t("common.validations.passwordMatch")
      )
      .required(t("common.validations.required")),
    telephone: Yup.string().matches(phoneRegExp, "Phone number is not valid"),
  });
  const loginFormInitialValues = {
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    telephone: "",
  };
  const handleRegister = (data: Partial<UserInfo>) => {
    register(data)
      .then((isRegistered) => {
        if (isRegistered) {
          navigate(`${process.env.PUBLIC_URL}/login`);
        }
      })
      .catch((err) => {
        setShowMessage(true);
      });
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
        onSubmit={(values) => handleRegister(values)}
        validationSchema={loginValidationSchema}
      >
        {(props) => (
          <Form>
            <TextField
              margin="normal"
              required
              fullWidth
              id="lastName"
              label={t("auth.register.form.lastName.label")}
              name="lastName"
              autoComplete="family-name"
              autoFocus
              value={props.values.lastName}
              onChange={props.handleChange}
              error={props.touched.lastName && Boolean(props.errors.lastName)}
              helperText={props.touched.lastName && props.errors.lastName}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="firstName"
              label={t("auth.register.form.firstName.label")}
              name="firstName"
              autoComplete="family-name"
              autoFocus
              value={props.values.firstName}
              onChange={props.handleChange}
              error={props.touched.firstName && Boolean(props.errors.lastName)}
              helperText={props.touched.firstName && props.errors.lastName}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="telephone"
              label={t("auth.register.form.telephone.label")}
              name="telephone"
              autoComplete="family-name"
              autoFocus
              value={props.values.telephone}
              onChange={props.handleChange}
              error={props.touched.telephone && Boolean(props.errors.telephone)}
              helperText={props.touched.telephone && props.errors.telephone}
            />
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
              {t("auth.register.submit")}
            </Button>

            {showMessage && (
              <Alert severity="error">
                An account with this email already exists
              </Alert>
            )}
          </Form>
        )}
      </Formik>
      <RegisterFormFooter />
    </div>
  );
}
