<script context="module">
    const Layout = require('./Layout.svelte').default;
    const Page = require('./Page.svelte').default;
</script>

<script>
    export let canonicalUrl;
</script>

<Layout canonicalUrl={canonicalUrl}>
    <Page>
        <h1 class="name">Grant Heaslip</h1>

        <p>I’m a web developer, wannabe polymath, and video game nerd living in Toronto, Canada. I still don’t have much of anything figured out.</p>

        <p>If you want to get in touch, send an e-mail to <a href="mailto:g@hslp.ca">g@hslp.ca</a>.</p>
    </Page>
</Layout>
