const toDoInput = document.getElementById('toDoInput');
const addButton = document.getElementById('addButton');
const toDoList = document.getElementById('toDoList');

addButton.addEventListener('click', addTask);

toDoInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    addTask();
  }
});

function addTask() {
  const taskText = toDoInput.value.trim();
  if (taskText === '') return;

  const listItem = document.createElement('li');
  listItem.textContent = taskText;

  // Click to mark complete
  listItem.addEventListener('click', () => {
    listItem.classList.toggle('completed');
  });

  // Delete button
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.addEventListener('click', (e) => {
    e.stopPropagation(); // prevent triggering "complete"
    toDoList.removeChild(listItem);
  });

  listItem.appendChild(deleteButton);
  toDoList.appendChild(listItem);
  toDoInput.value = '';
}
