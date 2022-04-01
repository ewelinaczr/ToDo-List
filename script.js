const ulList = document.querySelector(".activities-list");

// date
const day = document.querySelector(".date-day");
const today = document.querySelector(".week-day-first");
const dayName = document.querySelector(".date-dayname");
const dayMonYear = document.querySelector(".date-monthyear");
const weekDay = document.querySelectorAll(".week-day");
const weekDate = document.querySelectorAll(".week-date");
// inputs
const inputAdd = document.querySelector(".input");
// const value = inputAdd.value;

// buttons
const toolbarBtn = document.querySelector(".tools-button");
const addBtn = document.querySelector(".add-button");

//edit panel
const editPopUp = document.querySelector(".edit-panel");
const editPopUpInput = document.querySelector(".edit-input");

let idNumber = 0;
let newTask;
let editedTask;

// DATE SETTINGS
const date = new Date();
dayName.textContent = date.toLocaleString("eng", { weekday: "long" });
today.textContent = date.toLocaleString("eng", { weekday: "short" });
day.textContent = date.getDate();
console.log(day);
dayMonYear.textContent =
  date.toLocaleString("eng", { month: "long" }) + " " + date.getFullYear();

// WEEK SETTING
[...weekDay].forEach(function (el, i) {
  date.setDate(date.getDate() + 1);
  let days = date.toLocaleString("eng", { weekday: "short" });
  el.textContent = days;
  console.log(el.textContent);
});
[...weekDate].forEach(function (el, i) {
  let tomorrow = new Date();
  tomorrow.setDate(new Date().getDate() + i);
  el.textContent = String(tomorrow).split(" ")[2];
});

const main = () => {
  // prepereDomElements();
  prepereDomEvents();
};

const prepereDomEvents = () => {
  addBtn.addEventListener("click", addNewTask);
  inputAdd.addEventListener("keyup", eneterCheck);
};

const addNewTask = () => {
  if (inputAdd.value !== "") {
    idNumber++;
    newTask = document.createElement("li");
    newTask.setAttribute("id", idNumber);
    newTask.classList.add("activity");
    createiconPanel();
    createTimeTitlePanel();
    createToolsPanel();
    ulList.appendChild(newTask);
    inputAdd.value = "";
  }
};

const createiconPanel = () => {
  const iconPanel = document.createElement("div");
  iconPanel.innerHTML = `<img class="activ-icon-title" src="/icons/shopping.svg" />`;
  newTask.appendChild(iconPanel);
};

const createTimeTitlePanel = () => {
  const timeTitlePanel = document.createElement("div");
  timeTitlePanel.classList.add("activ-title-time");

  const activTime = document.createElement("div");
  activTime.classList.add("activ-time");
  activTime.innerHTML = `16:30`;

  const activTitle = document.createElement("div");
  activTitle.classList.add("activ-title");
  activTitle.innerHTML = `<p>${inputAdd.value}</p>`;

  timeTitlePanel.appendChild(activTime);
  timeTitlePanel.appendChild(activTitle);
  newTask.appendChild(timeTitlePanel);
};

const createToolsPanel = () => {
  const toolsPanel = document.createElement("div");
  toolsPanel.classList.add("activ-panel");

  const completeBtn = document.createElement("div");
  completeBtn.classList.add("tick");
  completeBtn.innerHTML = `<img class='activ-icon' src='icons/tick.svg' />`;

  const editBtn = document.createElement("div");
  editBtn.classList.add("edit");
  editBtn.innerHTML = `EDIT`;

  const cancelBtn = document.createElement("div");
  cancelBtn.classList.add("cancel");
  cancelBtn.innerHTML = `<img class='activ-icon' src='icons/cancel.svg' />`;

  toolsPanel.appendChild(completeBtn);
  toolsPanel.appendChild(editBtn);
  toolsPanel.appendChild(cancelBtn);
  newTask.appendChild(toolsPanel);

  const cancel = function (e) {
    console.log("cancel");
    const deleteTask = e.target.closest("li");
    console.log(deleteTask);
    deleteTask.remove();
  };

  const confirm = function (e) {
    console.log("confirm");
    const doneTask = e.target.closest("li");
    let finishTask = document
      .getElementById(doneTask)
      .getElementsByClassName("activ-title-time");
    console.log(finishTask);
  };
  const edit = function (e) {
    console.log("edit");
    const oldTask = e.target.closest("li").id;
    // console.log(oldTask);
    editedTask = document
      .getElementById(oldTask)
      .getElementsByClassName("activ-title-time")[0];
    console.log(editedTask);
    const oldTaskTitle = editedTask.lastChild.firstChild.textContent;
    // console.log(oldTaskTitle);
    editPopUp.classList.remove("hidden");
    editPopUpInput.value = oldTaskTitle;
  };

  completeBtn.addEventListener("click", confirm);
  cancelBtn.addEventListener("click", cancel);
  editBtn.addEventListener("click", edit);
};

// const checkClick = (e) => {
// 	if (e.target.classList.contains("tick")) console.log("confirm");
// 	else if (e.target.classList.contains("edit")) console.log("edit");
// 	else if (e.target.classList.contains("cancel")) console.log("cancel");
// };

const eneterCheck = (event) => {
  if (event.key === "Enter") addNewTask();
};

document.addEventListener("DOMContentLoaded", main);
