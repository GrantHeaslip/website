'use strict';

const config = require('./config').config;

const hashedStaticFileCacheOptions = {
    privacy: 'public',
    expiresIn: 31536000000,
    statuses: [200, 304],
    otherwise: 'no-cache',
};

const unhashedStaticFileCacheOptions = {
    privacy: 'public',
    expiresIn: 86400000,
    statuses: [200, 304],
    otherwise: 'no-cache',
};

function getCanonicalUrl(request) {
    if (
        typeof config.canonicalHost === 'undefined' ||
        typeof config.canonicalProtocol === 'undefined'
    ) {
        return null;
    } else {
        return `${config.canonicalProtocol}://${config.canonicalHost}${request.url.path}`;
    }
}

exports.routes = [
    {
        method: 'GET',
        path:'/',
        handler: (request, h) => {
            // TODO: Move canonicalUrl context variable to global context
            // (defined in server.views.context) once vision supports awaiting
            // async factory functions.
            return h.view(
                'index',
                {
                    canonicalUrl: getCanonicalUrl(request)
                },
            );
        },
    },
    {
        method: 'GET',
        path:'/favicon.ico',
        handler: {
            file: {
                etagMethod: 'hash',
                lookupCompressed: false,
                path: 'static/favicons/favicon.ico',
            },
        },
        options: {
            cache: unhashedStaticFileCacheOptions,
        },
    },
    {
        method: 'GET',
        path:'/robots.txt',
        handler: {
            file: {
                etagMethod: 'hash',
                lookupCompressed: false,
                path: 'static/robots.txt',
            },
        },
        options: {
            cache: unhashedStaticFileCacheOptions,
        },
    },
    {
        method: 'GET',
        path: '/static/{fileName*}',
        handler: {
            directory: {
                etagMethod: false,
                index: false,
                lookupCompressed: false,
                path: config.staticDir,
                redirectToSlash: false,
            },
        },
        options: {
            cache: hashedStaticFileCacheOptions,
        },
    },
    {
        method: '*',
        path: '/{path*}',
        handler: (request, h) => {
            return h.view(
                'error',
                {
                    canonicalUrl: getCanonicalUrl(request),
                },
            )
                .code(404);
        }
    },
];
