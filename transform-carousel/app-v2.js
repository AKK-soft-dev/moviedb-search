const carouselTransform = document.querySelector(".carousel");
const wrapper = document.querySelector(".wrapper");

const createCarouselItems = (length) => {
  const carouselItems = Array(length)
    .fill(undefined)
    .map((_, i) => {
      return `<div class='carousel-item'>${i}</div>`;
    });

  return carouselItems.join("");
};

carouselTransform.innerHTML = createCarouselItems(50);
const itemWidth = carouselTransform.children[0].getBoundingClientRect().width;

// Touch Events
let touchStartX = 0;
let touchDeltaX = 0;
let touchScrollPosition = 0;

carouselTransform.addEventListener("touchstart", (e) => {
  touchStartX = e.touches[0].clientX;
  touchScrollPosition = -touchStartX;
});

carouselTransform.addEventListener("touchmove", (e) => {
  touchDeltaX = e.touches[0].clientX - touchStartX;
  const newScrollPosition = touchScrollPosition + touchDeltaX;
  carouselTransform.style.transform = `translateX(${newScrollPosition}px)`;
});

carouselTransform.addEventListener("touchend", () => {
  touchScrollPosition += touchDeltaX;
  touchStartX = 0;
  touchDeltaX = 0;
});

// Mouse Events
let isDragging = false;
let mouseX = 0;
let mouseDeltaX = 0;
let mouseScrollPosition = 0;

carouselTransform.addEventListener("mousedown", (e) => {
  isDragging = true;
  mouseX = e.clientX;
  mouseScrollPosition = -mouseX;
  e.preventDefault();
});

wrapper.addEventListener("mousemove", (e) => {
  if (!isDragging) return;

  mouseDeltaX = e.clientX - mouseX;
  const newScrollPosition = mouseScrollPosition + mouseDeltaX;
  carouselTransform.style.transform = `translateX(${newScrollPosition}px)`;
});

wrapper.addEventListener("mouseup", () => {
  mouseScrollPosition += mouseDeltaX;
  isDragging = false;
  mouseX = 0;
  mouseDeltaX = 0;
});

wrapper.addEventListener("mouseleave", () => {
  mouseScrollPosition += mouseDeltaX;
  isDragging = false;
  mouseX = 0;
  mouseDeltaX = 0;
});

// Automatic Scroll
setInterval(() => {
  touchScrollPosition -= itemWidth;
  mouseScrollPosition -= itemWidth;
  carouselTransform.style.transform = `translateX(${touchScrollPosition}px)`;
}, 3000);
