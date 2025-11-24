const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");
const addBtn = document.getElementById("add-btn");

loadTasks();

addBtn.addEventListener("click", addTask);

function addTask() {
    if (taskInput.value.trim() === "") return;

    const taskText = taskInput.value;

    const li = createTaskElement(taskText);
    taskList.appendChild(li);

    saveTasks();
    taskInput.value = "";
}

function createTaskElement(text) {
    const li = document.createElement("li");
    li.className = "task";
    li.innerHTML = `
        <span>${text}</span>
        <button class="done-btn">✔</button>
    `;

    li.querySelector(".done-btn").addEventListener("click", () => {
        li.classList.toggle("completed");
        saveTasks();
    });

    return li;
}

function saveTasks() {
    const tasks = [];
    document.querySelectorAll(".task").forEach(task => {
        tasks.push({
            text: task.querySelector("span").innerText,
            completed: task.classList.contains("completed")
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    const saved = JSON.parse(localStorage.getItem("tasks")) || [];
    saved.forEach(t => {
        const li = createTaskElement(t.text);
        if (t.completed) li.classList.add("completed");
        taskList.appendChild(li);
    });
}
