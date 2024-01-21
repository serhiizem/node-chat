import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {Sidebar} from "./components/Sidebar/Sidebar";
import {ThemeProvider} from "@mui/material";
import {theme} from "./theme/theme";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <Sidebar/>
        </ThemeProvider>
    </React.StrictMode>
);

reportWebVitals();
