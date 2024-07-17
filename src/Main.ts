"use Mr.P";
"use strict";

import { ContestFix } from "./ContestFix";
import { UserHomeAddon } from "./UserHomeAddon";


async function Main() { // khều donate thế cơ mà web vẫn suck, best Mr.P rồi :))
    console.log("NHP Fix by Irt291 Loaded!");
    let currentUrl = window.location.href.split("://").at(1);
    if (currentUrl.match(/^nhpoj\.net\/contest\/\d+$/)) { // regẽ lỏd
        await ContestFix(); // yo shut the fuck up and complete ur fucking SEB exam right in nhpoj.net
    }
    if (currentUrl.includes("user-home")) {
        await UserHomeAddon(); // wysi
    }
}


window.addEventListener("load", Main);


let oldPushState = history.pushState;
function pushStateHandler() {
    oldPushState.apply(history, arguments);
    Main();
}
history.pushState = pushStateHandler;


function observeUrlChange() {
    let oldHref = document.location.href;
    const body = document.querySelector("body");
    const observer = new MutationObserver(
        () => {
            if (oldHref !== document.location.href) {
                oldHref = document.location.href;
                Main();
            }
        }
    );
    observer.observe(body, { childList: true, subtree: true });
}
window.onload = observeUrlChange;



