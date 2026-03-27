// let currentColor = "black"
let pointerHeld = false;

window.addEventListener("pointerdown", () => {
  pointerHeld = true;
});
window.addEventListener("pointerup", () => {
  pointerHeld = false;
});

const squares = document.querySelectorAll(".square");

squares.forEach((square) => {
  square.addEventListener("pointerdown", () => {
    // to color the clicked square itself
    square.classList.add("colored");
  });
  square.addEventListener("pointerover", () => {
    if (pointerHeld === true) square.classList.add("colored");
  });
});


/* TODO:
- copy relevant code to repo files + commit
- creation of grid with flexbox out of user input (accept numbers only + min = 16, max = 100)
- additional functionalities:
  - eraser with secondary click!
  - colorpicker?
  - randomizer for color?
  - opacity?
*/