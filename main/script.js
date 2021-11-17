const toDoList = document.getElementById("to-do");
const listNode = document.querySelectorAll("li");
listNode.forEach(() => {
  const deleteButton = document.createElement("span");
  const deleteButtonIcon = document.createElement("img");
  deleteButtonIcon.setAttribute("src", "img/trash-fill.svg");
  deleteButton.appendChild(deleteButtonIcon);
  deleteButton.classList.add("deleteButton");
  deleteButton.appendChild(deleteButtonIcon);
  listNode[i].appendChild(deleteButton);
});
const deleteList = document.querySelectorAll(".deleteButton");
deleteList.forEach((e) => {
  e.target.addEventListener("click", () => {
    this.parentElement.style.display = "none";
  });
});
const lists = document.querySelector("ul");
lists.addEventListener("click", (e) => {
  if (e.target.tagName === "P") {
    e.target.classList.toggle("checked");
  }
});
const addButton = document.getElementById("add-button");
addButton.addEventListener("click", () => {
  const li = document.createElement("li");
  const p = document.createElement("p");
  let inputValue = document.getElementById("to-do-input").value;
  let text = document.createTextNode(inputValue);
  p.appendChild(text);
  li.appendChild(p);
  if (inputValue.length == 0) {
    Swal.fire({
      text: "Please fill the input",
      width: 375,
    });
  } else {
    li.classList.add("to-do-list");
    lists.appendChild(li);
  }
  document.getElementById("to-do-input").value = "";
  const deleteButton = document.createElement("span");
  const deleteButtonIcon = document.createElement("img");
  deleteButtonIcon.setAttribute("src", "img/trash-fill.svg");
  deleteButton.appendChild(deleteButtonIcon);
  deleteButton.classList.add("deleteButton");
  li.appendChild(deleteButton);
  const deleteList = document.querySelectorAll(".deleteButton");
  deleteList.forEach((e) => {
    e.addEventListener("click", () => {
      e.parentElement.style.display = "none";
    });
  });
});
