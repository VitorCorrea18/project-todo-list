/* eslint-disable complexity */
function addListItensEvents(listItem) {
  listItem.addEventListener('click', (event) => {
    const listElements = document.querySelectorAll('li');
    for (let i = 0; i < listElements.length; i += 1) {
      if (listElements[i].classList.contains('selected')) {
        listElements[i].classList.remove('selected');
      }
    }
    event.target.classList.add('selected');
  });
  listItem.addEventListener('dblclick', (event) => {
    if (event.target.classList.contains('completed')) {
      event.target.classList.remove('completed');
    } else {
      event.target.classList.add('completed');
    }
  });
}

function addListItem(newTask) {
  const list = document.getElementById('lista-tarefas');
  const newListItem = document.createElement('li');
  newListItem.className = 'list-item';
  newListItem.innerText = newTask;
  list.appendChild(newListItem);
  addListItensEvents(newListItem);
}

function eraseAll() {
  const listElements = document.querySelectorAll('li');
  for (let i = 0; i < listElements.length; i += 1) {
    listElements[i].remove();
  }
}

function eraseCompleted() {
  const elmtCompleted = document.querySelectorAll('.completed');
  for (let i = 0; i < elmtCompleted.length; i += 1) {
    elmtCompleted[i].remove();
  }
}

function eraseSelected() {
  const elemtSelec = document.querySelector('.selected');
  elemtSelec.remove();
}

function saveList() {
  const savedList = [];
  const listElements = document.querySelectorAll('li');
  for (let i = 0; i < listElements.length; i += 1) {
    if (listElements[i].classList.contains('completed')) {
      savedList.push({ task: listElements[i].innerText, status: 'completed' });
    } else { savedList.push({ task: listElements[i].innerText, status: '' }); }
  }
  localStorage.setItem('lista', JSON.stringify(savedList));
}

function recoverSavedList() {
  const savedList = JSON.parse(localStorage.getItem('lista'));
  if (savedList !== null) {
    for (let i = 0; i < savedList.length; i += 1) {
      const li = document.createElement('li');
      addListItensEvents(li);
      li.innerText = savedList[i].task;
      li.classList.add('list-item');
      if (savedList[i].status !== '') {
        li.classList.add(savedList[i].status);
      }
      document.getElementById('lista-tarefas').appendChild(li);
    }
  }
}

function moveUp() {
  const item = document.querySelector('.selected');
  if (item !== null) {
    const upperItem = item.previousElementSibling;
    if (upperItem !== null) {
      const itemText = item.innerText;
      item.innerText = upperItem.innerText;
      item.classList.remove('selected');
      upperItem.innerText = itemText;
      upperItem.classList.add('selected');
      const itemCompleted = item.classList.contains('completed');
      const upperItemCompleted = upperItem.classList.contains('completed');
      if (itemCompleted === true && upperItemCompleted === false) {
        upperItem.classList.add('completed');
        item.classList.remove('completed');
      } else if (itemCompleted === false && upperItemCompleted === true) {
        item.classList.add('completed');
        upperItem.classList.remove('completed');
      }
    }
  }
}

function moveDown() {
  const item = document.querySelector('.selected');
  if (item !== null) {
    const lowerItem = item.nextElementSibling;
    if (lowerItem !== null) {
      const itemText = item.innerText;
      item.innerText = lowerItem.innerText;
      item.classList.remove('selected');
      lowerItem.innerText = itemText;
      lowerItem.classList.add('selected');
      const itemCompleted = item.classList.contains('completed');
      const lowerItemCompleted = lowerItem.classList.contains('completed');
      if (itemCompleted === true && lowerItemCompleted === false) {
        lowerItem.classList.add('completed');
        item.classList.remove('completed');
      } else if (itemCompleted === false && lowerItemCompleted === true) {
        item.classList.add('completed');
        lowerItem.classList.remove('completed');
      }
    }
  }
}

window.onload = () => {
  recoverSavedList();
  const btnAdcionar = document.getElementById('criar-tarefa');
  const btnApaga = document.getElementById('apaga-tudo');
  const btnApagaCompleto = document.getElementById('remover-finalizados');
  const btnSave = document.getElementById('salvar-tarefas');
  const btnApagaSelc = document.getElementById('remover-selecionado');
  const btnUp = document.getElementById('mover-cima');
  const btnDown = document.getElementById('mover-baixo');
  const entry = document.getElementById('texto-tarefa');
  let selected = document.querySelector('.selected');
  btnAdcionar.addEventListener('click', () => { addListItem(entry.value); entry.value = ''; });
  btnApaga.addEventListener('click', () => { eraseAll(); });
  btnApagaCompleto.addEventListener('click', () => { eraseCompleted(); });
  btnApagaSelc.addEventListener('click', () => { eraseSelected(); });
  btnSave.addEventListener('click', () => { saveList(); });
  btnUp.addEventListener('click', () => { moveUp(); });
  btnDown.addEventListener('click', () => { moveDown(); });
};
