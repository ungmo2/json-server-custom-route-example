// State
let todos = [];
let navState = 'all';

const $nav = document.querySelector('.nav');
const $todos = document.querySelector('.todos');

const render = () => {
  let html = '';

  let _todos = todos.filter(({ completed }) => navState === 'complete' ? completed : navState === 'active' ? !completed : true);

  _todos.forEach(({ id, content, completed}) => {
    html += `<li id="${id}" class="todo-item">
      <input id="ck-${id}" class="checkbox" type="checkbox" ${completed ? 'checked' : ''}>
      <label for="ck-${id}">${content}</label>
      <i class="remove-todo far fa-times-circle"></i>
    </li>`;
  });

  $todos.innerHTML = html;
};

const getTodo = () => {
  todos = [
    { id: 1, content: 'HTML', completed: false },
    { id: 2, content: 'CSS', completed: true },
    { id: 3, content: 'Javascript', completed: false }
  ];

  todos = todos.sort((todo1, todo2) => todo2.id - todo1.id);
  render();
};

const changeNavState = id => {
  [...$nav.children].forEach($navItem => {
    $navItem.classList.toggle('active', $navItem.id === id)
  });

  navState = id;
  render();
};

window.onload = getTodo;

$nav.onclick = ({ target }) => {
  if (!target.matches('.nav > li:not(.active)')) return;
  changeNavState(target.id);
};










