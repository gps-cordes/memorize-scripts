function getLocalStorageMap(): Map<string, string> {

    const localStorageRef = localStorage;
    const localStorageMap: Map<string, string> = new Map<string, string>();
    Object.keys(localStorageRef).map((key) => {
        const value: string | null = localStorageRef.getItem(key);
        if (key && value) {
            localStorageMap.set(key, value);
        }
    })

    return localStorageMap;
}

function doesUserUploadedSceneExist(): boolean {
    return localStorage.length > 0;
}

function uploadScriptToLocalStorage(sceneName: string, sceneText: string) {
    localStorage.setItem(sceneName, sceneText);
}

function deleteScriptFromLocalStorage(sceneName: string){
    localStorage.removeItem(sceneName);
}

export const localStorageSvc = {
    getLocalStorageMap: getLocalStorageMap,
    uploadScriptToLocalStorage: uploadScriptToLocalStorage,
    deleteScriptFromLocalStorage: deleteScriptFromLocalStorage,
    doesUserUploadedSceneExist: doesUserUploadedSceneExist
}