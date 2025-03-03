/** @format */

let currentPosition = 0;
const track = document.querySelector(".carousel-track");
const cards = document.querySelectorAll(".project-card");
const cardWidth = cards[0].offsetWidth;

function slideProjects(direction) {
  const maxPosition = -(cards.length - getVisibleCards()) * cardWidth;

  currentPosition += direction * cardWidth;

  // Loop back to start/end
  if (currentPosition > 0) currentPosition = maxPosition;
  if (currentPosition < maxPosition) currentPosition = 0;

  track.style.transform = `translateX(${currentPosition}px)`;
}

function getVisibleCards() {
  if (window.innerWidth > 1024) return 3;
  if (window.innerWidth > 768) return 2;
  return 1;
}

// Recalculate on window resize
window.addEventListener("resize", () => {
  currentPosition = 0;
  track.style.transform = `translateX(0)`;
});

const testimonialSlides = document.querySelectorAll(".testimonial-slide");
let currentSlide = 0;

function showSlide(index) {
  testimonialSlides.forEach((slide, i) => {
    slide.style.transform = `translateX(${100 * (i - index)}%)`;
  });
}

document.querySelector(".next").addEventListener("click", () => {
  currentSlide = (currentSlide + 1) % testimonialSlides.length;
  showSlide(currentSlide);
});

document.querySelector(".prev").addEventListener("click", () => {
  currentSlide =
    (currentSlide - 1 + testimonialSlides.length) % testimonialSlides.length;
  showSlide(currentSlide);
});

// Initialize first slide
showSlide(0);

let currentPositionTestimonial = 0;
const testimonialTrack = document.querySelector(".testimonial-track");
const slides = document.querySelectorAll(".testimonial-slide");
const slideWidth = 100 / slides.length; // Calculate width percentage per slide

function updateSlide(direction) {
  const visibleSlides = getVisibleSlides();
  const slideWidth = 100 / visibleSlides;
  const maxPosition = -(slides.length - visibleSlides) * slideWidth;

  currentPositionTestimonial += direction * slideWidth;

  // Handle boundaries
  if (currentPositionTestimonial > 0) currentPositionTestimonial = maxPosition;
  if (currentPositionTestimonial < maxPosition) currentPositionTestimonial = 0;

  testimonialTrack.style.transform = `translateX(${currentPositionTestimonial}%)`;
}

document
  .querySelector(".next")
  .addEventListener("click", () => updateSlide(-1));
document.querySelector(".prev").addEventListener("click", () => updateSlide(1));

// Initialize position
updateSlide(0);

function getVisibleSlides() {
  if (window.innerWidth <= 768) return 1;
  if (window.innerWidth <= 992) return 2;
  return 3;
}

function updateSlideWidth() {
  const visibleSlides = getVisibleSlides();
  const slideWidth = 100 / visibleSlides;

  // Update track width
  testimonialTrack.style.width = `${(slides.length * 100) / visibleSlides}%`;

  // Update individual slide widths
  slides.forEach((slide) => {
    slide.style.flex = `0 0 ${slideWidth}%`;
  });

  // Reset position to prevent gaps
  currentPositionTestimonial = 0;
  testimonialTrack.style.transform = `translateX(0)`;
}

document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector(".testimonial-track");
  const slides = document.querySelectorAll(".testimonial-slide");
  const nextBtn = document.querySelector(".carousel-btn.next");
  const prevBtn = document.querySelector(".carousel-btn.prev");
  let currentIndex = 0;

  function updateSlide(direction) {
    if (direction === "next") {
      if (currentIndex === slides.length - 1) {
        // If at last slide, smoothly transition back to first
        currentIndex = 0;
      } else {
        currentIndex++;
      }
    } else {
      if (currentIndex === 0) {
        // If at first slide, go to last
        currentIndex = slides.length - 1;
      } else {
        currentIndex--;
      }
    }

    // Update transform with smooth transition
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
  }

  // Event Listeners for buttons
  nextBtn.addEventListener("click", () => updateSlide("next"));
  prevBtn.addEventListener("click", () => updateSlide("prev"));
});
