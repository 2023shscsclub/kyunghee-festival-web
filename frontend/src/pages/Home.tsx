import React from "react";

export default function Home() {
    return
        <div className={"w-full relative z-10"}>
            <div className={"w-full bg-main flex flex-col justify-center items-center text-white"}>
                <div className={"w-full flex flex-col items-center bg-black"}>
                    <img src={"./vr.png"} alt={"vr"} className={"w-60 mx-auto rounded-2xl my-6"}/>
                    <h1 className={"text-3xl font-extrabold w-60"}>VR체험</h1>
                </div>
                <div className={"w-full flex flex-col items-center"}>
                    <img src={"./tiktaktoe.png"} alt={"vr"} className={"w-60 mx-auto rounded-2xl my-6"}/>
                    <h1 className={"text-3xl font-extrabold w-60"}>AI VS 인간</h1>
                </div>
                <div className={"w-full flex flex-col items-center bg-black"}>
                    <img src={"./cafe.png"} alt={"vr"} className={"w-60 mx-auto rounded-2xl my-6"}/>
                    <h1 className={"text-3xl font-extrabold w-60"}>로봇팔 카페</h1>
                </div>
            </div>
        </div>
    );
}
