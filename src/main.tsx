import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "@/styles/globals.css";
import App from "./App.tsx";
import { Toaster } from "@/components/ui/toaster";
import ElectionBet from "./pages/election"; // Import the new BetTaker component

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/election", // Add a new route for the Bet Taker page
    element: <ElectionBet />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <Toaster />
  </React.StrictMode>
);
