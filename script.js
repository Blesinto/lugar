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
  const maxPosition = -(slides.length - 1) * slideWidth;

  currentPositionTestimonial += direction * slideWidth;

  // Handle boundaries
  if (currentPositionTestimonial > 0) currentPositionTestimonial = maxPosition;
  if (currentPositionTestimonial < maxPosition) currentPositionTestimonial = 0;

  // Apply transform
  testimonialTrack.style.transform = `translateX(${currentPositionTestimonial}%)`;
}

document
  .querySelector(".next")
  .addEventListener("click", () => updateSlide(-1));
document.querySelector(".prev").addEventListener("click", () => updateSlide(1));

// Initialize position
updateSlide(0);

function getVisibleSlides() {
  // Determine number of visible slides based on screen width
  if (window.innerWidth <= 768) {
    return 1; // Show 1 slide on mobile
  } else if (window.innerWidth <= 992) {
    return 2; // Show 2 slides on tablets
  }
  return 3; // Show 3 slides on desktop
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
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");
  const body = document.body;

  // Create overlay element
  const overlay = document.createElement("div");
  overlay.classList.add("overlay");
  body.appendChild(overlay);

  // Toggle menu function
  function toggleMenu(event) {
    if (event) event.preventDefault();

    hamburger.classList.toggle("active");
    navLinks.classList.toggle("active");
    overlay.classList.toggle("active");

    // Toggle body scroll
    body.style.overflow = navLinks.classList.contains("active") ? "hidden" : "";
  }

  // Event listeners
  hamburger.addEventListener("click", toggleMenu);
  overlay.addEventListener("click", toggleMenu);

  // Close menu when clicking nav links
  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      if (navLinks.classList.contains("active")) {
        toggleMenu();
      }
    });
  });

  // Handle escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && navLinks.classList.contains("active")) {
      toggleMenu();
    }
  });

  // Close menu on window resize if open
  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (window.innerWidth > 768 && navLinks.classList.contains("active")) {
        toggleMenu();
      }
    }, 250);
  });
});
