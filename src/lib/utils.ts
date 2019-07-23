'use strict';

import fs from 'fs';

import { config } from './config';

export function getAppVersion() {
    return new Promise(function (resolve, reject) {
        fs.readFile('./package.json', 'utf8', function (err, data) {
            if (err) {
                console.error('Couldn’t read package.json!');
                reject(err);
            } else {
                const packageJson = JSON.parse(data);
                resolve(packageJson.version);
            }
        });
    });
}

export function getJsonFile(filePath: string) {
    return new Promise(function (resolve) {
        fs.readFile(`./${filePath}`, 'utf8', function (err, data) {
            if (err) {
                console.error(`Couldn’t read ${filePath}!`);
                // TODO: This shouldn’t return an empty object
                resolve({});
            } else {
                const manifestJson = JSON.parse(data);
                resolve(manifestJson);
            }
        });
    });
}

let cssModuleClassnameMappings = null;

export async function getCssModuleClassNameGetter(cssModuleName: string) {
    if (
        cssModuleClassnameMappings === null ||
        config.env === 'development'
    ) {
        // eslint-disable-next-line require-atomic-updates
        cssModuleClassnameMappings = (
            await getJsonFile('css-module-classname-mappings.json')
        );
    }

    if (typeof cssModuleClassnameMappings[cssModuleName] === 'object') {
        return getClassNames.bind(
            null,
            cssModuleClassnameMappings[cssModuleName],
            cssModuleName,
        );
    } else {
        console.warn(`Requested CSS module "${cssModuleName}" doesn’t exist`);

        return getClassNames.bind(
            null,
            {},
            cssModuleName
        );
    }
}

function getClassNames(
    cssModuleClassnameMappings: string,
    cssModuleName: string,
    className: string
) {
    if (typeof cssModuleClassnameMappings[className] === 'string') {
        return cssModuleClassnameMappings[className];
    }

    console.warn(`CSS module "${cssModuleName}" has no classNames for class "${className}"`);

    return '';
}
