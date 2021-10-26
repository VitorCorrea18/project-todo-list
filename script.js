window.onload = function () {
    const entry = document.getElementById('texto-tarefa');
    const btnAdcionar = document.getElementById('criar-tarefa');
    const list = document.getElementById('lista-tarefas');
    const btnApaga = document.getElementById('apaga-tudo');
    const btnApagaCompleto = document.getElementById('remover-finalizados');

    btnAdcionar.addEventListener('click', function () {
        let inputItem = entry.value
        let listItem = document.createElement('li');
        listItem.className = 'list-item';

        listItem.addEventListener('click', function (event) {
            let listElements = document.querySelectorAll('li');
            for (i = 0; i < listElements.length; i += 1) {
                if (listElements[i].classList.contains('selected')) {
                    listElements[i].classList.remove('selected');
                }
            }
            event.target.classList.add('selected');
        })
        listItem.addEventListener('dblclick', function (event) {
            if (event.target.classList.contains('completed')) {
                event.target.classList.remove('completed');
            } else {
                event.target.classList.add('completed');
            }
        })

        listItem.innerText = inputItem
        list.appendChild(listItem);
        entry.value = "";
    })

    btnApaga.addEventListener('click', function () {
        let listElements = document.querySelectorAll('li');
        for (i = 0; i < listElements.length; i += 1) {
            listElements[i].remove();
        }
    })

    btnApagaCompleto.addEventListener('click', function (event) {
        let elmtCompleted = document.querySelectorAll('.completed');
        for (i = 0; i < elmtCompleted.length; i += 1) {
            elmtCompleted[i].remove();
            }
    })
}
