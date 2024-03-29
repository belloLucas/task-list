"use strict";

/* Getting the HTML elements */
const boxTasks = document.getElementById("box-tasks");
const btnInput = document.getElementById("btn");
const textInput = document.getElementById("textInput");

const tasks = [];

const createTask = function (idx) {
  const taskDiv = `        
        <div id="task" class="task">
            <p id="pTask">${tasks[idx]}</p>
            <div class="buttons">
                <button class="complete">
                    <i class="bi bi-check-lg"></i>
                </button>
                <button class="edit">
                    <i class="bi bi-pencil"></i>
                </button>
                <button class="delete">
                    <i id="" class="bi bi-x-lg"></i>
                </button>
            </div>
        </div>
`;
  /*
  innerHTML não está sendo usado pois o mesmo "apaga" o elemento anterior que foi adicionado com ele
  boxTasks.innerHTML += taskDiv;
  */
  boxTasks.insertAdjacentHTML("beforeend", taskDiv);
  return;
};

/* Function that will add the element to box-task div */
btnInput.addEventListener("click", () => {
  /* Checking if user has written a value */
  if (textInput.value == "") {
    alert("Você precisa inserir uma tarefa!");
    return;
  }

  /* Checking if the task is duplicated */
  for (let i = 0; i < tasks.length; i++) {
    if (textInput.value == tasks[i]) {
      alert(
        "Essa tarefa já existe, insira uma nova ou altere a que já existe!"
      );
      textInput.value = "";
      return;
    }
  }

  tasks.push(textInput.value);
  const indexTask = tasks.indexOf(textInput.value);
  textInput.value = "";
  createTask(indexTask);

  /* Function to complete items */
  const completeBtn = document.getElementsByClassName("complete")[indexTask];
  completeBtn.addEventListener("click", () => {
    completeBtn.parentNode.parentNode.classList.add("complete");

    //This if will delete the task that contains the "complete" class.
    if (completeBtn.parentNode.parentNode.classList.contains("complete")) {
      tasks.splice(indexTask, 1);
      completeBtn.parentNode.parentNode.remove();
    }
  });

  /* Function to delete items */
  const deleteBtn = document.getElementsByClassName("delete")[indexTask];
  deleteBtn.addEventListener("click", () => {
    tasks.splice(indexTask, 1);
    deleteBtn.parentNode.parentNode.remove();
  });

  /* Function to edit items */
  const editBtn = document.getElementsByClassName("edit")[indexTask];
  editBtn.addEventListener("click", () => {
    const newTaskValue = prompt("Digite aqui o que deseja alterar: ");
    const taskEl = editBtn.parentNode.parentNode;
    const taskText = taskEl.querySelector("#pTask");
    tasks[indexTask] = newTaskValue;
    taskText.innerText = newTaskValue;
  });
});
