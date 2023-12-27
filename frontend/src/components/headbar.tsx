import React, {Fragment, useEffect, useState} from "react";
import {Link} from "react-router-dom";

export default function HeadBar() {
    const [menuBarOpened, setMenuBarOpened] = useState(false);

    useEffect(() => {

    }, [menuBarOpened]);

    return (
        <Fragment>
            <div id="headbar" className={"w-full h-20 flex justify-between z-30 bg-main relative"}>
                <Link to={""}>
                    <img src={"./clublogo.png"} alt={"홈으로"} className={"h-full"}/>
                </Link>
                <button className={"w-16 h-20"} id={"ment-button"} onClick={() => {setMenuBarOpened(!menuBarOpened)}}>
                    <svg id="menu-svg" viewBox="-5 -5 50 50" className={"w-14"}>
                        <path id="menu-svg1" fill="#FFFFFF" d="M33.3327 10H6.66602V15H33.3327V10Z"></path>
                        <path fill="#FFFFFF" d="M6.66602 18.3317H33.3327V23.3317H6.66602V18.3317Z"></path>
                        <path id="menu-svg2" fill="#FFFFFF" d="M6.66602 26.665H33.3327V31.665H6.66602V26.665Z"></path>
                    </svg>
                </button>
            </div>
            <Menu transition={menuBarOpened} menubarsetter={setMenuBarOpened}/>
        </Fragment>
    );
}

function Menu(props: {transition: boolean, menubarsetter: React.Dispatch<React.SetStateAction<boolean>>}) {
    return (
        <div className={`${!props.transition ? "-top-full" : "top-0"} fixed backdrop-blur duration-500 z-20 w-full
        flex flex-col justify-evenly items-center h-full`}
             id={"menu-bar"}>
            <Link className={"text-white text-5xl left-2.5 relative font-extrabold"} to={"/"}
                  onClick={() => {props.menubarsetter(false)}}>
                <h1>홈</h1>
            </Link>
            <Link className={"text-white text-5xl left-2.5 relative font-extrabold w-full text-center"} to={"/order"}
                  onClick={() => {props.menubarsetter(false)}}>
                <h1>음료 주문</h1>
            </Link>
            <Link className={"text-white text-5xl left-2.5 relative font-extrabold"} to={"/tiktaktoe"}
                  onClick={() => {props.menubarsetter(false)}}>
                <h1>틱택토</h1>
            </Link>
        </div>
    );
}