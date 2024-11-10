import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "@/styles/globals.css";
import App from "./App.tsx";
import { Toaster } from "@/components/ui/toaster";
import ElectionBet from "./pages/election";
import MotivationPage from "./pages/motivation";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/election" element={<ElectionBet />} />
        <Route path="/motivation" element={<MotivationPage />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  </React.StrictMode>
);
