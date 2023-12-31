import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/router";
import AuthProvider from "./AuthProvider/AuthProvider";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { DarkModeProvider } from "./Shared/DarkModeProvider/DarkModeProvider";
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <section className="max-w-7xl mx-auto">
    <AuthProvider>
      <DarkModeProvider>
        <QueryClientProvider client={queryClient}>
          <Toaster />
          <React.StrictMode>
            <RouterProvider router={router} />
          </React.StrictMode>
        </QueryClientProvider>
      </DarkModeProvider>
    </AuthProvider>
  </section>
);
