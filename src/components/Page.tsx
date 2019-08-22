import React, { ReactNode } from "react";

import { css } from 'linaria';

import { Layout } from './Layout';

const page = css`
    background-color: #fff;
    background-color: var(--colourPageBackground);
    overflow: hidden;
    padding: 1.5em;
    border: 1px solid #e1e1e1;
    border: 1px solid var(--colourPageBorder);
    float: left;

    h1 {
        font-family: 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;
        font-size: 2em;
        margin: 0.5em 0;
        line-height: 1em;
    }

    *:first-child {
        margin-top: 0;
    }
    *:last-child {
        margin-bottom: 0;
    }

    p {
        margin: 1em 0;
    }

    a {
        color: #006ac1;
        color: var(--colourPageLink);
        text-decoration: underline;
    }
`;

interface PageProps {
    children: ReactNode
    title: string | null;
}

export function Page(props: PageProps) {
    return <Layout title={props.title}>
        <main className={page}>
            {props.children}
        </main>
    </Layout>;
};
