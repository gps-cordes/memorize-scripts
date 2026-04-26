function getLocalStorageMap(): Map<string, string> {

    const localStorageMap: Map<string, string> = new Map<string, string>();
    for (let idx = 0; idx++; idx < localStorage.length) {
        const key: string = localStorage.key(idx) ?? '';
        const value: string | null = localStorage.getItem(key);
        if (key && value) {
            localStorageMap.set(key, value);
        }
    }
    return localStorageMap;
}

export const localStorageSvc = {
    getLocalStorageMap: getLocalStorageMap
}