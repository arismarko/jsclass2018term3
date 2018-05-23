const fieldIDs = ["taskFormEntry", "completedDateFormEntry", "categoryFormEntry"];
const listIDs = ["toDo-item", "toDo-completeBy", "toDo-category"];
const form = document.getElementById('form');

// get values from form
getFormEntry = field => {
    let fieldValue = document.getElementById(field);
    return fieldValue.value;
};

// function to append to list
appendFormEntryToList = (field, listIDName) => {
    let newLIElement = document.createElement("li");
    let listItemValue = document.createTextNode(getFormEntry(field));
    newLIElement.appendChild(listItemValue);
    document.getElementById(listIDName).appendChild(newLIElement);
};

//add current time to list following form submission
addDateToList = () => {
    let today = new Date().toISOString().slice(0, 10)
    let newLIElement = document.createElement("li");
    let listItemValue = document.createTextNode(today);
    newLIElement.appendChild(listItemValue);
    document.getElementById("toDo-dateAdded").appendChild(newLIElement);
};

// add an edit button

// add a remove button - make this populate a separate remove tab



// Add form entries after submit
form.addEventListener("submit", (event) => {
    // add date added
    addDateToList()
    // add task to document
    appendFormEntryToList(fieldIDs[0], listIDs[0]);
    // add completed by date to document
    appendFormEntryToList(fieldIDs[1], listIDs[1]);
    // add category to document
    appendFormEntryToList(fieldIDs[2], listIDs[2]);

    event.preventDefault();
});