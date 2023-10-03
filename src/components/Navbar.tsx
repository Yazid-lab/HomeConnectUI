import React from "react";
import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Button,
  Link,
  Fab,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import { useTranslation } from "react-i18next";
import { Link as RouterLink } from "react-router-dom";
import { useAuth } from "../auth/contexts/AuthProvider";
export default function Navbar() {
  const { userInfo, logout, isLoggingOut } = useAuth();
  const { t } = useTranslation();
  const pages = [
    { label: t("common.navbar.rent"), url: "/rent" },
    { label: "Post an Advert", url: "/sell" },
  ];
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const handleLogout = () => {
    logout()
      .then(() => console.log("logged out apparently"))
      .catch((e) => console.log("some logout error happened", e));
  };
  return (
    <AppBar position="static" style={{ background: "#2E3B55" }}>
        <Toolbar disableGutters>
          {/* This will be shown only when screen size is middle */}
          <Link component={RouterLink} to="/">
            <HomeIcon
              sx={{
                display: { xs: "none", md: "flex" },
                mr: 1,
                ml:5,
                textDecoration: "none",
                color: "white",
              }}
            />
          </Link>
          <Typography
            variant="h6"
            noWrap
            component={RouterLink}
            to="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".1rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            {t("common.navbar.home")}
          </Typography>
          {/* This will be shown only when screen size is middle */}

          {/* This will be shown only when screen size is small */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page["label"]} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page["label"]}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <HomeIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component={RouterLink}
            to=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".1rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            {t("common.navbar.home")}
          </Typography>
          {/* This will be shown only when screen size is small */}

          {/* This will be shown only when screen size is middle */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page["label"]}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                <Typography
                  component={RouterLink}
                  to={page["url"]}
                  textAlign="center"
                  sx={{ textDecoration: "none", color: "white" }}
                >
                  {page["label"]}
                </Typography>
              </Button>
            ))}
          </Box>
          {/* This will be shown only when screen size is middle */}

          {userInfo ? (
            <div>
            <Button sx={{ my: 2, color: "white" }}>
              <Typography
                variant="h6"
                noWrap
                component={RouterLink}
                to="/profile"
                sx={{
                  mr: 2,
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".1rem",
                  color: "white",
                  textDecoration: "none",
                }}
              >
                {"Profile"}
              </Typography>

            </Button>
              <Fab
                aria-label="logout"
                color="primary"
                disabled={isLoggingOut}
                onClick={handleLogout}
              >
                <LogoutIcon
                  sx={{
                    display: { xs: "none", md: "flex" },
                    mr: 1,
                    textDecoration: "none",
                    color: "white",
                  }}
                />
              </Fab></div>
          ) : (
            <div style={{ display: "flex" }}>
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white" }}
              >
                <Typography
                  variant="h6"
                  noWrap
                  component={RouterLink}
                  to="/login"
                  sx={{
                    mr: 2,
                    fontFamily: "monospace",
                    fontWeight: 700,
                    letterSpacing: ".1rem",
                    color: "white",
                    textDecoration: "none",
                  }}
                >
                  {t("auth.login.title")}
                </Typography>
              </Button>
              <Button sx={{ my: 2, color: "white" }}>
                <Typography
                  variant="h6"
                  noWrap
                  component={RouterLink}
                  to="/register"
                  sx={{
                    mr: 2,
                    fontFamily: "monospace",
                    fontWeight: 700,
                    letterSpacing: ".1rem",
                    color: "lightblue",
                    textDecoration: "none",
                  }}
                >
                  {t("auth.register.title")}
                </Typography>
              </Button>
            </div>
          )}
        </Toolbar>
    </AppBar>
  );
}
