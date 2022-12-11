export function useStorageAvailable(type) {
    let storage;
    try {
        storage = window[type];
        const storageName = '__storage_test__';
        storage.setItem(storageName, storageName);
        storage.removeItem(storageName,storageName);
        return true;
    }
    catch(error) {
        return error
    }
}