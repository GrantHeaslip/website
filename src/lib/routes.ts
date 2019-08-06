import {
    ResponseObject,
    ResponseToolkit,
    Request,
    RouteOptionsCache,
    ServerRoute,
} from '@hapi/hapi';

import { config } from './config';

require('svelte/register');

const Error = require('../../components/Error.svelte').default;
const Home = require('../../components/Home.svelte').default;

const hashedStaticFileCacheOptions: RouteOptionsCache = {
    privacy: 'public',
    expiresIn: 31536000000,
    statuses: [200],
    otherwise: 'no-cache',
};

const unhashedStaticFileCacheOptions: RouteOptionsCache = {
    privacy: 'public',
    expiresIn: 86400000,
    statuses: [200],
    otherwise: 'no-cache',
};

function getCanonicalUrl(request: Request) {
    if (
        typeof config.canonicalHost === 'undefined' ||
        typeof config.canonicalProtocol === 'undefined'
    ) {
        return null;
    } else {
        return `${config.canonicalProtocol}://${config.canonicalHost}${request.url.pathname}`;
    }
}

async function getSvelteResponse(
    request: Request,
    h: ResponseToolkit,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    component: any,
    props = {}
): Promise<ResponseObject> {
    const { css, head, html } = component.render({
        ...{
            canonicalUrl: getCanonicalUrl(request),
        },
        ...props,
    });

    return h.view(
        'svelte',
        {
            css: css,
            head: head,
            html: html,
        },
    );
}

export const routes: Array<ServerRoute> = [
    {
        method: 'GET',
        path: '/',
        handler: async (request, h) => {
            return await getSvelteResponse(request, h, Home, {home: 'test'});
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
        path: '/{unmatchedPath*}',
        handler: async (request, h) => {
            // If request path ends in “/index.html”, redirect to same path
            // without “index.html”
            const pathFollowedByIndexHtmlRegExp = request.path
                .match(/(.*\/)index\.html/);

            if (
                Array.isArray(pathFollowedByIndexHtmlRegExp) &&
                pathFollowedByIndexHtmlRegExp.length === 2
            ) {
                const pathWithoutIndexHtml = pathFollowedByIndexHtmlRegExp[1];

                return h
                    .redirect(pathWithoutIndexHtml)
                    .code(301);
            }

            const svelteResponse = await getSvelteResponse(request, h, Error);

            return svelteResponse.code(404);
        }
    },
];
