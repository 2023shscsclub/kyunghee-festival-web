import React, {Fragment, useEffect, useState} from "react";
import {getTiktaktoeCurrent, getTiktaktoePast, putTiktaktoe} from "../utils/requestmethod";

export default function TikTakToe() {
    const [currentData, setCurrentData] = useState(
        {board: [[], [], []], nickname: "", winner: "", turn: null})
    const [pastDatas, setPastDatas] = useState(
        [{code: 0, board: [[], [], []], nickname: "", winner: "", turn: ""}])
    const [checkTimer, setCheckTimer] = useState(false);
    const [viewMode, setViewMode] = useState("nothing")
    const [newGameInput, setNewGameInput] = useState({code: 0, nickname: ""})

    let timeout: NodeJS.Timeout;

    useEffect(() => {
        getTiktaktoePast().then((response) => {
            setPastDatas(response)
        })
        getCurrentData()
    }, []);
    useEffect(() => {
        if ((currentData.winner === "O") || (currentData.winner === "X") || (currentData.winner === "Draw") || (currentData.turn === null)) {
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
            console.log(response);
            judgeViewMode(response);
            setCurrentData(response);
            setCheckTimer(!checkTimer);
        })
    }

    function judgeViewMode(data: {board: string[][], nickname: string, winner: string | null, turn: string | null}) {
        if (data.turn === null) {
            setViewMode("nothing")
        } else {
            if (data.nickname === null) {
                setViewMode("new")
            } else {
                setViewMode("doing")
            }
        }
    }

    function validateInput() {
        if (!(/[0-9]{6}/.test(newGameInput.code.toString()))) {
            alert("코드는 숫자 6자리입니다.")
            return false
        }
        if (!(/[가-힣a-zA-Z0-9]{2,}/.test(newGameInput.nickname))) {
            alert("닉네임은 영문/한글/숫자 2자 이상으로 이루어져야 합니다.")
            return false
        }
        return true
    }

    function startNewGame() {
        if (!validateInput()) {
            return
        }
        putTiktaktoe(JSON.stringify(newGameInput))
    }

    return (
        <div className={"w-full bg-main z-10"}>
            <div className={"w-full h-20 bg-main flex justify-center items-center"}>
                <h1 className={"text-white text-4xl font-bold"}>틱택토</h1>
            </div>
            <div className={"text-white"}>
                <h1 className={"text-green-400 text-2xl font-bold text-center mb-3"}>현재 진행중인 경기</h1>
                {viewMode === "new" &&
                    <div className={"flex flex-col items-center"}>
                        <h1>코드와 닉네임을 입력해주세요</h1>
                        <input className={"w-68 h-10 bg-white rounded-xl p-3 mt-5 text-black"} type={"number"} placeholder={"코드"}
                               onKeyUp={(e) => {
                                      setNewGameInput({...newGameInput, code: parseInt((e.target as HTMLInputElement).value)})
                               }}/>
                        <input className={"w-68 h-10 bg-white rounded-xl p-3 mt-5 text-black"} type={"text"} placeholder={"닉네임"}
                               onKeyUp={(e) => {
                                        setNewGameInput({...newGameInput, nickname: (e.target as HTMLInputElement).value})
                               }}/>
                        <button className={"w-68 h-10 bg-orange-400 rounded-xl px-3 mt-5 text-black font-bold text-xl"} onClick={startNewGame}>
                            <h1>새로운 게임 시작하기</h1>
                        </button>
                    </div>}
                {viewMode === "nothing" && <h1 className={"text-lg font-bold mx-5 my-2"}>현재 진행중인 경기가 없습니다.</h1>}
                {viewMode === "doing" && <TikTakToeView data={currentData}/>}
            </div>
            <div className={"text-black"}>
                <h1 className={"text-green-400 text-2xl font-bold text-center mt-3 mb-3"}>지난 경기</h1>
                <div className={"flex-col-reverse"}>
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