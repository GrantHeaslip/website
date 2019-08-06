import fs from 'fs';

import { state } from './state';

export function getAppVersion(): Promise<string> {
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

export function getJsonFile(filePath: string): object {
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

export function staticPath(fileName: string): string {
    const hashedFileName = state.hashedFilePaths[fileName] || fileName;

    return `/static/${hashedFileName}`;
}
