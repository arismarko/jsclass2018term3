const fieldClassList = ["taskFormEntry","completedDateFormEntry","categoryFormEntry"];
const listClassList = ["toDo-item","toDo-completeBy","toDo-category"];
const form = document.getElementById('form');

// get values from form
getFormEntry = field => {
    let fieldValue = document.getElementById(field);
    return fieldValue.value;
};

// function to append to list
appendFormEntryToList = (field, listClassName) => {
    let newLIElement = document.createElement("li");
    let listItemValue = document.createTextNode(getFormEntry(field));
    newLIElement.appendChild(listItemValue);
    document.getElementById(listClassName).appendChild(newLIElement);
};

// Add form entries after submit
form.addEventListener("submit", (event) => {

    // add task to document
    appendFormEntryToList(fieldClassList[0], listClassList[0]);
    // add completed by date to document
    appendFormEntryToList(fieldClassList[1], listClassList[1]);
    // add category to document
    appendFormEntryToList(fieldClassList[2], listClassList[2]);

    event.preventDefault();
});