import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from "./store";
import {
    createBrowserRouter,
    RouterProvider ,
    Route,
    Link,
    RouterProviderProps,
} from "react-router-dom";

const router  = createBrowserRouter ([
    {
        path: "/",
        element: <App/>
    },
    {
        path: "/hola",
        element: <h1>hola2</h1>
    },

])

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);


root.render(
  <React.StrictMode>

              <RouterProvider  router={router}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
