import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { RouterProvider } from "react-router-dom";
import { router } from "./router/router";

ReactDOM.createRoot(document.getElementById("root")).render(
  <section className="max-w-7xl mx-auto">
    <React.StrictMode>
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
    </React.StrictMode>
  </section>
);
