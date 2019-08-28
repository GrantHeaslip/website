export interface HashedFilePaths {
    [fileName: string]: string;
}

interface State {
    appVersion: string | null;
    websiteCssPath: string;
}

export const state: State = {
    appVersion: null,
    websiteCssPath: '',
};
