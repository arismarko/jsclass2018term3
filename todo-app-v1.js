//***ToDo app JS v1***

//Global Variables
var todoList;
var foundItem;
//alerts elements
var alertSave = document.getElementById('alertsave');
var alertDelete = document.getElementById('alertdelete');
var alertError = document.getElementById('alerterror');
var alerts = document.querySelectorAll('.alert');
//buttons
var saveBtn = document.getElementById('savebtn');
var updateBtn = document.getElementById('updatebtn');
var cancelBtn = document.getElementById('cancelbtn');
var dismissBtn = document.getElementById('dismissbtn');
var deleteBtns;
var editBtns;
//table
var tableList = document.getElementById('tablelist').getElementsByTagName('tbody')[0];
var tableRows;
//form elements
var select1 = document.getElementById('select1');
var input1 = document.getElementById('input1');
var input2 = document.getElementById('input2');

//Todo Prototype
var Todo = {
    taskId: function () {
        var x = new Date().toLocaleDateString().replace('/','').replace('/','');
        var t = new Date().getTime().toString();
        this.timeStamp = x + t;
    },
    todoList: function () {
        this.listArray = [];
    },
    todoData: function (id,priority,task,date) {
        this.id = "id" + id;
        this.priority = priority;
        this.task = task;
        this.date = date;
    },
    toggleSaveBtn: function (val) {
        //hide/show save button
        if(val == 0){
            saveBtn.style.display = "none";
        }
        else{
            saveBtn.style.display = "inline-block";
        }
    },
    toggleUpdateBtn: function (val) {
        //hide/show update button
        if(val == 0){
            updateBtn.style.display = "none";
        }
        else{
            updateBtn.style.display = "inline-block";
        }
    },
    hideAlerts: function () {
        //hide alerts
        alerts.forEach(function (ele) {
            ele.style.display = "none";
        });
    },
    emptyForm: function () {
        //empty form values
        select1.value = '1';
        input1.value = '';
        input2.value = ''
    },
    deleteBtnQuery: function () {
        deleteBtns = document.querySelectorAll('.delete-btn');
        //delete task item
        deleteBtns.forEach(function (ele) {
            //delete event listener
            ele.addEventListener('click', function () {
                //console.log(this.dataset.id);
                todoList.deleteItem(this.dataset.id).updateTable(false);
            });
        });
    },
    editBtnQuery: function () {
        editBtns = document.querySelectorAll('.edit-btn');
        //edit item task
        editBtns.forEach(function (ele) {
            //edit event listener
            ele.addEventListener('click', function () {
                Todo.tableRowClear();
                this.parentNode.parentNode.classList.add('warning');
                todoList.editItem(this.dataset.id);
            });
        });
    },
    tableRowQuery: function () {
        tableRows = tableList.querySelectorAll('tr');
    },
    tableRowClear: function () {
        tableRows.forEach(function (ele) {
            ele.classList.remove('warning');
        });
    },
    setCookieforListArray: function (cname,cvalue,exdays) {
        //link to reference code - https://www.w3schools.com/Js/js_cookies.asp
        var d = new Date();
        d.setTime(d.getTime() + (exdays*24*60*60*1000));
        var expires = "expires=" + d.toGMTString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    },
    getCookieforListArray: function (cname) {
        //link to reference code - https://www.w3schools.com/Js/js_cookies.asp
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for(var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }
};

//Todo Prototype functions for todoList
Todo.todoList.prototype.addItem = function (objItem) {
    this.listArray.push(objItem);
    return this;
};
Todo.todoList.prototype.deleteItem = function (dataid) {
    //console.log(dataid);
    //set index negative value
    var objIndexFound = -1;
    foundItem = this.listArray.map(function (data, index) {
        if(dataid == data['id']){
            objIndexFound = index;
        }
    });
    if(objIndexFound > -1){
        this.listArray.splice(objIndexFound, 1);
    }
    // console.log(this.listArray);
    return this;
};
Todo.todoList.prototype.editItem = function (dataid) {
    Todo.toggleSaveBtn(0);
    Todo.toggleUpdateBtn(1);
    foundItem = this.listArray.filter(function (data) {
        if(dataid == data['id']){
            select1.value = data['priority'];
            input1.value = data['task'];
            input2.value = data['date'];
            return data;
        }
    });
};
Todo.todoList.prototype.updateItem = function (objItem) {
    if(objItem != null){
        var data = objItem[0];
        data['priority'] = select1.value;
        data['task'] = input1.value;
        data['date'] = input2.value;
    }
    return this;
};
Todo.todoList.prototype.updateTable = function (onload) {
    var self = this;

    if(onload == true){
        if (Todo.getCookieforListArray('tasks') != '') {
            var pastItems = Todo.getCookieforListArray('tasks');
            var pastItemsArray = JSON.parse(pastItems)
            pastItemsArray.forEach(function (item) {
                self.listArray.push(item);
            });
        }
    }

    console.log(this.listArray);
    var listArray = this.listArray;
    var sortedListArray = listArray.sort(function (a, b) {
        return a['priority'] - b['priority'];
    });

    var tableRow = sortedListArray.map(function (data) {
        var dateItem = new Date(data['date'].toString());
        return "<tr><td>" + data['priority'] + "</td>" +
            "<td>" + data['task'] + "</td>" +
            "<td>" + dateItem.toLocaleDateString('en-GB') + "</td>" +
            "<td><a href='#' class='edit-btn' data-id=" + data['id'] + " >Edit</a> / <a href='#' class='delete-btn' data-id=" + data['id'] + " >Delete</a></td></tr>";
    });
    tableList.innerHTML = tableRow.join(' ');

    //update delete button query selector
    Todo.deleteBtnQuery();
    //update edit button query selector
    Todo.editBtnQuery();
    //update table row query selector
    Todo.tableRowQuery();
    Todo.toggleSaveBtn(1);
    Todo.toggleUpdateBtn(0);

    //set cookie to store list after browser page refresh
    Todo.setCookieforListArray('tasks', JSON.stringify(sortedListArray), 1);//store cookie for 1 day
};


//window load function
window.onload = function (ev) {
    //init new object array
    todoList = new Todo.todoList();
    todoList.updateTable(true);

    //event functions
    dismissBtn.addEventListener('click', function () {
        Todo.hideAlerts();
    });

    saveBtn.addEventListener('click',function () {
        //new task id
        var taskid = new Todo.taskId();
        //validate form before adding task
        if(input1.value == '' || input2.value == ''){
            Todo.hideAlerts();
            alertError.style.display = "block";
        }
        else{
            var taskItem = new Todo.todoData(taskid.timeStamp, select1.value, input1.value,input2.value);
            todoList.addItem(taskItem).updateTable(false);
            Todo.emptyForm();
            Todo.hideAlerts();
        }
    });

    updateBtn.addEventListener('click',function () {
        //validate form before updating task
        if(input1.value == '' || input2.value == ''){
            Todo.hideAlerts();
            alertError.style.display = "block";
        }
        else {
            todoList.updateItem(foundItem).updateTable(false);
            Todo.emptyForm();
            Todo.hideAlerts();
        }
    });

    cancelBtn.addEventListener('click', function () {
        Todo.tableRowQuery();
        Todo.tableRowClear();
        Todo.emptyForm();
        Todo.toggleSaveBtn(1);
        Todo.toggleUpdateBtn(0);
    });
};
