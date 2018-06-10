const form = document.getElementById('form');

const dateAdded = {formID: '', listID: 'toDo-dateAdded', elementType: 'li'};
const todo = {formID: 'taskFormEntry', listID: 'toDo-item', elementType: 'li'};
const completeBy = {formID: 'completedDateFormEntry', listID: 'toDo-completeBy', elementType: 'li'};
const catagory = {formID: 'categoryFormEntry', listID: 'toDo-category', elementType: 'li'};
const btn = {formID: '', listID: 'toDo-complete', elementType: 'li'};

let FormActions = (function () {

    // property declarations
    let config, incrementer, removeClassName;

    // Method declarations
    let setConfig, addFromEntry, addDate, showremoveClassName, showIncrementer,
        addButton, removeElements, setIncrementer, upDateClassName;

    // Set HTML class name for each li element following form submit
    removeClassName = 'removeTag';

    config = {
        formID: '',
        listID: '',
        elementType: ''
    };

    setConfig = function (settings) {
        config.formID = settings.formID;
        config.listID = settings.listID;
        config.elementType = settings.elementType;
    };

    setIncrementer = function () {
        incrementer += 1
    };

    showremoveClassName = function () {
      return removeClassName
    };

    showIncrementer = function(){
      return incrementer
    };

    addFromEntry = function (config) {

        setConfig(config);

        let values = Object.values(config);
        let formID = values[0];
        let listID = values[1];
        let elementType = values[2];

        let newLIElement = document.createElement(elementType);
        newLIElement.setAttribute("class", removeClassName);
        let formEntryValue = document.getElementById(formID).value;
        let formEntry = document.createTextNode(formEntryValue);
        newLIElement.appendChild(formEntry);
        document.getElementById(listID).appendChild(newLIElement);
    };

    addDate = function (config) {

        setConfig(config);

        let values = Object.values(config);
        let listID = values[1];
        let elementType = values[2];

        let now = new Date().toISOString().slice(0, 10);
        let newLIElement = document.createElement(elementType);
        newLIElement.setAttribute("class", removeClassName);
        let listItemValue = document.createTextNode(now);
        newLIElement.appendChild(listItemValue);
        document.getElementById(listID).appendChild(newLIElement);
    };

    addButton = function (config) {

        setConfig(config);

        let values = Object.values(config);
        let listID = values[1];
        let elementType = values[2];

        let newButton = document.createElement('button');
        let buttonText = document.createTextNode('Done');
        newButton.setAttribute("class", removeClassName);
        newButton.appendChild(buttonText);
        newButton.addEventListener("click", removeElements);
        let newLiElement = document.createElement(elementType);
        newLiElement.appendChild(newButton);
        document.getElementById(listID).appendChild(newLiElement);
    };

    removeElements = function () {
        let elements = document.getElementsByClassName(removeClassName);
        while (elements.length > 0) {
            elements[0].parentNode.removeChild(elements[0]);
        }
    };

    upDateClassName = function () {
        let incrementer = 0;
        incrementer += 1;
        removeClassName = removeClassName + incrementer
    };

    return {
        addFromEntry: addFromEntry,
        addDate: addDate,
        addButton: addButton,
        upDateClassName: upDateClassName

}

})();

form.addEventListener("submit", (event) => {

    FormActions.addDate(dateAdded);
    FormActions.addFromEntry(todo);
    FormActions.addFromEntry(completeBy);
    FormActions.addFromEntry(catagory);
    FormActions.addButton(btn);
    FormActions.upDateClassName();
    event.preventDefault();

});