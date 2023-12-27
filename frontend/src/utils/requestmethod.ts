import Cookies from "js-cookie";

const backend_root = "https://mbp16.ez0.us/csclub/";

export function getOrder(): Promise<any> {
    const phone = Cookies.get("phone");

    return new Promise((resolve, _) => {
        fetch(backend_root + `orders/?data=only&phone=${phone}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(res => {
            if (res.status === 200) {
                return resolve(res.json());
            } else {
                alert("서버에 오류가 발생하였습니다.");
            }
        })
    })
}

export function getOrderPeople(): Promise<any> {
    const phone = Cookies.get("phone");

    return new Promise((resolve, _) => {
        fetch(backend_root + `orders/?data=people&phone=${phone}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(res => {
            if (res.status === 200) {
                return resolve(res.json());
            } else {
                alert("서버에 오류가 발생하였습니다.");
            }
        })
    })
}

export function postOrder(body: string, phone: string) {
    fetch(backend_root + "orders/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: body
    }).then((response) => {
        if (response.status === 201) {
            alert("주문이 완료되었습니다.");
            Cookies.set("phone", phone);
        } else {
            alert("주문에 실패하였습니다.\n동일한 전화번호로 2번 이상 주문하실 수 없습니다.");
        }
        window.location.reload();
    })
}

export function getTiktaktoe(): Promise<any> {
    return new Promise((resolve, _) => {
        fetch(backend_root + "tiktaktoe/?data=all", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(res => {
            if (res.status === 200) {
                return resolve(res.json());
            } else {
                alert("서버에 오류가 발생하였습니다.");
            }
        })
    })
}