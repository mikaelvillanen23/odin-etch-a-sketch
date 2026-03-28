// let currentColor = "black"
let pointerHeld = false;

window.addEventListener("pointerdown", () => {
  pointerHeld = true;
});
window.addEventListener("pointerup", () => {
  pointerHeld = false;
});

function createCanvas() {
  let n = Number(prompt("Determine canvas size (min = 10, max = 100)"));

  const container = document.querySelector("#container");
  container.innerHTML = ""; // remove previous squares

  for (let i = 0; i < n; i++) {
    const row = document.createElement("div");
    row.classList.add("row");
    container.appendChild(row);

    for (let j = 0; j < n; j++) {
      const square = document.createElement("div");
      square.classList.add("square");
      square.addEventListener("pointerdown", () => {
        square.classList.add("colored"); // to color the clicked square itself
      });
      square.addEventListener("pointerover", () => {
        if (pointerHeld === true) square.classList.add("colored");
      });
      row.appendChild(square);
    }
  }
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




/* TODO:
+ creation of grid with flexbox out of user input
  -accept numbers only -> if something else alert "numbers only pls"
  -min = 10, max = 100 -> if OB, default to min/max
- create default canvas of 16x16
- additional functionalities:
  - clear current
  - eraser with secondary click!
  - colorpicker?
  - randomizer for color?
  - opacity?
  + show/hide grid
*/