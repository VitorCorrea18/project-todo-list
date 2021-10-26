window.onload = function() {
    const entry = document.getElementById('texto-tarefa');
    const btnAdcionar = document.getElementById('criar-tarefa');
    const list = document.getElementById('lista-tarefas');
    
    btnAdcionar.addEventListener('click', function(){
        let inputItem = entry.value
        let listItem = document.createElement('li');
        listItem.className = 'list-item';
        listItem.innerText = inputItem
        list.appendChild(listItem);
        entry.value = "";
    })

    

}