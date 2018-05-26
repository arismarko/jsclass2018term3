const fieldIDs = ["taskFormEntry", "completedDateFormEntry", "categoryFormEntry"];
const idsOfListsToPopulate = ["toDo-item", "toDo-completeBy", "toDo-category"];
const idOfAllLists = ['toDo-dateAdded', 'toDo-item', 'toDo-completeBy', 'toDo-category', 'toDo-complete']
const form = document.getElementById('form');

let idIncrementor = 1;
let numberFromElementId = undefined;

addOneToIncrementor = () => idIncrementor += 1;

// get values from form
getFormEntry = field => {
    let fieldValue = document.getElementById(field);
    return fieldValue.value;
};

// add ne list element with form input
appendFormEntryToList = (field, listIDName) => {
    let newLIElement = document.createElement("li");
    let listItemValue = document.createTextNode(getFormEntry(field));
    newLIElement.appendChild(listItemValue);
    newLIElement.setAttribute("id", listIDName + idIncrementor);
    document.getElementById(listIDName).appendChild(newLIElement);
};

// add current time to list following form submission
addDateToList = () => {
    let today = new Date().toISOString().slice(0, 10);
    let newLIElement = document.createElement("li");
    let listItemValue = document.createTextNode(today);
    newLIElement.appendChild(listItemValue);
    newLIElement.setAttribute("id", "toDo-dateAdded" + idIncrementor);
    document.getElementById("toDo-dateAdded").appendChild(newLIElement);
};

addDoneButton = () => {
    let newButton = document.createElement('button');
    let buttonText = document.createTextNode('Done');
    newButton.appendChild(buttonText);
    newButton.setAttribute("id", "button" + idIncrementor);
    newButton.addEventListener("click", removeAllListItems);
    let newLiElement = document.createElement('li');
    newLiElement.setAttribute("id", "toDo-complete" + idIncrementor);
    newLiElement.appendChild(newButton);
    document.getElementById('toDo-complete').appendChild(newLiElement)
};

setNumberFromElementId = () => {
    let target = event.target || event.srcElement;
    let elementId = target.id;
    numberFromElementId = elementId.slice(6);
};

removeListItem = (elementId) => {
    let uniqueElementId = elementId + numberFromElementId
    let element = document.getElementById(uniqueElementId);
    element.parentNode.removeChild(element);
};

removeAllListItems = () => {
    setNumberFromElementId()
    idOfAllLists.forEach(function (id) {
        removeListItem(id)
    });
};


// Add form entries after submit
form.addEventListener("submit", (event) => {

    addDateToList();
    // to do
    appendFormEntryToList(fieldIDs[0], idsOfListsToPopulate[0]);
    // complete by
    appendFormEntryToList(fieldIDs[1], idsOfListsToPopulate[1]);
    // category
    appendFormEntryToList(fieldIDs[2], idsOfListsToPopulate[2]);
    addDoneButton();
    addOneToIncrementor();

    event.preventDefault();
});