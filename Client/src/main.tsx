import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import "normalize.css";
import "./index.css";
import { CookiesProvider } from 'react-cookie';
import router from "./router";
import store from "./store/store";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <CookiesProvider defaultSetOptions={{path: '/'}}>
            <Provider store={store}>
                <RouterProvider router={router} />
            </Provider>
        </CookiesProvider>
    </React.StrictMode>
);
