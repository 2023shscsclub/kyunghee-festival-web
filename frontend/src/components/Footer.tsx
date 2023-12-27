import React from "react";

export default function Footer() {
    return (
        <div className="w-full h-28 bg-main">
            <div className="text-gray-400 text-center font-bold">
                <h1>서울고등학교 컴퓨터 과학부 © 2023</h1>
            </div>
            <div className="flex justify-center gap-5 mt-3">
                <a className="w-10" href="https://instagram.com/seoul_cs.2023" id="instagram">
                    <img className="contact-svg" src="https://cdn.jsdelivr.net/npm/simple-icons@v8/icons/instagram.svg"/></a>
                <a className="w-10" href="https://github.com/2023shscsclub" id="github">
                    <img className="contact-svg" src="https://cdn.jsdelivr.net/npm/simple-icons@v8/icons/github.svg"/></a>
                <a className="w-10" href="mailto:seoulcsclub@gmail.com" id="email">
                    <img className="contact-svg" src="https://cdn.jsdelivr.net/npm/simple-icons@v8/icons/gmail.svg"/></a>
            </div>
        </div>
    );
}