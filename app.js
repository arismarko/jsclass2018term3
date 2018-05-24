
const form = document.querySelector('#form');
const taskList = document.querySelector('.collection');
const taskInput = document.querySelector('#task');
const dateInput = document.querySelector('#date');

loadEventListeners();

function loadEventListeners() {
  form.addEventListener('submit', addTask);
  taskList.addEventListener('click', removeTask);
}

function addTask(e) {
   if(taskInput.value && dateInput === '') {
     alert('Add a task');
   }

   // Create li element
   const li = document.createElement('li');
   li.className = 'collection-item';
   // Create Text Node and append to li
   li.appendChild(document.createTextNode(taskInput.value));
   li.appendChild(document.createTextNode('\xa0\xa0\xa0\xa0\xa0\xa0\xa0'+'('+[dateInput.value]+ ')'));
   // Create new link element
   const link = document.createElement('a');
   link.className = 'delete-item secondary-content';
   link.innerHTML = '<i class="far fa-trash-alt"></i>';
   li.appendChild(link);

   taskList.appendChild(li);


// taskInput.value = '';
// dateInput.value = '';


  e.preventDefault();
}
// remove task
function removeTask(e) {
 if(e.target.parentElement.classList.contains('delete-item')) {
    e.target.parentElement.parentElement.remove();
   }
}


