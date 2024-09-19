import { Problems } from "./profile";
import { getCookie, waitForElement } from "./Utils";


// some fucking annoying constant (ton thoi gian vl)

const NHP_RESULT_ACCEPTED = 0;
const NHP_RESULT_TIMED_OUT = 1
const NHP_RESULT_TIMED_OUT_BUT_WITH_DIFFERENT_NUMBER = 2; // wtf
const NHP_RESULT_OUT_OF_MEMORY = 3;
const NHP_RESULT_ERROR = 4;
const NHP_RESULT_SYSTEM_ERROR = 5;
const NHP_RESULT_QUEUE = 6;
const NHP_RESULT_IN_PROGRESS = 7;
const NHP_RESULT_BARELY_ACCEPTED = 8;
const NHP_RESULT_COMPILE_ERROR = -2;
const NHP_RESULT_WRONG_ANSWER = -1;


const acButtonBorderGreen = "#19be6b";
const acButtonBackgroundGreen = "#19be6b";

const acButtonBorderRed = "#ed4014";
const acButtonBackgroundRed = "#ed4014";

const acButtonBorderBlue = "#2db7f5";
const acButtonBackgroundBlue = "#2db7f5";

const acButtonBorderOrange = "#f90";
const acButtonBackgroundOrange = "#f90";

const acButtonBorderGrey = "#e0e0e0";
const acButtonBackgroundGrey = "#e0e0e0";



function setProblemBoxColor(problemBox: HTMLElement, backround: string, border: string) {
    let spanText = problemBox.lastChild as HTMLElement;
    spanText.style.color = "#ffffff"; // mù mắt text
    problemBox.style.borderColor = border;
    problemBox.style.background = backround;
}


async function getUserProblems(username: string): Promise<Problems> {
    let response = await fetch(
        `/api/profile?username=${username}`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json; charset=UTF-8",
                "X-CSRFToken": getCookie("csrftoken"),
            }
        }
    );
    let data = await response.json();
    return data["data"]["oi_problems_status"]["problems"]; // todo: implement acms problem (cuz mrp hate acm :v)
}


function getProblemStatus(problemsList: Problems, problemId: string) {
    for (let key in problemsList) {
        let val = problemsList[key];
        if (val["_id"] == problemId) {
            return val["status"];
        }
    }
    return -69;
}


function drawStatus(problemsList: Problems, problemDiv: HTMLElement) {
    for (var i=0; i<problemDiv.children.length; i++) {
        let problemBoxButton = problemDiv.children[i].firstChild as HTMLButtonElement;
        problemBoxButton.style.backgroundColor = acButtonBackgroundGrey;
        let problemId = problemBoxButton.textContent.trim(); // cay
        let status = getProblemStatus(problemsList, problemId);
        console.log(`Van De Ky Nang: ${problemId}   Stat: ${status}`);
        switch (status) {
            case NHP_RESULT_ACCEPTED:
                setProblemBoxColor(
                    problemBoxButton,
                    acButtonBackgroundGreen,
                    acButtonBorderGreen
                );
                break;
            case NHP_RESULT_COMPILE_ERROR:
                setProblemBoxColor(
                    problemBoxButton,
                    acButtonBackgroundOrange,
                    acButtonBorderOrange
                );
                break;
            case NHP_RESULT_QUEUE:
            case NHP_RESULT_IN_PROGRESS:
            case NHP_RESULT_BARELY_ACCEPTED:
                setProblemBoxColor(
                    problemBoxButton,
                    acButtonBackgroundBlue,
                    acButtonBorderBlue
                );
                break;
            case NHP_RESULT_ERROR:
            case NHP_RESULT_TIMED_OUT:
            case NHP_RESULT_WRONG_ANSWER:
            case NHP_RESULT_SYSTEM_ERROR:
            case NHP_RESULT_OUT_OF_MEMORY:
            case NHP_RESULT_TIMED_OUT_BUT_WITH_DIFFERENT_NUMBER:
                setProblemBoxColor(
                    problemBoxButton,
                    acButtonBackgroundRed,
                    acButtonBorderRed
                );
                break;
        }
    }
}




export async function UserHomeAddon() { // callback hell, idkare, it's looks comfortable
    waitForElement("#problems").then(
        (problemsDiv) => {
            waitForElement(".drop-menu-title > span:nth-child(1)").then(
                (usernameSpan) => {
                    getUserProblems(usernameSpan.textContent).then(
                        (problemsList: Problems) => {
                            var [_, acProblemsDiv, _, bcProblemsDiv] = problemsDiv.children;
                            drawStatus(problemsList, <HTMLElement>acProblemsDiv);
                            drawStatus(problemsList, <HTMLElement>bcProblemsDiv);
                        }
                    );
                }
            );
        }
    );
}