export function useValidation(data) {
    /* Keep it Simple */
    if (data.title === "") return "Please fill out title field!";
    if (data.title.length > 32) return "Title must not be longer than 32 characters";
    if (data.description.length > 128) return "Description must not be longer than 128 characters";
}