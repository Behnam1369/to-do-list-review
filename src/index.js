import TaskList from './taskList.js';
import './style.css';
import './interaction.js';

const tasks = (localStorage.tasks ? JSON.parse(localStorage.tasks) : []);

const list = new TaskList(tasks);
window.addEventListener('load', () => list.show());

const addTask = () => {
  const txt = document.querySelector('.txtNew');
  const description = txt.value;
  if (description === '') {
    const message = document.createElement('p');
    message.classList.add('error');
    message.innerHTML = 'Please type your task description';
    const body = document.querySelector('body');
    body.prepend(message);
    setInterval(() => {
      message.remove();
    }, 2000);
  } else {
    list.addTask({ description, completed: false, index: -1 });
    txt.value = '';
  }
};

document.querySelector('.add').addEventListener('click', () => addTask());

document.querySelector('.txtNew').addEventListener('keyup', (e) => {
  if (e.keyCode === 13) { // Enter key
    addTask();
  }
});

document.querySelector('.remove').addEventListener('click', () => list.clearCompletedTasks());
