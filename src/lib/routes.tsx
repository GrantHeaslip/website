import {
    ResponseToolkit,
    Request,
    RouteOptionsCache,
    ServerRoute,
} from '@hapi/hapi';
import {
    h,
    VNode,
} from 'preact';
import { render } from 'preact-render-to-string';

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

function renderVNodeAsHtmlResponse(vNode: VNode) {
    return `<!DOCTYPE html>${render(vNode)}`;
}

export function homeHandler(
    _request: Request,
    _responseToolkit: ResponseToolkit,
) {
    return renderVNodeAsHtmlResponse(<Home />);
}

export function notFoundHandler(
    request: Request,
    responseToolkit: ResponseToolkit,
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

        return responseToolkit
            .redirect(pathWithoutIndexHtml)
            .code(301);
    }

    const responseHtml = renderVNodeAsHtmlResponse(<Error />);

    return responseToolkit
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
