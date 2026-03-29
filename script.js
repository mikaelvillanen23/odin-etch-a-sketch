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

  let n = Number(prompt("Determine canvas side length (min = 10, max = 100).\nIf you fail to hit the given range, size will default to 16x16."));
  currentSize = n;

  if (n < 10 || n > 100) {
    resetCanvas(16);
  } else {
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
}

const canvasButton = document.querySelector("#canvasButton");
canvasButton.addEventListener("click", createCanvas);

const gridButton = document.querySelector("#gridButton");
gridButton.addEventListener("click", toggleGrid);

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
+ creation of grid with flexbox out of user input
  +accept numbers only -> if something else alert "numbers only pls"
  +min = 10, max = 100 -> if OB, default to min/max
+ create default canvas of 16x16
Additional functionalities:
  + clear current
  - eraser with secondary click!
  - colorpicker?
  - randomizer for color?
  - opacity?
  + show/hide grid
*/