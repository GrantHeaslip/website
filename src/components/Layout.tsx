import React from "react";

import { css } from 'linaria';

import { staticPath } from "../lib/utils";
import { state } from '../lib/state';

import faviconIco from '../assets/favicons/favicon.ico';

export const globals = css`
    :global() {
        :root {
            color-scheme: light dark;
            --colourDocumentBackground: rgb(241, 241, 241);
            --colourPageBackground: rgb(255, 255, 255);
            --colourPageBorder: rgb(225, 225, 225);
            --colourPageLink: rgb(0, 136, 204);
            --colourText: rgb(33, 33, 33);
        }

        @media (prefers-color-scheme: dark) {
            :root {
                --colourDocumentBackground: rgb(32, 32, 32);
                --colourPageBackground: rgb(0, 0, 0);
                --colourPageBorder: rgb(225, 225, 225);
                --colourPageLink: rgb(102, 187, 255);
                --colourText: rgb(222, 222, 222);
            }
        }

        html {
            overflow-x: hidden;
            overflow-y: scroll;
        }

        html, body {
            color: #212121;
            color: var(--colourText);
            background: #f1f1f1;
            background: var(--colourDocumentBackground);
            font-size: 16px;
            line-height: 1.5em;
            font-weight: 400;
            text-rendering: optimizeLegibility;
            -webkit-text-size-adjust: 100%;
            margin: 0em;
            font-family: 'Georgia', serif;
        }

        @media (max-width: 360px) {
            html, body {
                font-size: 15px;
            }
        }

        body {
            margin-top: 3em;
            margin-top: 5vh;
        }
        body * {
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
        }
    }
`;

const centred = css`
    width: 100%;
    max-width: 500px;
    margin: 0 auto;
    border: 1em solid transparent;
    overflow: hidden;
`;

export function Layout(props: any) {
    return <html lang="en-CA" dir="ltr">
        <head>
            <meta charSet='utf-8' />

            <meta name='website:version' content='1.0.5' />

            <meta name="viewport" content="width=device-width, initial-scale=1" />

            <link rel="stylesheet" type="text/css" media="screen" href={state.webpackAssets.main.css} />

            <title>Grant Heaslip</title>

            <link rel="shortcut icon" href={faviconIco}></link>
        </head>
        <body>
            <div className={centred}>
                {props.children}
            </div>
        </body>
    </html>;
};
