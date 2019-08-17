export interface HashedFilePaths {
    [fileName: string]: string;
}

interface State {
    appVersion: string | null;
    hashedFilePaths: HashedFilePaths;
}

export let state: State = {
    appVersion: null,
    hashedFilePaths: {},
};
