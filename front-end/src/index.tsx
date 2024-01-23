import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import {ThemeProvider} from "@mui/material";
import {theme} from "./theme/theme";
import {RouterProvider} from "react-router-dom";
import {router} from "./router/router";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <RouterProvider router={router}/>
        </ThemeProvider>
    </React.StrictMode>
);

reportWebVitals();
