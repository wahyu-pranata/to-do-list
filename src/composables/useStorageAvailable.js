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
        /* i Don't know why you need to call DOMException for error even thou you can't actually just return the error itself
        if you want to use it just uncomment the following line
        return error instanceof DOMException && (
            error.code === 22 || error.code === 1014 || error.name === "QuotaExceededError" ||  error.name === "NS_ERROR_DOM_QUOTA_REACHED"
        ) && (storage && storage.length !== 0);
    }

         */
}