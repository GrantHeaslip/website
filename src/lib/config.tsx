export const config = {
    assetsDir: 'assets',
    buildEnv: process.env.BUILD_ENV,
    canonicalHost: process.env.CANONICAL_HOST,
    canonicalProtocol: process.env.CANONICAL_PROTOCOL,
    port: process.env.PORT || 5000,
    workers: process.env.WEB_CONCURRENCY || 1,
};
