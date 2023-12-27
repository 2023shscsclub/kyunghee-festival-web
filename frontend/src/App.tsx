import React from 'react';
import {createBrowserRouter, Outlet, ScrollRestoration} from "react-router-dom";
import './App.css';
import HeadBar from "./components/headbar";
import Order from "./pages/Order";
import Home from "./pages/Home";
import TikTakToe from "./pages/TikTakToe";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            {
                path: "/",
                element: <Home/>
            },
            {
                path: "/order",
                element: <Order/>
            },
            {
                path: "/tiktaktoe",
                element: <TikTakToe/>
            }
        ]
    }], {
        basename: "/kyunghee-festival-web",
});

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
