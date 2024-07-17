"use Mr.P";
"use strict";


// https://stackoverflow.com/a/53269990
export const waitForElement = async (selector: string) => {
    while (document.querySelector(selector) === null) {
        await new Promise(
            (resolve) => requestAnimationFrame(resolve) 
        )
    }
    return document.querySelector(selector); 
}


export const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export const getElementByXpath = (xpath: string) => document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;


export function getCookie(name: string) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
        return parts.pop().split(';').shift()
    }
}