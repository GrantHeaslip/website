import { h, ComponentChildren } from 'preact';

import { css } from 'linaria';

import { state } from '../lib/state';

import appleTouchIcon180x180Png from '../assets/favicons/apple-touch-icon-180x180.png';
import androidChrome192x192Png from '../assets/favicons/android-chrome-192x192.png';
import browserconfigXml from '../assets/browserconfig.xml';
import favicon16x16Png from '../assets/favicons/favicon-16x16.png';
import favicon194x194Png from '../assets/favicons/favicon-194x194.png';
import favicon32x32Png from '../assets/favicons/favicon-32x32.png';
import faviconIco from '../assets/favicons/favicon.ico';
import manifestWebmanifest from '../assets/manifest.webmanifest';

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

export function Layout({
    children,
    title = null,
}: {
    children: ComponentChildren;
    title: string | null;
}) {
    const formattedTitle = (
        typeof title === 'string'
            ? `${title} — Grant Heaslip` // eslint-disable-line no-irregular-whitespace
            : 'Grant Heaslip'
    );

    return <html lang='en-CA' dir='ltr'>
        <head>
            <meta charSet='utf-8' />

            <meta name='website:version' content='1.0.5' />

            <meta name='viewport' content='width=device-width, initial-scale=1' />

            <link rel='stylesheet' type='text/css' media='screen' href={state.websiteCssPath} />

            <title>{formattedTitle}</title>

            {/* ================
            ===== Favicons =====
            ================ */}
            <link rel='apple-touch-icon' sizes='180x180' href={appleTouchIcon180x180Png} />
            <link rel='icon' type='image/png' sizes='32x32' href={favicon32x32Png} />
            <link rel='icon' type='image/png' href={favicon194x194Png} sizes='194x194' />
            <link rel='icon' type='image/png' href={androidChrome192x192Png} sizes='192x192' />
            <link rel='icon' type='image/png' href={favicon16x16Png} sizes='16x16' />
            <link rel='shortcut icon' href={faviconIco} />

            {/* =================
            ===== Manifests =====
            ================= */}
            <link rel='manifest' href={manifestWebmanifest} />
            <meta name='msapplication-config' content={browserconfigXml} />
        </head>
        <body>
            <div className={centred}>
                {children}
            </div>
        </body>
    </html>;
}
