// Define UI Vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all event listeners
loadEventListeners();

// Load all event listeners
function loadEventListeners() {
  // Add task event
  form.addEventListener('submit', addTask);
  // Remove task event
  taskList.addEventListener('click', removeTask);
  // Clear tasks events
  clearBtn.addEventListener('click', clearTasks);
  // Filter events
  filter.addEventListener('keyup', filterTasks);
  //DOM load event
  document.addEventListener('DOMContentLoaded', getTasks)
}

//Get Tasks from Local Storage
function getTasks(){
  let tasks;
  if(localStorage.getItem('tasks') == null){
    tasks = [];
  }else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  console.log(tasks);
  tasks.forEach(function(task){
      // Create li element
      const li = document.createElement('li');
      // Add class
      li.className = 'collection-item';
      // Create text node and append to li
      li.appendChild(document.createTextNode(task));
      
      // Create new link element
      const link = document.createElement('a');
      // Add class
      link.className = 'delete-item secondary-content';
      // Add icon html
      link.innerHTML = '<i class="fa fa-remove"></i>';

      // Append the link to li
      li.appendChild(link);

      // Append li to ul
      taskList.appendChild(li);
      });
}

// Add Task
function addTask(e) {
  if(taskInput.value === '') {
    alert('Please add a task');
  }
else{
  // Create li element
  const li = document.createElement('li');
  // Add class
  li.className = 'collection-item';
  // Create text node and append to li
  li.appendChild(document.createTextNode(taskInput.value));
  
  // Create new link element
  const link = document.createElement('a');
  // Add class
  link.className = 'delete-item secondary-content';
  // Add icon html
  link.innerHTML = '<i class="fa fa-remove"></i>';

  // Append the link to li
  li.appendChild(link);

  // Append li to ul
  taskList.appendChild(li);

  //Store in Local Storage
  storeTaskInLocalStore(taskInput.value);

  // Clear input
  taskInput.value = '';

  }
  e.preventDefault();

}

//store in local storage
function storeTaskInLocalStore(task){
  let tasks;
  if(localStorage.getItem('tasks') == null){
    tasks = [];
  }else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.push(task);

  localStorage.setItem('tasks', JSON.stringify(tasks));
}


//revoe task function
function removeTask(e){
  if(e.target.parentElement.classList.contains('delete-item')){
    if(confirm('Are you sure?')){
      e.target.parentElement.parentElement.remove();
      removeFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

//Remove from local storage
function removeFromLocalStorage(taskItem){
  console.log(taskItem);
  let tasks;
  if(localStorage.getItem('tasks') == null){
    tasks = [];
  }else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach(function(task, index){
    if(taskItem.textContent === task){
      tasks.splice(index,1)
    }
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
}


//clear from local storage
function clearTasksFromLocalStorage(){
  localStorage.clear();
  getTasks();
}

function clearTasks(e){
  //taskList.innerHTML = ''

  //faster
  while(taskList.firstChild){
    taskList.removeChild(taskList.firstChild);
  };
  clearTasksFromLocalStorage();
}


function filterTasks(e){
  const text = e.target.value.toLowerCase();

  document.querySelectorAll('.collection-item').forEach(function(task){
    const item = task.firstChild.textContent;
    if(item.toLowerCase().indexOf(text) != -1){
      task.style.display = 'block';
    }else {
      task.style.display = 'none';
    }
  })
}