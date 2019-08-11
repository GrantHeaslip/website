<script context="module">
    const Layout = require('./Layout.svelte').default;
</script>

<script>
    let canonicalUrl;
</script>

<style>
    .Page {
        background-color: #fff;
        background-color: var(--colourPageBackground);
        overflow: hidden;
        padding: 1.5em;
        border: 1px solid #e1e1e1;
        border: 1px solid var(--colourPageBorder);
        float: left;
    }
    .Page > :global(:first-child) {
        margin-top: 0;
    }
    .Page > :global(:last-child) {
        margin-bottom: 0;
    }
    .Page :global(h1) {
        font-family: 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;
        font-size: 2em;
        margin: 0.5em 0;
        line-height: 1em;
    }
    .Page :global(p) {
        margin: 1em 0;
    }
    .Page :global(a) {
        color: #006ac1;
        color: var(--colourPageLink);
        text-decoration: underline;
    }
</style>

<main class="Page">
    <slot></slot>
</main>
