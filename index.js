let todoItems = [
  "Сделать проектную работу",
  "Полить цветы",
  "Пройти туториал по Реакту",
  "Сделать фронт для своего проекта",
  "Прогуляться по улице в солнечный день",
  "Помыть посуду",
];

const listNode = document.querySelector(".to-do__list");
const formNode = document.querySelector(".to-do__form");
const inputNode = document.querySelector(".to-do__input");
const localStorageKey = "tasks_data";

function fetchTasks() {
  const savedData = localStorage.getItem(localStorageKey);

  if (savedData) {
    return JSON.parse(savedData);
  }

  return todoItems;
}

function buildItem(taskText) {
  const templateEl = document.getElementById("to-do__item-template");
  const cloneEl = templateEl.content.querySelector(".to-do__item").cloneNode(true);

  const textNode = cloneEl.querySelector(".to-do__item-text");
  const delBtn = cloneEl.querySelector(".to-do__item-button_type_delete");

  delBtn.addEventListener("click", () => {
    cloneEl.remove();

    const updatedTasks = extractTasks();
    storeTasks(updatedTasks);
  });

  const copyBtn = cloneEl.querySelector(".to-do__item-button_type_duplicate");

  copyBtn.addEventListener("click", () => {
    const itemNameText = textNode.textContent;

    const generatedItem = buildItem(itemNameText);
    listNode.prepend(generatedItem);

    const updatedTasks = extractTasks();
    storeTasks(updatedTasks);
  });

  const editBtn = cloneEl.querySelector(".to-do__item-button_type_edit");

  textNode.textContent = taskText;

  editBtn.addEventListener("click", () => {
    textNode.setAttribute("contenteditable", "true");
    textNode.focus();
  });

  textNode.addEventListener("blur", () => {
    textNode.setAttribute("contenteditable", "false");

    const updatedTasks = extractTasks();
    storeTasks(updatedTasks);
  });

  return cloneEl;
}

todoItems = fetchTasks();

todoItems.forEach((t) => {
  const el = buildItem(t);
  listNode.append(el);
});

function extractTasks() {
  const namesElements = document.querySelectorAll(".to-do__item-text");
  const tasksArr = [];

  namesElements.forEach((node) => {
    tasksArr.push(node.textContent);
  });

  return tasksArr;
}

function storeTasks(tasksArr) {
  localStorage.setItem(localStorageKey, JSON.stringify(tasksArr));
}

formNode.addEventListener("submit", (e) => {
  e.preventDefault();

  const val = inputNode.value;

  const newEl = buildItem(val);
  listNode.prepend(newEl);

  todoItems = extractTasks();
  storeTasks(todoItems);

  inputNode.value = "";
});