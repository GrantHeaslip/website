export interface HashedFilePaths {
    [fileName: string]: string;
}

interface State {
    appVersion: string | null;
    hashedFilePaths: HashedFilePaths;
    websiteCssPath: string;
}

export let state: State = {
    appVersion: null,
    hashedFilePaths: {},
    websiteCssPath: '',
};
