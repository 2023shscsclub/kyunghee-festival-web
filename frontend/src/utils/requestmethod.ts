import Cookies from "js-cookie";

const backend_root = "https://mbp16.ez0.us/csclub/";

export function getOrder() {
    const phone = Cookies.get("phone");

    fetch(backend_root + `order/?data=only&phone=${phone}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }).then((response) => {

    })
}

export function postOrder(body: string) {
    fetch(backend_root + "order/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: body
    }).then((response) => {
        if (response.status === 200) {
            alert("주문이 완료되었습니다.");
        } else {
            alert("주문에 실패하였습니다.\n동일한 전화번호로 2개 이상의 주문을 하실 수 없습니다.");
        }
    })
}

export function getTiktaktoe() {
    fetch(backend_root + "tiktaktoe/?data=all", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }).then((response) => {
        if (response.status === 200) {
            return response.json();
        } else {
            alert("서버에 오류가 발생하였습니다.");
        }
    })
}