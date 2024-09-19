"use Mr.P";
"use strict";

import { waitForElement } from "./Utils";

export async function FuckPDF() {
    await waitForElement("p.content:nth-child(2) > p");
    let pdfLinks = document.querySelectorAll('a[href$=".pdf"]');

    for (let i=0; i<pdfLinks.length; i++) {
        // let url = new URL(pdfLinks[i].getAttribute("href"), document.baseURI).href; // absolute path
        let url = pdfLinks[i].getAttribute("href"); // relative path
        
        let pdfViewer = document.createElement("object");
        pdfViewer.data = url;
        pdfViewer.type = "application/pdf";
        pdfViewer.width = "100%";
        pdfViewer.height = "500px";

        pdfLinks[i].parentNode.replaceChild(pdfViewer, pdfLinks[i]);
    }
}