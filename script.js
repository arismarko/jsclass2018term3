const fieldClassList = ["taskFormEntry","completedDateFormEntry","catagoryFormEntry"]
const listClassList = ["toDo-item","toDo-completeBy","toDo-catagory"]
const form = document.getElementById('submit');

// get values from form
let getFormEntry = field => {
    let fieldValue = document.getElementsByClassName(field).value
    console.log(fieldValue);
    
    return fieldValue;
}

// function to appened to list
let appendFormEntryToList = (field, listClassName) => {
    let fieldValue = getFormEntry(field);
    let listToAppend = document.getElementsByClassName("listClassName")
    let newLIElement = document.createElement("li");
    newLIElement.appendChild(document.createTextNode(fieldValue));
    listToAppend.appendChild(newLIElement);

}

// Add form enteries after submit
form.addEventListener("submit", (event) => {
    "use strict";
    event.preventDefault();
    // add task to document
    appendFormEntryToList(fieldClassList[0], listClassList[0])()
    // add completed by date to document
    appendFormEntryToList(fieldClassList[1], listClassList[1])()
    // add catagory to document
    appendFormEntryToList(fieldClassList[2], listClassList[2])()
})  