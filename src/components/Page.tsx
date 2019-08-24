import { h, ComponentChildren } from 'preact';

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

export function Page({
    children,
    title = null,
}: {
    children: ComponentChildren;
    title?: string | null;
}) {
    return <Layout title={title}>
        <main className={page}>
            {children}
        </main>
    </Layout>;
};
