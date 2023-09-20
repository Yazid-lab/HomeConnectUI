import * as React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Login from "./auth/pages/Login";
import Register from "./auth/pages/Register";
import PasswordReset from "./auth/pages/PasswordReset";
import AuthProvider from "./auth/contexts/AuthProvider";
import { QueryClient, QueryClientProvider } from "react-query";
import Rent from "./ads/pages/Rent";
import Profile from "./user/pages/Profile";
import Sell from "./ads/pages/Sell";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="/rent" element={<Rent />} />
      <Route path="/sell" element={<Sell />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/password_reset" element={<PasswordReset />} />
      <Route path="/profile" element={<Profile />} />
    </Route>
  )
);
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 0,
      suspense: true,
    },
  },
});
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
