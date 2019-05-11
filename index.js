var addButton = document.getElementById('add');
var inputTask = document.getElementById('new-task');
var unfinishedTasks = document.getElementById('unfinished-tasks');
var finishedTasks = document.getElementById('finished-tasks');

function createNewElement (task, finished) {
    var listItem = document.createElement ('li');
    var checkBox = document.createElement ('button');

    if (finished) {
    checkBox.className = "material-icons checkBox";
    checkBox.innerHTML = "<i class='material-icons'>check_box</i>";     
    } else {
    checkBox.className = "material-icons checkBox";
    checkBox.innerHTML = "<i class='material-icons'>check_box_outline_blank</i>"; 
    }

    var label = document.createElement ('label');
    label.innerText = task;
    var input = document.createElement ('input');
    input.type = "text";
    var editButton = document.createElement ('button');
    editButton.className = "material-icons edit";
    editButton.innerHTML = "<i class='material-icons'>edit</i>";
    var deleteButton = document.createElement ('button');
    deleteButton.className = "material-icons delete";
    deleteButton.innerHTML = "<i class='material-icons'>delete</i>";

    listItem.appendChild (checkBox);
    listItem.appendChild (label);
    listItem.appendChild (input);
    listItem.appendChild (deleteButton);
    listItem.appendChild (editButton);
    
    return listItem;
}

function addTask () {
    if (inputTask.value) {
        var listItem = createNewElement (inputTask.value, false);
        unfinishedTasks.appendChild (listItem);
        bindTaskEvents (listItem, finishTask);
        inputTask.value = "";
    }

    save (); 
}

addButton.onclick = addTask;

function deleteTask () {
    var listItem = this.parentNode;
    var ul = listItem.parentNode;
    ul.removeChild (listItem);
    save (); 
}

function editTask () {
    var editButton = this;
    var listItem = this.parentNode;
    var label = listItem.querySelector ('label');
    var input = listItem.querySelector ('input[type = text]');

    var containsClass = listItem.classList.contains ('editMode');

    if (containsClass) {
        label.innerText = input.value;
        editButton.className = "material-icons edit";
        editButton.innerHTML = "<i class='material-icons'>edit</i>";
        save (); 
    } else {
        input.value = label.innerText;
        editButton.className = "material-icons save";
        editButton.innerHTML = "<i class='material-icons'>save</i>";
    }

    listItem.classList.toggle ('editMode');
}

function finishTask () {
    var listItem = this.parentNode;
    var checkBox = listItem.querySelector ('button.checkBox');
    checkBox.className = "material-icons checkBox";
    checkBox.innerHTML = "<i class='material-icons'>check_box</i>";

    finishedTasks.appendChild (listItem);
    bindTaskEvents (listItem, unfinishTask);
    save (); 
}

function unfinishTask () {
    var listItem = this.parentNode;
    var checkBox = listItem.querySelector ('button.checkBox');
    checkBox.className = "material-icons checkBox";
    checkBox.innerHTML = "<i class='material-icons'>check_box_outline_blank</i>";

    unfinishedTasks.appendChild (listItem);
    bindTaskEvents (listItem, finishTask);
    save (); 
}

function bindTaskEvents (listItem, checkBoxEvent) {
    var checkBox = listItem.querySelector ('button.checkBox');
    var editButton = listItem.querySelector ('button.edit');
    var deleteButton = listItem.querySelector ('button.delete');

    checkBox.onclick = checkBoxEvent;
    editButton.onclick = editTask;
    deleteButton.onclick = deleteTask;
}

function save () {  //Для сохранения задач (что бы не удалялись после обновления страницы)
    var finishedTaskArr = [];
    var unfinishedTaskArr = [];

    for (var i = 0; i<unfinishedTasks.children.length; i++ ) {
        unfinishedTaskArr.push(unfinishedTasks.children[i].getElementsByTagName('label')[0].innerText);
    }

    for (var i = 0; i<finishedTasks.children.length; i++ ) {
        finishedTaskArr.push(finishedTasks.children[i].getElementsByTagName('label')[0].innerText);
    }
    localStorage.removeItem ('todo');
    localStorage.setItem ('todo', JSON.stringify({
        unfinishedTasks: unfinishedTaskArr,
        finishedTasks: finishedTaskArr
    }));
}

function load () {

    return JSON.parse (localStorage.getItem ('todo'))
}

var data = load ();

for (var i = 0; i < data.unfinishedTasks.length; i++){
    var listItem = createNewElement (data.unfinishedTasks[i], false);
    unfinishedTasks.appendChild(listItem);
    bindTaskEvents (listItem, finishTask);
}

for (var i = 0; i < data.finishedTasks.length; i++){
    var listItem = createNewElement (data.finishedTasks[i], true);
    finishedTasks.appendChild(listItem);
    bindTaskEvents (listItem, finishTask);
}

function load(){
    return JSON.parse(localStorage.getItem('todo'));
}