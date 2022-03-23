const btnAdcionar = document.getElementById('criar-tarefa');
const btnApaga = document.getElementById('apaga-tudo');
const btnApagaCompleto = document.getElementById('remover-finalizados');
const btnSave = document.getElementById('salvar-tarefas');
const btnApagaSelc = document.getElementById('remover-selecionado');
const btnUp = document.getElementById('mover-cima');
const btnDown = document.getElementById('mover-baixo');
const entry = document.getElementById('texto-tarefa');
const modal = document.querySelector('.modal');
const btnModal = document.getElementById('btn-modal');

function activateModal() {
  modal.classList.add('is-active');
  btnModal.addEventListener('click', () => deactivateModal());
}

function deactivateModal() {
  modal.classList.remove('is-active');
}

function isAButton (target) {
  if(btnUp.contains(target) || btnDown.contains(target)) {
    return true;
  } else {
    return false;
  }
}

function addListItensEvents(listItem) {
  listItem.addEventListener('click', (event) => {
    const selected = document.querySelector('.selected');
    if (selected) selected.classList.remove('selected');
    event.target.classList.add('selected');
  });

  listItem.addEventListener('dblclick', (event) => {
    if (event.target.classList.contains('completed')) {
      event.target.classList.remove('completed');
    } else event.target.classList.add('completed');
  });
  
  window.addEventListener('click', (e) => {
    const listSection = document.getElementById('list-section')
    if (!listSection.contains(e.target) && isAButton(e.target) === false) {
      const selected = document.querySelector('.selected');
      if(selected) selected.classList.remove('selected');
    };
  })
}

function addListItem(newTask) {
  if (entry.value !== '') {
    const list = document.getElementById('lista-tarefas');
    const newListItem = document.createElement('li');
    newListItem.className = 'list-item';
    newListItem.innerText = newTask;
    list.appendChild(newListItem);
    addListItensEvents(newListItem);
    entry.value = '';
  } else activateModal();
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
  if(elemtSelec) elemtSelec.remove();
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

function verifyStorage() {
  const savedList = JSON.parse(localStorage.getItem('lista'));
  if (savedList !== null) { recoverSavedList(); }
}

function moveUp() {
  const item = document.querySelector('.selected');
  const upperItem = item.previousElementSibling;
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

function moveDown() {
  const item = document.querySelector('.selected');
  const lowerItem = item.nextElementSibling;
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

function addClickEvents() {
  btnAdcionar.addEventListener('click', () => addListItem(entry.value) );
  btnApaga.addEventListener('click', () => eraseAll() );
  btnApagaCompleto.addEventListener('click', () => eraseCompleted() );
  btnApagaSelc.addEventListener('click', () => eraseSelected() );
  btnSave.addEventListener('click', () => saveList() );
  btnUp.addEventListener('click', () => {
    const selected = document.querySelector('.selected');
    if (selected !== null && selected.previousElementSibling !== null) {
      moveUp();
    }
  });
  btnDown.addEventListener('click', () => {
    const selected = document.querySelector('.selected');
    if (selected !== null && selected.nextElementSibling !== null) {
      moveDown();
    }
  });

}

function addKeyupEvents() {
  window.addEventListener('keydown', (e) => { 
    if (e.code === 'Enter') {
      addListItem(entry.value);
    }})
  window.addEventListener('keydown', (e) => {
    if (e.code === 'ArrowUp') {
      const selected = document.querySelector('.selected');
      if (selected !== null && selected.previousElementSibling !== null) {
        e.preventDefault()
        moveUp();
      }
    }
  });
  window.addEventListener('keydown', (e) => {
    if (e.code === 'ArrowDown') {
      const selected = document.querySelector('.selected');
      if (selected !== null && selected.nextElementSibling !== null) {
        e.preventDefault()
        moveDown();
      }
    }});
}

function removeSelected(element) {
  element.classList.remove('selected');
}

function removeSelectedEventListeners () {
  const boxList = document.querySelector('#lista-tarefas');
  boxList.addEventListener('click', () => {
    const elemtSelec = document.querySelector('.selected');
    if(elemtSelec !== undefined) removeSelected();
  })
}

window.onload = () => {
  verifyStorage();
  addClickEvents();
  addKeyupEvents();
};
