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

const itemWidth = carouselTransform.children[0].getBoundingClientRect();
let activeIndex = 0;

// Touch Events
let touchStartX = 0;
let touchDeltaX = 0;

carouselTransform.addEventListener("touchstart", (e) => {
  touchStartX = e.touches[0].clientX;
});

carouselTransform.addEventListener("touchmove", (e) => {
  touchDeltaX = e.touches[0].clientX - touchStartX;
  const newScrollPosition = -activeIndex * itemWidth.width + touchDeltaX;
  carouselTransform.style.transform = `translateX(${newScrollPosition}px)`;
});

carouselTransform.addEventListener("touchend", () => {
  if (Math.abs(touchDeltaX) > itemWidth.width / 3) {
    activeIndex +=
      touchDeltaX > 0
        ? -Math.round(touchDeltaX / itemWidth.width)
        : Math.round(-touchDeltaX / itemWidth.width);
  }
  touchStartX = 0;
  touchDeltaX = 0;
  activeIndex = Math.max(0, Math.min(activeIndex, 49)); // Ensure activeIndex stays within bounds
  const newScrollPosition = -activeIndex * itemWidth.width;
  carouselTransform.style.transform = `translateX(${newScrollPosition}px)`;
});

// Mouse Events
let isDragging = false;
let mouseX = 0;
let mouseDeltaX = 0;

carouselTransform.addEventListener("mousedown", (e) => {
  isDragging = true;
  mouseX = e.clientX;
  e.preventDefault();
});

wrapper.addEventListener("mousemove", (e) => {
  if (!isDragging) return;

  mouseDeltaX = e.clientX - mouseX;
  const newScrollPosition = -activeIndex * itemWidth.width + mouseDeltaX;
  carouselTransform.style.transform = `translateX(${newScrollPosition}px)`;
});

wrapper.addEventListener("mouseup", () => {
  if (Math.abs(mouseDeltaX) > itemWidth.width / 3) {
    activeIndex +=
      mouseDeltaX > 0
        ? -Math.round(mouseDeltaX / itemWidth.width)
        : Math.round(-mouseDeltaX / itemWidth.width);
  }
  isDragging = false;
  mouseX = 0;
  mouseDeltaX = 0;
  activeIndex = Math.max(0, Math.min(activeIndex, 49)); // Ensure activeIndex stays within bounds
  const newScrollPosition = -activeIndex * itemWidth.width;
  carouselTransform.style.transform = `translateX(${newScrollPosition}px)`;
});

wrapper.addEventListener("mouseleave", () => {
  isDragging = false;
  mouseX = 0;
  mouseDeltaX = 0;
});

// Automatic Scroll
setInterval(() => {
  activeIndex = (activeIndex + 1) % 50;
  const newScrollPosition = -activeIndex * itemWidth.width;
  carouselTransform.style.transform = `translateX(${newScrollPosition}px)`;
}, 3000);
