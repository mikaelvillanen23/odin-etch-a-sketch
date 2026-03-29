// *** Variables and DOM elements ***

// let currentColor = "black"
let pointerHeld = false;
let currentSize = 16;

window.addEventListener("pointerdown", () => {
  pointerHeld = true;
});
window.addEventListener("pointerup", () => {
  pointerHeld = false;
});

const container = document.querySelector("#container");
const resetButton = document.querySelector("#resetButton");
resetButton.addEventListener("click", () => {
  resetCanvas(currentSize)
});
const canvasButton = document.querySelector("#canvasButton");
canvasButton.addEventListener("click", createCanvas);
const gridButton = document.querySelector("#gridButton");
gridButton.addEventListener("click", toggleGrid);
const sizeInfo = document.querySelector(".currentSize");
sizeInfo.textContent = `${currentSize} x ${currentSize}`;


// *** Function definitions ***

function resetCanvas(n) {
  container.innerHTML = ""; // remove previous squares

  for (let i = 0; i < n; i++) {
    const row = document.createElement("div");
    row.classList.add("row");
    container.appendChild(row);

    for (let j = 0; j < n; j++) {
      const square = document.createElement("div");
      square.classList.add("square");
      square.addEventListener("pointerdown", () => { // to color the clicked square itself
        square.classList.add("colored"); 
      });
      square.addEventListener("pointerover", () => {
        if (pointerHeld === true) square.classList.add("colored");
      });
      row.appendChild(square);
    }
  }
  if (gridButton.textContent === "Hide grid") gridButton.textContent = "Show grid";
}

function createCanvas() {
  container.innerHTML = ""; // remove previous squares

  let n = Number(prompt("Determine canvas side length (min = 10, max = 100).\n\nNote:\nIf you fail to hit the given range or press Cancel, canvas size will default to 16x16."));

  if (n < 10 || n > 100 || isNaN(n)) {
    resetCanvas(16);
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
        square.addEventListener("pointerdown", () => { // to color the clicked square itself
          square.classList.add("colored"); 
        });
        square.addEventListener("pointerover", () => {
          if (pointerHeld === true) square.classList.add("colored");
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

resetCanvas(16);


/* TODO:
Additional functionalities:
  - eraser with secondary click?
  - colorpicker?
  - randomizer for color?
  - opacity?
*/