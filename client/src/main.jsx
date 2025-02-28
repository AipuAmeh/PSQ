// come back to this
// import { extendTheme } from '@chakra-ui/react'
import { ChakraProvider } from "@chakra-ui/react";
import React from "react";

import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { CookiesProvider } from "react-cookie";

import App from "./App.jsx";
import "./index.css";
import { CurrentUserProvider } from "./utils/context/index.jsx";
import HomePage from "./pages/HomePage.jsx";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import theme from "./Themes.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Contact from "./pages/Contact.jsx";
import PatientPage from "./pages/PatientPage.jsx";
import AddPharmacy from "./pages/AddPharmacy.jsx"
import About from "./pages/About.jsx";
import Services from "./pages/Services.jsx";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    // errorElement: ,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/reset-password/:token/:id',
        element: <ResetPassword />
      },
      {
        path: '/dashboard',
        element: <Dashboard />
      },
      {
        path: '/contact',
        element: <Contact />
      },
      {
        path: '/patient/:id',
        element: <PatientPage />
      },
      {
        path: '/:id/add-pharmacy',
        element: <AddPharmacy />
      }, 
      {
        path: '/about',
        element: <About />
      },
      // {
      //   path: '/services',
      //   element: <Services />
      // }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <CookiesProvider>
        <CurrentUserProvider>
          <RouterProvider router={router} />
        </CurrentUserProvider>
      </CookiesProvider>
    </ChakraProvider>
  </React.StrictMode>
);
