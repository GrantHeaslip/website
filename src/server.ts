'use strict';

import path from 'path';

import Boom from '@hapi/boom';
import hapi from '@hapi/hapi';
import ejs from 'ejs';
import inert from '@hapi/inert';
import throng from 'throng';
import vision from '@hapi/vision';

import { config } from './lib/config';
import { routes } from './lib/routes';
import { getAppVersion, getRevManifest } from './lib/utils';
import { staticFilePath } from './lib/view-helpers';

const projectRootPath = path.resolve(__dirname, '..');

if (config.env === 'development') {
    start();
} else {
    throng({
        workers: config.workers,
        lifetime: Infinity,
        master: startMaster,
        start: start,
    });
}

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
    const server = new hapi.Server({
        compression: {
            minBytes: 512,
        },
        host: '0.0.0.0',
        port: config.port,
        routes: {
            files: {
                relativeTo: projectRootPath,
            }
        },
    });

    // Register plugins
    await server.register(inert);
    await server.register(vision);

    const hashedFileNames = await getRevManifest();
    const partiallyAppliedStaticFilePath = staticFilePath.bind(null, hashedFileNames);

    // Initialize Vision view manager
    server.views({
        engines: { ejs: ejs },
        relativeTo: projectRootPath,
        path: 'templates',
        context: {
            'appEnv': config.env,
            'appVersion': await getAppVersion(),
            'static': partiallyAppliedStaticFilePath,
        },
    });

    // Load routes
    server.route(routes);

    // Add canonical protocol+host redirect extension function
    server.ext('onPostHandler', (request, h) => {
        const requestProtocol = request.headers['x-forwarded-proto'] || 'http';
        const requestHost = request.info.host;

        if (
            typeof config.canonicalHost !== 'undefined' &&
            typeof config.canonicalProtocol !== 'undefined' &&
            (
                requestHost !== config.canonicalHost ||
                requestProtocol !== config.canonicalProtocol
            )
        ) {
            return h.redirect(`${config.canonicalProtocol}://${config.canonicalHost}${request.url.pathname}${request.url.search}`);
        }

        // request.setUrl('/test');
        return h.continue;
    });


    // Intercept Inert’s directory handler JSON errors and render error view
    // instead. This feels like a bad solution, but it appears to be the only
    // way: https://github.com/hapijs/inert/issues/41
    server.ext('onPreResponse', (request, h) => {
        if ( !(request.response instanceof Boom) ) {
            return h.continue;
        }

        const boomError = request.response;

        if (
            // @ts-ignore (Boom types appear to be missing typeof)
            boomError.typeof === Boom.notFound &&
            boomError.output.statusCode === 404 &&
            typeof boomError.data.path !== 'undefined' &&
            boomError.data.path.indexOf('static-build') !== -1
        ) {
            return h.view('error')
                .code(404);
        }

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
