// come back to this
// import { extendTheme } from '@chakra-ui/react'
import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { CurrentUserProvider } from "./utils/context/index.jsx";
import HomePage from "./pages/HomePage.jsx";
import Signup from "./pages/Signup.jsx";
import { CookiesProvider } from "react-cookie";

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
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider>
      <CookiesProvider>
        <CurrentUserProvider>
          <RouterProvider router={router} />
        </CurrentUserProvider>
      </CookiesProvider>
    </ChakraProvider>
  </React.StrictMode>
);
