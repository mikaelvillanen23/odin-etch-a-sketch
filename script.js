// *** Variables and DOM elements ***

let currentColor = "#000000";
let colorPickerOn = false;
let pointer0Held = false;
let pointer2Held = false;
let currentSize = 16;

window.addEventListener("mousedown", (event) => { // window was chosen so that click+hold can begin outside of canvas, and stay active even when leaving canvas area
  switch (event.button) {
    case 0: // mouse left
      pointer0Held = true;
      break;
    case 2: // mouse right
      pointer2Held = true;
      break;
  }
  colorPickerOn = false;
});
window.addEventListener("mouseup", () => {
  pointer0Held = false;
  pointer2Held = false;
});

const container = document.querySelector("#container");

const resetButton = document.querySelector("#resetButton");
resetButton.addEventListener("click", () => {
  createNewCanvas(currentSize);
});

const canvasButton = document.querySelector("#canvasButton");
canvasButton.addEventListener("click", () => {
  createNewCanvas(getUserInput());
});

const gridButton = document.querySelector("#gridButton");
gridButton.addEventListener("click", toggleGrid);

const sizeInfo = document.querySelector(".currentSize");
sizeInfo.textContent = `${currentSize} x ${currentSize}`;

const colorPicker = document.querySelector("#colorPicker");
colorPicker.addEventListener("click", () => {
  colorPickerOn = true;
});
colorPicker.addEventListener("change", (event) => {
  currentColor = event.target.value;
  randomizer.checked = false;
});

const randomizer = document.querySelector("#randomizer");


// *** Functions ***

function getUserInput() {
  let n = Number(prompt("Determine canvas side length (min = 1, max = 100).\n\nNote:\nIf you fail to hit the given range or press Cancel, canvas size will default to 16x16."));
  return n;
}

function createNewCanvas(n) {
  container.innerHTML = ""; // remove previous squares

  if (n < 1 || n > 100 || isNaN(n)) { // Number() returns NaN if input includes letters (except "(-)Infinity")
    createNewCanvas(16);
    currentSize = 16;
  } else {
      currentSize = n;
      for (let i = 0; i < n; i++) {
      const row = document.createElement("div");
      row.classList.add("row");
      container.appendChild(row);

      for (let j = 0; j < n; j++) {
        const square = document.createElement("div");
        square.classList.add("square");
        square.addEventListener("mousedown", (event) => {colorClick(event, square)}); // to (de)color the clicked square itself
        square.addEventListener("mouseover", () => {colorHold(square)});
        square.addEventListener("contextmenu", (event) => {event.preventDefault()});
        row.appendChild(square);
      }
    }
  }
  gridButton.textContent = "Show grid";
  sizeInfo.textContent = `${currentSize} x ${currentSize}`;
}

function colorClick(event, elem) {
  if (colorPickerOn) {
    // do nothing, so that the picker interface closes without the click being registered should it happen on the canvas
  } else {
    switch (event.button) {
      case 0:
        if (randomizer.checked) {
          elem.setAttribute("style", `background-color: ${getRandomRGB()}`);
          break;          
        } else {
            elem.setAttribute("style", `background-color: ${currentColor}`);
            break;          
        }
      case 2:
        elem.setAttribute("style", "background-color: white");
        break;
    }
  }
}

function colorHold(elem) {
  if (pointer0Held) {
    if (randomizer.checked) {
      elem.setAttribute("style", `background-color: ${getRandomRGB()}`);
    } else {
      elem.setAttribute("style", `background-color: ${currentColor}`);
    }
  } else if (pointer2Held) {
    elem.setAttribute("style", "background-color: white");
  }
}

function toggleGrid() {
  const squares = document.querySelectorAll(".square");
  squares.forEach((square) => {
    square.classList.toggle("grid");
  });

  gridButton.textContent === "Show grid" ? 
  gridButton.textContent = "Hide grid" :
  gridButton.textContent = "Show grid";
}

function getRandomRGB() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}

createNewCanvas(16);


/* TODO:
 - add credit for pencil cursor graphic
 */