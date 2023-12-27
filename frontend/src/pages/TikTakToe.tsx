import React, {Fragment, useEffect, useState} from "react";
import {getTiktaktoeCurrent, getTiktaktoePast} from "../utils/requestmethod";

export default function TikTakToe() {
    const [currentData, setCurrentData] = useState(
        {board: [[], [], []], nickname: "", winner: "", turn: ""})
    const [pastDatas, setPastDatas] = useState(
        [{code: 0, board: [[], [], []], nickname: "", winner: "", turn: ""}])
    const [checkTimer, setCheckTimer] = useState(false);

    let timeout: NodeJS.Timeout;

    useEffect(() => {
        getTiktaktoePast().then((response) => {
            setPastDatas(response)
            console.log(response)
        })
        getCurrentData()
    }, []);
    useEffect(() => {
        if ((currentData.winner === "O") || (currentData.winner === "X") || (currentData.winner === "Draw") || (currentData.winner === null)) {
            clearTimeout(timeout);
            getTiktaktoePast().then((response) => {
                setPastDatas(response)
            })
        } else {
            clearTimeout(timeout);
            timeout = setTimeout(() => {getCurrentData();}, 10000);
        }
    }, [checkTimer]);

    function getCurrentData() {
        getTiktaktoeCurrent().then((response) => {
            setCurrentData(response)
            setCheckTimer(!checkTimer);
        })
    }

    return (
        <div className={"w-full bg-main z-10"}>
            <div className={"w-full h-20 bg-main flex justify-center items-center"}>
                <h1 className={"text-white text-4xl font-bold"}>틱택토</h1>
            </div>
            <div className={"text-white"}>
                <h1 className={"text-green-400 text-2xl font-bold text-center mb-3"}>현재 진행중인 경기</h1>
                {currentData.winner === null ? <h1 className={"text-lg font-bold mx-5 my-2"}>현재 진행중인 경기가 없습니다.</h1> :
                    <TikTakToeView data={currentData}/>}
            </div>
            <div className={"text-black"}>
                <h1 className={"text-green-400 text-2xl font-bold text-center mt-3 mb-3"}>지난 경기</h1>
                {pastDatas.map((data) => {
                    return (
                        <div>
                            <details className={"w-fit bg-white rounded-xl min-h-12 p-3 mt-5 mx-5"}>
                                <summary className={`
                                ${data.winner === "O" && "text-red-600"}
                                ${data.winner === "X" && "text-blue-600"}
                                ${data.winner === "Draw" && "text-green-600"}
                                w-fit
                                `}>{data.nickname}</summary>
                                <TikTakToeView data={data}/>
                            </details>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}

function TikTakToeView(props: {
    data: { board: string[][], nickname: string, winner: string | null, turn: string | null }
}) {
    function getTurn(turn: string) {
        switch (turn) {
            case "player":
                return "O(플레이어)";
            case "computer":
                return "X(컴퓨터)";
        }
    }

    function getWinner(winner: string | null) {
        switch (winner) {
            case "O":
                return props.data.nickname + "(O)";
            case "X":
                return "컴퓨터(X)";
            case "Draw":
                return "무승부";
            default:
                return "진행중";
        }
    }

    return (
        <div className={"w-full"}>
            <h1 className={"text-lg font-bold mx-5 my-2"}>닉네임: {props.data.nickname}</h1>
            {props.data.turn === null ? null : <h1 className={"text-lg font-bold mx-5 my-2"}>차례: {getTurn(props.data.turn)}</h1>}
            <h1 className={"text-lg font-bold mx-5 my-2"}>승자: {getWinner(props.data.winner)}</h1>
            <table className={"w-60 h-60 b-4 bg-white table-fixed mx-5 my-2"}>
                <tbody>
                {props.data.board.map((row) => {
                    return (
                        <tr>
                            {row.map((col) => {
                                return (
                                    <td className={`border-2 border-main 
                                    ${col === "O" && "text-red-600"}
                                    ${col === "X" && "text-blue-600"}
                                    ${col === "_" && "text-white"}
                                    text-center text-5xl font-extrabold`}>{col}</td>
                                )
                            })}
                        </tr>
                    )
                })}
                </tbody>
            </table>
        </div>
    );
}