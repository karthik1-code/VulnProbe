import React from "react";

import ReactDOM from "react-dom/client";

import App from "./App";

import "./index.css";

import {
  AuthProvider,
} from "./context/AuthContext";

import {
  ScanProvider,
} from "./context/ScanContext";

ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <React.StrictMode>
    <AuthProvider>
      <ScanProvider>
        <App />
      </ScanProvider>
    </AuthProvider>
  </React.StrictMode>
);