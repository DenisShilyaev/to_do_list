var addButton = document.getElementById('add');
var inputTask = document.getElementById('new-task');
var unfinishedTask = document.getElementById('unfinished-tasks');
var finishedTask = document.getElementById('finished-tasks');

function createNewElement (task) {
    var listItem = document.createElement ('li');
    var checkBox = document.createElement ('button');
    checkBox.className = "material-icons checkBox";
    checkBox.innerHTML = "<i class='material-icons'>check_box_outline_blank</i>";
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
        var listItem = createNewElement (inputTask.value);
        unfinishedTask.appendChild (listItem);
        bindTaskEvents (listItem, finishTask);
        inputTask.value = "";
    }
}

addButton.onclick = addTask;

function deleteTask () {
    var listItem = this.parentNode;
    var ul = listItem.parentNode;
    ul.removeChild (listItem);
}

function editTask () {
    var editButton = this;
    var listItem = this.parentNode;
    var label = listItem.querySelector ('label');
    var input = listItem.querySelector ('input [type = text]');

    var containsClass = listItem.classList.contains ('editMode');

    if (containsClass) {
        label.innerText = imput.value;
        editButton.className = "material-icons edit";
        editButton.innerHTML = "<i class='material-icons'>edit</i>";
    } else {
        input.value = label.innerTextl;
        editButton.className = "material-icons edit";
        editButton.innerHTML = "<i class='material-icons'>edit</i>";
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
}

function unfinishTask () {
    var listItem = this.parentNode;
    var checkBox = listItem.querySelector ('button.checkBox');
    checkBox.className = "material-icons checkBox";
    checkBox.innerHTML = "<i class='material-icons'>check_box_outline_blank</i>";

    unfinishedTasks.appendChild (listItem);
    bindTaskEvents (listItem, finishTask);
}

function bindTaskEvents (listItem, checkBoxEvent) {
    var checkBox = listItem.querySelector ('button.checkBox');
    var editButton = listItem.querySelector ('button.edit');
    var deleteButton = listItem.querySelector ('button.delete');

    checkBox.onclick = checkBoxEvent;
    editButton.onclick = editTask;
    deleteButton.onclick = deleteTask;
}