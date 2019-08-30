export interface HashedFilePaths {
    [fileName: string]: string;
}

interface State {
    appVersion: string;
    websiteCssPath: string;
}

export const state: State = {
    appVersion: '',
    websiteCssPath: '',
};
