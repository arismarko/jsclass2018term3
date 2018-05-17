// Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close-modal")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Reminder constructor
function Reminder(reminderTitle, reminderDate, reminderPriority, reminderText) {
  this.reminderTitle = reminderTitle;
  this.reminderDate = reminderDate;
  this.reminderPriority = reminderPriority;
  this.reminderText = reminderText;
}

document.getElementById('btn').addEventListener('click', function(e) {
  const reminderTitle = document.getElementById('title').value,
        reminderDate = document.getElementById('date').value,
        reminderPriority = document.getElementById('priority').value,
        reminderText = document.getElementById('text').value;
  const itemHolder = document.getElementById('item-holder');
        
  // Create a Reminder
  const newReminder = new Reminder(reminderTitle, reminderDate, reminderPriority, reminderText);
  
  // Remove modal
  modal.style.display = "none";
  // Make item appear
  itemHolder.style.display = "block";

  e.preventDefault();

  console.log(newReminder);
});
