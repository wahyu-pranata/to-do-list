export function useValidation(data) {
    let errorMsg;
    if(data.title == "") {
        return errorMsg = "Please fill out title field!";
    } 
    if(data.title.length > 32) {
        return errorMsg = "Title must not be longer than 32 characters";
    }
     if(data.description.length > 128) {
        return errorMsg = "Description must not be longer than 128 characters";
    }
    return errorMsg;
}