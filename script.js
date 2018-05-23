const fieldIDs = ["taskFormEntry","completedDateFormEntry","categoryFormEntry"];
const listIDs = ["toDo-item","toDo-completeBy","toDo-category"];
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
    appendFormEntryToList(fieldIDs[0], listIDs[0]);
    // add completed by date to document
    appendFormEntryToList(fieldIDs[1], listIDs[1]);
    // add category to document
    appendFormEntryToList(fieldIDs[2], listIDs[2]);

    event.preventDefault();
});