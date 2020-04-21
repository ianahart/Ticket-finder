const image = document.querySelector(".slideshow-img");
const caption = document.querySelector(".caption-text");
const leftArrowBtn = document.querySelector(".left-arrow-slide");
const rightArrowBtn = document.querySelector(".right-arrow-slide");
const slideShowContainer = document.querySelector(".slideshow-container");

const imageNames = [
  "shows-0",
  "shows-1",
  "shows-2",
  "shows-3",
  "shows-4",
  "shows-5",
];

const comments = [
  ,
  " Leo urna molestie at elementum eu.",
  "Orci sagittis eu volutpat odio facilisis.",
  "Gravida quis blandit turpis cursus in hac.",
  "Arcu odio ut sem nulla. Facilisi etiam dignissim diam quis enim.",
  "Lobortis elementum nibh tellus molestie nunc non blandit massa enim.",
  " Facilisis leo vel fringilla est.",
  " Porttitor leo a diam sollicitudin tempor id eu. ",
];
let incrementer = 0;
leftArrowBtn.addEventListener("click", handleLeftArrow);
rightArrowBtn.addEventListener("click", handleRightArrow);
function handleLeftArrow() {
  incrementer = incrementer - 1;
  if (incrementer < 0) {
    incrementer = imageNames.length - 1;
  }
  image.setAttribute("src", `/img/${imageNames[incrementer]}.jpg`);
  caption.textContent = comments[incrementer];
}

function handleRightArrow() {
  if (incrementer < imageNames.length - 1) {
    incrementer = incrementer + 1;
  } else {
    incrementer = 0;
  }
  image.setAttribute("src", `/img/${imageNames[incrementer]}.jpg`);
  caption.textContent = comments[incrementer];
}
