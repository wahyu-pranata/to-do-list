/**
 *
 * @param data Data that will save into storage
 * @param storageId Storage Type [1 = Local Storage, 2 = Session Storage]
 */
export const saveIntoStorage = (data, storageId) => {
    const storageName = 'todoList'
    switch (storageId) {
        case 1:
            window.localStorage.setItem(storageName, JSON.stringify(data, null))
            break
        case 2:
            window.sessionStorage.setItem(storageName, data)
            break
        default:
            throw Error("Unknown storage Type", {cause: "Invalid Storage ID"})
    }
}
/**
 *
 * @param storageId Storage Type [1 = Local Storage, 2 = Session Storage]
 * @returns {string} Data inside the Storage
 */
export const getDataFromStorage = (storageId) => {
    const storageName = 'todoList'
    switch (storageId) {
        case 1:
            return window.localStorage.getItem(storageName)
        case 2:
            return window.sessionStorage.getItem(storageName)
        default:
            throw Error("Unknown storage Type", {cause: "Invalid Storage ID"})
    }
}