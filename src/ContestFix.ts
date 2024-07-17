"use Mr.P";
"use strict";

import { delay, getCookie, waitForElement } from "./Utils";


const RED = "#ed4014";
const BLUE = "#2b7dff";
const GREEN = "#19be6b";
const ORANGE = "#ffa410";


let getCookButton = () => document.getElementsByName("NHP-FAKE-BUTTON");
let getCurrentContestID = () => +window.location.href.split("/").at(-1);


async function checkContestAccess(contestID: number) {
    let resp = await fetch(
        `/api/contest/access?contest_id=${contestID}`,
        {
            method: "GET",
            headers: {
                "X-CSRFToken": getCookie("csrftoken"),
                "Content-Type": "application/json; charset=utf-8"
            }
        }
    )
    return (await resp.json())["data"]["access"];
}


async function contestLogin(contestID: number, password: string) {
    let resp = await fetch(
        "/api/contest/password",
        {
            method: "POST",
            body: JSON.stringify(
                {
                    password: password,
                    contest_id: contestID
                }
            ),
            headers: {
                "X-CSRFToken": getCookie("csrftoken"),
                "Content-Type": "application/json; charset=utf-8"
            }
        }
    )
    return (await resp.json())["data"] === true;
}


async function cleanUp(contestPasswordDiv: HTMLElement) {
    contestPasswordDiv.parentElement.removeChild(contestPasswordDiv); // kill ur self :))
    let rightPanels = (await waitForElement("div.ivu-card-body:nth-child(1) > ul:nth-child(1)")).children;
    for (var i=0; i<rightPanels.length; i++) rightPanels[i].className = ""; // enable right panel
}


function changeStatus(content: string, color: string) {
    waitForElement(".NHP-STATUS-PLACEHOLDER").then(
        (statusText: HTMLElement) => {
            statusText.style.color = color;
            statusText.textContent = content;
        }
    );
}


async function processLogin() {
    changeStatus("Đang Đăng Nhập...", BLUE);
    let contestID = getCurrentContestID();
    let passwordBox = await waitForElement(".ivu-input") as HTMLInputElement
    let password = passwordBox.value;

    let resp = (await contestLogin(contestID, password)) || (await contestLogin(contestID, atob("TkhQU0VC")+password)); // magic :)))
    if (resp) {
        changeStatus("ĐĂNG NHẬP THÀNH CÔNG!", GREEN);
        await delay(800);
        changeStatus("(Đã Đăng Nhập)", BLUE);
        cleanUp(passwordBox.parentElement.parentElement);
    } else {
        changeStatus("SAI MẬT KHẨU!", RED);
        await delay(800);
        changeStatus("(Chưa Đăng Nhập)", ORANGE);
    }

}


function createButton(title: string, rightPosPercentage: number = 6) {
    let button = document.createElement("button");
    button.setAttribute("class", "ivu-btn ivu-btn-info");
    button.innerText = title;
    button.type = "button";
    button.name = "NHP-FAKE-BUTTON";
    button.style.right = `${rightPosPercentage}%`;
    button.style.transform = `translateX(${rightPosPercentage}%)`;
    return button;
}


export async function ContestFix() {
    let isAuthenticated = await checkContestAccess(getCurrentContestID());
    waitForElement(".panel-title").then(
        (titleDiv) => {
            let statusText = document.createElement("b");
            statusText.className = "NHP-STATUS-PLACEHOLDER";

            if (isAuthenticated) {
                changeStatus("(Đã Đăng Nhập)", GREEN);
            } else {
                changeStatus("(Chưa Đăng Nhập)", ORANGE);
            }
            titleDiv.appendChild(statusText);
        }
    );

    if (!isAuthenticated) {  
        waitForElement(".contest-password").then(
            (contestPasswordDiv) => {
                if (getCookButton().length < 1) {
                    let originalButton = document.querySelector(".ivu-btn-info");
                    originalButton.remove();
                    let cookButton = createButton("Let him cook!");
                    cookButton.addEventListener("click", processLogin);
                    contestPasswordDiv.appendChild(cookButton);
                }
            }
        );
    }
}