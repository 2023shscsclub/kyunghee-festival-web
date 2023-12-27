import React from "react";

export default function Order() {
    return (
        <div className={"w-full bg-main z-10"}>
            <div className={"w-full h-20 bg-main flex justify-center items-center"}>
                <h1 className={"text-white text-4xl font-bold"}>음료 주문</h1>
            </div>
            <img src={"./order.png"} alt={"음료 주문"} className={"w-full h-52 overflow-y-hidden"}/>
        </div>
    );
}