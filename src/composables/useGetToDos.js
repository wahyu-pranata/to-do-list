export function useGetToDos(mode = "default") {
    let item = JSON.parse(localStorage.getItem("toDos"));
    let toDos = { data: [] };
    if(mode == "archived") {
        for (let i = 0; i < item.data.length; i++) {
            if (JSON.parse(item.data[i]).is_archived) {
                toDos.data.push(item.data[i]);
            }
        }
    } else {
        for (let i = 0; i < item.data.length; i++) {
            if (!JSON.parse(item.data[i]).is_archived) {
                toDos.data.push(item.data[i]);
            }
        }
    }
    return toDos;
}