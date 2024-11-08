import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom"; // or use HashRouter
import App from "./App";
import "./index.css";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
root.render(
    <React.StrictMode>
        <HashRouter>
            {" "}
            <App />
        </HashRouter>
    </React.StrictMode>
);
