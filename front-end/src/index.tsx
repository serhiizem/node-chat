import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import {ThemeProvider} from "@mui/material";
import AuthProvider from "react-auth-kit";
import {RouterProvider} from "react-router-dom";
import {theme} from "./providers/theme";
import {store} from "./providers/auth";
import {router} from "./providers/router";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <AuthProvider store={store}>
                <RouterProvider router={router}/>
            </AuthProvider>
        </ThemeProvider>
    </React.StrictMode>
);

reportWebVitals();
