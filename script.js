const form = document.getElementById('form');
const input = document.getElementById('input');
const todosUl = document.getElementById('todos');

// ページ読み込み時にローカルストレージからtodoデータを取得してオブジェクトに変換
const todos = JSON.parse(localStorage.getItem('todos'));
if(todos) {
  todos.forEach(todo => {
    addTodo(todo);
  });
}

// todoの入力時
form.addEventListener('submit', event => {
  event.preventDefault();

  addTodo();
});

// todoを作成
function addTodo(todo) {

  // inputからの入力値
  let todoText = input.value;

  // ローカルストレージにtodoデータがあった時
  // そのテキストを取得
  if(todo) {
    todoText = todo.text;
  }

  if(todoText) {
    const todoElm = document.createElement('li');
    
    // 
    todoElm.innerHTML = `
      ${todoText}
      <button class="trash hidden">
        <i class="fas fa-trash"></i>
      </button>
    `;
    // 

    if(todo && todo.completed) {
      todoElm.classList.add('completed');
    }

    // todoにマウスオーバー
    const deleteBtn = todoElm.querySelector('.trash');
    todoElm.addEventListener('mouseover', () => {
      deleteBtn.classList.toggle('hidden');
    });

    todoElm.addEventListener('mouseout', () => {
      deleteBtn.classList.toggle('hidden');
    });

    // todoを削除
    deleteBtn.addEventListener('mouseup', event => {
      todoElm.remove();

      updateLS();
    });

    // todoを完了 or 未完了にする
    todoElm.addEventListener('mouseup', () => {
      todoElm.classList.toggle('completed');

      updateLS();
    });

    todosUl.appendChild(todoElm);

    // inputの値を消去
    input.value = '';

    updateLS();
  }
}

function updateLS() {
  const todosElm = document.querySelectorAll('li');

  // todoを保存する
  // 配列を用意
  const todos = [];
  todosElm.forEach(todoElm => {
    // 1つのtodoを1つのobjectに見立て配列に格納
    todos.push({
      text: todoElm.innerText, // テキスト
      completed: todoElm.classList.contains('completed') // 完了していればtrueになる
    });
  });

  localStorage.setItem('todos', JSON.stringify(todos));
}