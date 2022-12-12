/**
 *
 * @param type Storages Type [localstorage|sessions storage]
 * @returns {boolean} Return true if the storage is available otherwise return false
 */
export function useStorageAvailable(type) {
    /* Make it More Clear What's Going On */
    try {
        const dummyName = '__checkStorageAvailable__' + type; /*  */
        window[type].setItem(dummyName, dummyName)
        window[type].removeItem(dummyName)
        return true
    }
    catch {
        return false
    }
}