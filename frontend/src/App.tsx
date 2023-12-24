import React from 'react';
import {createBrowserRouter, Outlet, ScrollRestoration} from "react-router-dom";
import './App.css';
import HeadBar from "./components/headbar";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [

        ]
    }
]);

function App() {
    return (
        <div className="w-full h-full bg-main" id={"App"}>
            <HeadBar/>
            <Outlet/>
            <ScrollRestoration/>
        </div>
    );
}

export default router;
