// Load saved tasks on page load
window.onload = function () {
  loadTasks();
};

function addTask() {
  const input = document.getElementById("taskInput");
  const taskText = input.value.trim();

  if (taskText === "") {
    alert("Please write something!");
    return;
  }

  const task = {
    text: taskText,
    done: false
  };

  saveTask(task);
  renderTask(task);
  input.value = "";
}

function renderTask(task) {
  const li = document.createElement("li");
  li.textContent = task.text;

  if (task.done) {
    li.classList.add("done");
  }

  li.onclick = function () {
    li.classList.toggle("done");
    task.done = !task.done;
    updateStorage();
  };

  document.getElementById("taskList").appendChild(li);
}

function saveTask(newTask) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(newTask);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(task => renderTask(task));
}

function updateStorage() {
  const listItems = document.querySelectorAll("#taskList li");
  let tasks = [];

  listItems.forEach(li => {
    tasks.push({
      text: li.textContent,
      done: li.classList.contains("done")
    });
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}
