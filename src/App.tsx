import * as React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Layout from "./componenets/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="/login" element={<Login/>}/>
    </Route>
  )
);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
