'use strict';

const hapi = require('hapi');
const ejs = require('ejs');
const inert = require('inert');
const throng = require('throng');
const vision = require('vision');

const config = require('./lib/config').config;
const routes = require('./lib/routes').routes;
const utils = require('./lib/utils').utils;

throng({
    workers: config.workers,
    lifetime: Infinity,
    master: startMaster,
    start: start,
});

function startMaster() {
    console.info('Throng master process started.');
}

async function start() {
    if (config.env == 'development') {
        console.info('Starting in development mode.');
    } else {
        console.info('Starting in production mode.');
    }

    // Create server
    const server = hapi.server({
        compression: {
            minBytes: 512,
        },
        host: '0.0.0.0',
        port: config.port,
        routes: {
            files: {
                relativeTo: __dirname,
            }
        },
    });

    // Register plugins
    await server.register(inert);
    await server.register(vision);

    // Initialize Vision view manager
    server.views({
        engines: { ejs: ejs },
        relativeTo: __dirname,
        path: 'templates',
        context: {
            'appEnv': config.env,
            'appVersion': await utils.getAppVersion(),
            'hashedFileNames': await utils.getRevManifest(),
        },
    });

    // Load routes
    server.route(routes);

    // Add canonical protocol+host redirect extension function
    server.ext('onPostHandler', (request, h) => {
        let requestHost = request.info.host;
        let requestPath = request.path;
        let requestProtocol = request.headers['x-forwarded-proto'] || 'http';

        if (
            typeof config.canonicalHost !== 'undefined' &&
            typeof config.canonicalProtocol !== 'undefined' &&
            (
                requestHost !== config.canonicalHost ||
                requestProtocol !== config.canonicalProtocol
            )
        ) {
            return h.redirect(`${config.canonicalProtocol}://${config.canonicalHost}${requestPath}`);
        }

        // request.setUrl('/test');
        return h.continue;
    });

    // Start server
    try {
        await server.start();
        console.info('Server started at ' + server.info.uri + '.');
    }
    catch (err) {
        console.error('Error starting sever:', err);
        process.exit(1);
    }
}
