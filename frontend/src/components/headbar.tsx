import React, {Fragment, useEffect, useState} from "react";

export default function HeadBar() {
    const [menuBarOpened, setMenuBarOpened] = useState(false);

    useEffect(() => {

    }, [menuBarOpened]);

    return (
        <Fragment>
            <div id="headbar" className={"w-full h-20 flex justify-between z-10 bg-main relative"}>
                <img src={"./clublogo.png"} alt={"홈으로"} className={"h-full"}/>
                <button className={"w-16 h-20"} id={"ment-button"} onClick={() => {setMenuBarOpened(!menuBarOpened)}}>
                    <svg id="menu-svg" viewBox="-5 -5 50 50" className={"w-14"}>
                        <path id="menu-svg1" fill="#FFFFFF" d="M33.3327 10H6.66602V15H33.3327V10Z"></path>
                        <path fill="#FFFFFF" d="M6.66602 18.3317H33.3327V23.3317H6.66602V18.3317Z"></path>
                        <path id="menu-svg2" fill="#FFFFFF" d="M6.66602 26.665H33.3327V31.665H6.66602V26.665Z"></path>
                    </svg>
                </button>
            </div>
            <Menu transition={menuBarOpened}/>
        </Fragment>
    );
}

function Menu(props: {transition: boolean}) {
    return (
        <div className={`${props.transition ? "-top-full" : "top-0"} relative bg-orange-400 duration-500 z-0 w-full`}
             id={"menu-bar"}>
            <h1 className={"text-white text-2xl left-2.5 relative"}>음료 주문</h1>
            <h1 className={"text-white text-2xl relative"}>틱택토</h1>
            <h1 className={"text-white text-2xl relative"}>메뉴</h1>
        </div>
    );
}