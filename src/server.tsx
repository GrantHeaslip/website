import 'core-js/es7';

import Boom from '@hapi/boom';
import hapi from '@hapi/hapi';
import inert from '@hapi/inert';
import throng from 'throng';

import { config } from './lib/config';
import { routes, notFoundHandler } from './lib/routes';
import { state } from './lib/state';
import { getAppVersion, getJsonFile } from './lib/utils';

console.log(config.buildEnv);

if (config.buildEnv === 'development') {
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
    if (config.buildEnv == 'development') {
        console.info('Starting in development mode.');
    } else {
        console.info('Starting in production mode.');
    }

    // eslint-disable-next-line require-atomic-updates
    state.appVersion = await getAppVersion();

    // Create server
    const server = new hapi.Server({
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

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const webpackAssets = await getJsonFile('temp/webpack-assets.json') as any;

    // eslint-disable-next-line require-atomic-updates
    state.websiteCssPath = (
        webpackAssets.main.css.replace(/^\/static/, '')
    );

    // Load routes
    server.route(routes);

    // Add canonical protocol+host redirect extension function
    server.ext('onPostHandler', (request, responseToolkit) => {
        const requestProtocol = request.headers['x-forwarded-proto'] || 'http';
        const requestHost = request.info.host;

        if (
            config.buildEnv === 'production' &&
            typeof config.canonicalHost !== 'undefined' &&
            typeof config.canonicalProtocol !== 'undefined' &&
            (
                requestHost !== config.canonicalHost ||
                requestProtocol !== config.canonicalProtocol
            )
        ) {
            return responseToolkit.redirect(`${config.canonicalProtocol}://${config.canonicalHost}${request.url.pathname}${request.url.search}`);
        }

        // request.setUrl('/test');
        return responseToolkit.continue;
    });


    // Intercept Inert’s directory handler JSON errors and render error view
    // instead. This feels like a bad solution, but it appears to be the only
    // way: https://github.com/hapijs/inert/issues/41
    server.ext('onPreResponse', async (request, responseToolkit) => {
        if ( !(request.response instanceof Boom) ) {
            return responseToolkit.continue;
        }

        const boomError = request.response;

        // @ts-ignore (Boom types appear to be missing typeof)
        if ([Boom.notFound, Boom.forbidden].includes(boomError.typeof)) {
            return notFoundHandler(request, responseToolkit);
        }

        return responseToolkit.continue;
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
