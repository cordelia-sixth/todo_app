const form = document.getElementById('form');
const input = document.getElementById('input');
const todos = document.getElementById('todos');

form.addEventListener('submit', event => {
  event.preventDefault();

  addTodo();
});

// todoを作成
function addTodo() {
  const todoText = input.value;
  if(todoText) {
    const todoElm = document.createElement('li');
    todoElm.innerText = todoText;

    todoElm.addEventListener('click', () => {
      todoElm.classList.toggle('completed');
    });

    todoElm.addEventListener('contextmenu', event => {
      event.preventDefault();

      todoElm.remove();
    });

    todos.appendChild(todoElm);
    input.value = '';
  }
}