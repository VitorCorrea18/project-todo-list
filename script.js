window.onload = function () {
    const entry = document.getElementById('texto-tarefa');
    const btnAdcionar = document.getElementById('criar-tarefa');
    const list = document.getElementById('lista-tarefas');

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
        listItem.innerText = inputItem
        list.appendChild(listItem);
        entry.value = "";
    })

    

}
