// *** Variables and DOM elements ***

// let currentColor = "black"
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


// *** Function definitions ***

function userInput() {
  let n = Number(prompt("Determine canvas side length (min = 10, max = 100).\n\nNote:\nIf you fail to hit the given range or press Cancel, canvas size will default to 16x16."));
  return n;
}

function createCanvas(n) {
  container.innerHTML = ""; // remove previous squares

  if (n < 10 || n > 100 || isNaN(n)) {
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
          switch (event.button) {
            case 0:
              square.classList.add("colored");
              break;
            case 2:
              square.classList.remove("colored");
              break;
          }
        });
        square.addEventListener("mouseover", () => {
          if (pointer0Held === true) {
            square.classList.add("colored");
          } else if (pointer2Held === true) {
            square.classList.remove("colored");
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

createCanvas(16);


/* TODO:
  - info for UI
Additional functionalities:
  - colorpicker?
  - randomizer for color?
  - opacity?
*/