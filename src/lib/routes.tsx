import {
    ResponseToolkit,
    Request,
    RouteOptionsCache,
    ServerRoute,
} from '@hapi/hapi';

import React, { ReactElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

import { config } from './config';

import { Error } from '../components/Error';
import { Home } from '../components/Home';

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

function renderReactElementAsHtmlResponse(reactElement: ReactElement) {
    return `<!DOCTYPE html>${renderToStaticMarkup(reactElement)}`;
}

export function homeHandler(
    _request: Request,
    _h: ResponseToolkit,
) {
    return renderReactElementAsHtmlResponse(<Home />);
}

export function notFoundHandler(
    request: Request,
    h: ResponseToolkit,
) {
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

    const responseHtml = renderReactElementAsHtmlResponse(<Error />);

    return h
        .response(responseHtml)
        .code(404);
}

export const routes: Array<ServerRoute> = [
    {
        method: 'GET',
        path: '/',
        handler: homeHandler,
    },
    {
        method: 'GET',
        path: '/{fileName*}',
        handler: {
            directory: {
                etagMethod: false,
                index: false,
                lookupCompressed: false,
                path: 'static',
                redirectToSlash: false,
            },
        },
        options: {
            cache: hashedStaticFileCacheOptions,
        },
    },
];
