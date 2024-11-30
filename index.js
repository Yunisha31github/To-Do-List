let tasks = JSON.parse(localStorage.getItem("tasks") ?? "[]");
let editIndex = null; //To see which task we are editing

function saveTasks() {
  tasks.length ? localStorage.setItem("tasks", JSON.stringify(tasks)) : localStorage.removeItem("tasks");
  renderTasks();
}

function addOrEditTask() {
  const name = document.getElementById("task").value.trim();
  const description = document.getElementById("description").value.trim();

  if (!name || !description) return alert("Please fill all fields!");

  if (editIndex !== null) {
    // Edit
    tasks[editIndex] = { ...tasks[editIndex], name, description };
    editIndex = null; //Clear editIndex after editing
    document.getElementById("addTaskButton").textContent = "Add Task";
  } else {
    // Add
    tasks.push({ name, description, status: "open" });
  }

  saveTasks();
  document.getElementById("task").value = "";
  document.getElementById("description").value = "";
}

function updateStatus(index) {
  tasks[index].status = tasks[index].status === "open" ? "completed" : "open";
  saveTasks();
}

function editTask(index) {
  const task = tasks[index];
  document.getElementById("task").value = task.name;
  document.getElementById("description").value = task.description;
  editIndex = index;
  document.getElementById("addTaskButton").textContent = "Edit Task";
}

function deleteTask(index) {
  tasks.splice(index, 1); // Remove the task at the given index
  saveTasks();            
}

function filterTasks() {
  renderTasks(document.getElementById("filter").value);
}

function renderTasks(filter = "all") {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  tasks
    .filter((task) => filter === "all" || task.status === filter)
    .forEach((task, index) => {
      taskList.innerHTML += `
        <li class="bg-blue-100 p-4 rounded shadow flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h3 class="font-bold">${task.name}</h3>
            <p class="text-gray-900">${task.description}</p>
            <p class="text-sm text-${task.status === "completed" ? "green" : "blue"}-500">${task.status}</p>
          </div>
          <div class="mt-2 md:mt-0 flex space-x-2">
            <button onclick="updateStatus(${index})" class="bg-${task.status === "completed" ? "blue" : "green"}-500 text-white px-3 py-1 rounded">
              ${task.status === "completed" ? "Mark as Open" : "Complete"}
            </button>
            <button onclick="editTask(${index})" class="bg-yellow-500 text-white px-3 py-1 rounded">Edit</button>
            <button onclick="deleteTask(${index})" class="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
          </div>
        </li>`;
    });
}


renderTasks();
