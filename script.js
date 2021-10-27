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
  console.log(localStorage.getItem('lista'));
}

function recoverSavedList() {
  const savedList = JSON.parse(localStorage.getItem('lista'));
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

window.onload = () => {
  const savedList = JSON.parse(localStorage.getItem('lista'));
  if (savedList !== null) {
    recoverSavedList();
  }

  const btnAdcionar = document.getElementById('criar-tarefa');
  const btnApaga = document.getElementById('apaga-tudo');
  const btnApagaCompleto = document.getElementById('remover-finalizados');
  const btnSave = document.getElementById('salvar-tarefas');
  const btnApagaSelc = document.getElementById('remover-selecionado');
  const entry = document.getElementById('texto-tarefa');

  btnAdcionar.addEventListener('click', () => { addListItem(entry.value); entry.value = ''; });
  btnApaga.addEventListener('click', () => { eraseAll(); });
  btnApagaCompleto.addEventListener('click', () => { eraseCompleted(); });
  btnApagaSelc.addEventListener('click', () => { eraseSelected(); });
  btnSave.addEventListener('click', () => { saveList(); });
};
