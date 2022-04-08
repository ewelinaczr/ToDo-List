// const { shift } = require("core-js/core/array");

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
const inputEditTime = document.querySelector(".edit-time");
// const value = inputAdd.value;

// buttons
const toolbarBtn = document.querySelector(".tools-button");
const addBtn = document.querySelector(".add-button");
const confirmBtn = document.querySelector(".confirm");
const cancelBtn = document.querySelector(".cancel");

//edit panel
const editPopUp = document.querySelector(".edit-panel");
const editPopUpInput = document.querySelector(".edit-input");
const editPopUpTime = document.querySelector(".edit-time");

// Toolbar panel
const toolbarPanel = document.querySelector(".toolbar");
const okToolsBtn = document.querySelector(".ok");
const iconsToolsPanel = document.querySelectorAll(".categories-description");
const iconsToolsPanelActive = document.querySelectorAll(".active");
const toolsInput = document.querySelector(".time-intup");

let idNumber = 0;
let newTask;
let editedTask;

////// DATE SETTINGS //////
const date = new Date();
dayName.textContent = date.toLocaleString("eng", { weekday: "long" });
today.textContent = date.toLocaleString("eng", { weekday: "short" });
day.textContent = date.getDate();
// console.log(day);
dayMonYear.textContent =
  date.toLocaleString("eng", { month: "long" }) + " " + date.getFullYear();

////// WEEK SETTING //////
[...weekDay].forEach(function (el, i) {
  date.setDate(date.getDate() + 1);
  let days = date.toLocaleString("eng", { weekday: "short" });
  el.textContent = days;
  // console.log(el.textContent);
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
  confirmBtn.addEventListener("click", changeTodo);
  cancelBtn.addEventListener("click", closePopUp);
  toolbarBtn.addEventListener("click", showToolbars);
  okToolsBtn.addEventListener("click", hideToolbars);
  // toolsInput.addEventListener("keyup", toolssetInput);
};

//////// ADD NEW TASK //////
const addNewTask = () => {
  if (inputAdd.value !== "") {
    // create id
    idNumber++;
    // create html li - task element
    newTask = document.createElement("li");
    newTask.setAttribute("id", idNumber);
    newTask.classList.add("activity");
    createiconPanel();
    createTimeTitlePanel();
    createToolsPanel();
    ulList.appendChild(newTask);
    inputAdd.value = "";
    toolsInput.value = "";
  }
  iconsToolsPanel.forEach((el) => el.classList.remove("active"));
};
////// TOOLBAR PANEL CONTROL //////
const showToolbars = () => {
  toolsInput.value = "";
  iconsToolsPanel.forEach((el) => el.classList.remove("active"));
  toolbarPanel.classList.remove("hidden");
};
const hideToolbars = () => {
  toolbarPanel.classList.add("hidden");
  // iconsToolsPanel.forEach((el) => el.classList.remove("active"));
};

for (const el of iconsToolsPanel) {
  // Set active class to div after click
  const setActive = function (e) {
    const active = e.target.closest("div");
    let activeImg = active.firstChild;
    // console.log(activeImg);
    iconsToolsPanel.forEach((el) => el.classList.remove("active"));
    active.classList.add("active");
  };
  el.addEventListener("click", setActive);
}
// const toolssetInput = function (e) {
//   const time = toolsInput.value;
//   console.log(time);
// };
// toolssetInput();
////// CREATE TASK PANEL  //////
const createiconPanel = () => {
  const iconPanel = document.createElement("div");
  if ([...iconsToolsPanel].some((el) => el.classList.contains("active"))) {
    let taskIcon = [...iconsToolsPanel].find((el) =>
      el.classList.contains("active")
    ).firstChild;
    console.log(taskIcon);
    let curIcon = taskIcon.getAttribute("src");
    console.log(curIcon);
    iconPanel.innerHTML = `<img class="activ-icon-title" src="/${curIcon}" />`;
  } else {
    iconPanel.innerHTML = `<img class="activ-icon-title" src="/icons/others.svg" />`;
  }
  newTask.appendChild(iconPanel);
};

const createTimeTitlePanel = () => {
  const timeTitlePanel = document.createElement("div");
  timeTitlePanel.classList.add("activ-title-time");

  const activTime = document.createElement("div");
  activTime.classList.add("activ-time");

  activTime.innerHTML = toolsInput.value || "";

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
    const doneTask = e.target.closest("li").id;
    let finishTask = document
      .getElementById(doneTask)
      .getElementsByClassName("activ-title-time")[0].lastChild;
    finishTask.classList.toggle("activ-completed");
    // .classList.contains("activ-title");

    console.log(finishTask);
  };

  ////// EDIT TASK CONTROL //////
  const edit = function (e) {
    // find old task text
    const oldTask = e.target.closest("li").id;
    editedTask = document
      .getElementById(oldTask)
      .getElementsByClassName("activ-title-time")[0];
    const oldTaskTitle = editedTask.lastChild.firstChild.textContent;
    // Open edit popup and set old task text
    editPopUp.classList.remove("hidden");
    editPopUpInput.value = oldTaskTitle;
    // find old time
    let timeTask = document
      .getElementById(oldTask)
      .getElementsByClassName("activ-title-time")[0].firstChild.textContent;
    // console.log(timeTask);
    editPopUpTime.value = timeTask;

    // timeTask = inputEditTime.value;
  };

  completeBtn.addEventListener("click", confirm);
  cancelBtn.addEventListener("click", cancel);
  editBtn.addEventListener("click", edit);
};

////// EDIT TASK BUTTONS CONTROL //////
const changeTodo = () => {
  if (editPopUpInput.value !== "") {
    editedTask.lastChild.firstChild.textContent = editPopUpInput.value;
    if (editedTask.firstChild.lastChild)
      editedTask.firstChild.lastChild.textContent = editPopUpTime.value;
    editPopUp.classList.add("hidden");
  } else {
    editPopUpInput.value = "";
  }
};

const closePopUp = () => {
  editPopUp.classList.add("hidden");
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
