<script context="module">
    import { state } from '../src-build/lib/state';
    import { staticPath } from '../src-build/lib/utils';

    const description = 'Web developer, wannabe polymath, and video game nerd living in Toronto, Canada';

    const name = 'Grant Heaslip';
</script>

<script>
    export let appVersion = state.appVersion;
    export let canonicalUrl;
</script>

<style>
    :global(:root) {
        color-scheme: light dark;
        --colourDocumentBackground: rgb(241, 241, 241);
        --colourPageBackground: rgb(255, 255, 255);
        --colourPageBorder: rgb(225, 225, 225);
        --colourPageLink: rgb(0, 136, 204);
        --colourText: rgb(33, 33, 33);
    }
    @media (prefers-color-scheme: dark) {
        :global(:root) {
            --colourDocumentBackground: rgb(0, 0, 0);
            --colourPageBackground: rgb(0, 0, 0);
            --colourPageBorder: rgb(225, 225, 225);
            --colourPageLink: rgb(102, 187, 255);
            --colourText: rgb(222, 222, 222);
        }
    }
    :global(html) {
        overflow-x: hidden;
        overflow-y: scroll;
    }
    :global(html, body) {
        color: #212121;
        color: var(--colourText);
        background: #f1f1f1;
        background: var(--colourDocumentBackground);
        font-size: 16px;
        line-height: 1.5em;
        font-weight: 400;
        text-rendering: optimizelegibility;
        -webkit-text-size-adjust: 100%;
        margin: 0em;
        font-family: 'Georgia', serif;
    }
    @media (max-width: 360px) {
        :global(html, body) {
            font-size: 15px;
        }
    }
    :global(body) {
        margin-top: 3em;
        margin-top: 5vh;
    }
    :global(body *) {
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
    }
    .Layout {
        width: 100%;
        max-width: 500px;
        margin: 0 auto;
        border: 1em solid transparent;
        overflow: hidden;
    }
</style>

<svelte:head>
    <meta charset="utf-8" />

    <meta name="website:version" content={appVersion} />

    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="stylesheet" type="text/css" media="screen" href="{staticPath('css/components.css')}" />

    <title>{name}</title>
    <meta name="og:title" content={name} />
    <meta name="twitter:title" content={name} />

    <meta name="description" content={description} />
    <meta name="og:description" content={description} />
    <meta name="twitter:description" content={description} />

    {#if typeof canonicalUrl === 'string'}
        <link rel="canonical" href={canonicalUrl} />
        <meta name="og:url" content={canonicalUrl} />
    {/if}

    <script
        src={staticPath('js/html5shiv.min.js')}
    ></script>
</svelte:head>

<div class="Layout">
    <slot></slot>
</div>
