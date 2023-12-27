import React, {Fragment, useEffect, useState} from "react";
import {getOrder, getOrderPeople, postOrder} from "../utils/requestmethod";
import Cookies from "js-cookie";

export default function Order() {
    const [inputData, setInputData] = useState({name: "", phone: "", drink: ""});
    const [orderData, setOrderData] = useState({name: "", phone: "", drink: "", complete: false});
    const [peopleLeft, setPeopleLeft] = useState(-2);
    const [checkTimer, setCheckTimer] = useState(false);

    const phone = Cookies.get("phone");
    let timeout: NodeJS.Timeout;


    useEffect(() => {
        if (phone !== undefined) {
            getOrderData()
            getOrdersLeft();
        }
    }, [phone]);
    useEffect(() => {
        if (peopleLeft === -1) {
            clearTimeout(timeout);
            getOrderData()
        } else {
            clearTimeout(timeout);
            timeout = setTimeout(() => {getOrdersLeft();}, 10000);
        }
    }, [checkTimer]);

    function getOrderData() {
        getOrder().then((data) => {
            setOrderData(data);
        })
    }
    function getOrdersLeft() {
        getOrderPeople().then((data) => {
            setPeopleLeft(data);
            setCheckTimer(!checkTimer);
        })
    }

    function order() {
        if (!(/[가-힣a-zA-Z0-9]{2,}/.test(inputData.name))) {
            alert("이름은 영문/한글/숫자 2자 이상으로 이루어져야 합니다.");
            return;
        }
        if (!(/010\d{4}\d{4}/.test(inputData.phone))) {
            alert("전화번호는 010으로 시작하고 11자리여야 합니다.");
            return;
        }
        if (inputData.drink === "") {
            alert("음료를 선택해주세요.");
            return;
        }
        postOrder(JSON.stringify(inputData), inputData.phone)
    }

    function getDrinkName(drink: number) {
        switch (drink) {
            case 1:
                return "오렌지 주스";
            case 2:
                return "포도 주스";
            case 3:
                return "쿨피스";
            default:
                return "";
        }
    }

    return (
        <Fragment>
            <div className={"w-full h-20 bg-main flex justify-center items-center"}>
                <h1 className={"text-white text-4xl font-bold"}>음료 주문</h1>
            </div>
            {phone !== undefined ?
                <div className={"w-full h-1/2 flex flex-col justify-center bg-main z-10"}>
                    {peopleLeft !== -1 ?
                        <div>
                            <h1 className={"text-white text-center w-full text-2xl font-bold"}>{peopleLeft + 1}번째 음료로 준비중입니다</h1>
                            <h1 className={"text-white mt-3 w-full text-xl font-bold text-center"}>대기시간: 약 {peopleLeft + 1}분</h1>
                        </div> :
                        <div>
                            <h1 className={"text-white text-center w-full text-2xl font-bold"}>음료가 준비되었습니다</h1>
                        </div>}
                    <div className={"mt-7 mb-10"}>
                        <h1 className={"text-white py-1 mx-5 w-fit"}>주문 정보</h1>
                        <h1 className={"text-white py-1 mx-5 w-fit"}>이름: {orderData.name}</h1>
                        <h1 className={"text-white py-1 mx-5 w-fit"}>전화번호: {orderData.phone}</h1>
                        <h1 className={"text-white py-1 mx-5 w-fit"}>음료: {getDrinkName(Number(orderData.drink))}</h1>
                    </div>
                </div> :
                <div className={"w-full bg-main z-10"}>
                    <div className={"w-full h-52 overflow-y-hidden"}>
                        <img src={"./order_black.jpeg"} alt={"음료 주문"} className={"w-full"}/>
                    </div>
                    <div>
                        <div>
                            <h1 className={"text-white text-xl font-bold pt-3 pl-3"}>이름(닉네임)</h1>
                            <input required={true} type={"text"} pattern="[가-힣a-zA-Z0-9]{2,}"
                                   className={"bg-point border-gray-700 border-2 rounded-md w-fit h-12 p-3 m-2 text-white outline-0"}
                                   onKeyUp={(e) => {
                                       setInputData({...inputData, name: e.currentTarget.value});
                                   }}/>
                        </div>
                        <div>
                            <h1 className={"text-white text-xl font-bold pt-3 pl-3"}>전화번호</h1>
                            <input required={true} type={"tel"} pattern="010\d{4}\d{4}" placeholder="ex) 01000000000"
                                   className={"bg-point border-gray-700 border-2 rounded-md w-fit h-12 p-3 m-2 text-white outline-0"}
                                   onKeyUp={(e) => {
                                       setInputData({...inputData, phone: e.currentTarget.value});
                                   }}/>
                        </div>
                        <div>
                            <h1 className={"text-white text-xl font-bold pt-3 pl-3"}>음료</h1>
                            <select required={true}
                                    className={"bg-point border-gray-700 border-2 rounded-md w-fit h-12 p-3 m-2 text-gray-400 outline-0 valid:text-white"}
                                    onChange={(e) => {
                                        setInputData({...inputData, drink: e.currentTarget.value});
                                    }}>
                                <option value={""}>음료를 선택해주세요</option>
                                <option value={1}>오렌지 주스</option>
                                <option value={2}>포도 주스</option>
                                <option value={3}>쿨피스</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <button className={"w-40 h-12 bg-orange-400 rounded-md text-black font-bold text-2xl m-3"}
                                onClick={order}>주문하기
                        </button>
                    </div>
                </div>}
        </Fragment>
    );
}