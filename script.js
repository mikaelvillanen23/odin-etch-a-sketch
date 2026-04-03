// *** Variables and DOM elements ***

let currentColor = "#000000";
let randomizerOn = false;
let pointer0Held = false;
let pointer2Held = false;
let currentSize = 16;

window.addEventListener("mousedown", (event) => {
  switch (event.button) {
    case 0: // mouse left
      pointer0Held = true;
      break;
    case 2: // mouse right
      pointer2Held = true;
      break;
  }
});
window.addEventListener("mouseup", () => {
  pointer0Held = false;
  pointer2Held = false;
});

const container = document.querySelector("#container");
const resetButton = document.querySelector("#resetButton");
resetButton.addEventListener("click", () => {
  createCanvas(currentSize)
});
const canvasButton = document.querySelector("#canvasButton");
canvasButton.addEventListener("click", () => {
  createCanvas(userInput());
});
const gridButton = document.querySelector("#gridButton");
gridButton.addEventListener("click", toggleGrid);
const sizeInfo = document.querySelector(".currentSize");
sizeInfo.textContent = `${currentSize} x ${currentSize}`;
const colorPicker = document.querySelector("#colorPicker");
colorPicker.addEventListener("change", (event) => {
  currentColor = event.target.value;
});
const randomizer = document.querySelector("#randomizer");
randomizer.addEventListener("click", () => {
  if (randomizerOn === false) {
    randomizerOn = true;
  } else randomizerOn = false;
});


// *** Functions ***

function userInput() {
  let n = Number(prompt("Determine canvas side length (min = 10, max = 100).\n\nNote:\nIf you fail to hit the given range or press Cancel, canvas size will default to 16x16."));
  return n;
}

function createCanvas(n) {
  container.innerHTML = ""; // remove previous squares

  if (n < 10 || n > 100 || isNaN(n)) { // Number() returns NaN if input includes letters (except "(-)Infinity")
    createCanvas(16);
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
        square.addEventListener("mousedown", (event) => { // to (de)color the clicked square itself
          if (randomizerOn === true) {
            switch (event.button) {
              case 0:
                square.setAttribute("style", `background-color: ${getRandomRGB()}`);
                break;
              case 2:
                square.setAttribute("style", "background-color: white");
                break;
            }
          } else {
              switch (event.button) {
                case 0:
                  square.setAttribute("style", `background-color: ${currentColor}`);
                  break;
                case 2:
                  square.setAttribute("style", "background-color: white");
                  break;
              }
          }
        });
        square.addEventListener("mouseover", () => {
          if (pointer0Held === true) {
            if (randomizerOn === true) {
              square.setAttribute("style", `background-color: ${getRandomRGB()}`);
            } else {
              square.setAttribute("style", `background-color: ${currentColor}`);
            }
          } else if (pointer2Held === true) {
            square.setAttribute("style", "background-color: white");
          }
        });
        square.addEventListener("contextmenu", function (event) {
          event.preventDefault();
        });
        row.appendChild(square);
      }
    }
  }
  if (gridButton.textContent === "Hide grid") gridButton.textContent = "Show grid";
  sizeInfo.textContent = `${currentSize} x ${currentSize}`;
}

function toggleGrid() {
  const squares = document.querySelectorAll(".square");

  squares.forEach((square) => {
    square.classList.toggle("grid");
  });
  if (gridButton.textContent === "Show grid") {
    gridButton.textContent = "Hide grid";
  } else gridButton.textContent = "Show grid";
}

function getRandomRGB() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}

createCanvas(16);


/* TODO:
 - add credit for pencil cursor graphic
*/