// Wait for the DOM to load
document.addEventListener("DOMContentLoaded", () => {
  // GSAP animations for scroll-triggered sections
  gsap.registerPlugin(ScrollTrigger);

  gsap.utils.toArray(".animate-section").forEach((section) => {
    gsap.fromTo(
      section,
      { opacity: 0, y: 50 }, // Start 50px down
      {
        opacity: 1,
        y: 0, // Slide to original position
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%", // Trigger when the top of the section reaches 80% of viewport height
          toggleActions: "play none none reverse", // Play when scrolling down, reverse when scrolling up
        },
      }
    );
  });
});

////////////////////////////   HEADER      ///////////////////////////

// Function to shake the logo on click
function shakeLogo() {
  const logo = document.querySelector(".logo img");
  if (logo) {
    if (!logo.classList.contains("shake")) {
      logo.classList.add("shake");

      // Remove the class after animation ends to allow re-trigger
      logo.addEventListener("animationend", () => {
        logo.classList.remove("shake");
      }, { once: true }); // Ensure the listener runs only once
    }

    // Scroll to top functionality
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

// Smooth scroll for Shoelace tabs
document.querySelectorAll("sl-tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    const targetId = tab.getAttribute("panel");
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  });
});

////////////////////////////   HISTORY     ///////////////////////////

// Carousel Functionality
let currentImageIndex = 0;
const images = document.querySelectorAll('.hero-image');
const totalImages = images.length;

function showImage(index) {
  const carousel = document.querySelector('.carousel');
  if (carousel) {
    carousel.style.transform = `translateX(-${index * 100}%)`;
  }
}

function nextImage() {
  currentImageIndex = (currentImageIndex + 1) % totalImages;
  showImage(currentImageIndex);
}

function prevImage() {
  currentImageIndex = (currentImageIndex - 1 + totalImages) % totalImages;
  showImage(currentImageIndex);
}

// Popup Functionality
function showPopup() {
  const popup = document.getElementById('infoPopup');
  if (popup) {
    popup.style.display = 'block';
  }
}

function closePopup() {
  const popup = document.getElementById('infoPopup');
  if (popup) {
    popup.style.display = 'none';
  }
}

////////////////////////////   CARD     ///////////////////////////

function flipCard(card, soundPath) {
  // Toggle the flipped attribute on the card
  const isFlipped = card.hasAttribute('flipped');
  card.toggleAttribute('flipped', !isFlipped);

  // Play sound when the card is flipped to the back
  if (!isFlipped) {
    const audio = new Audio(soundPath);
    audio.play();
  }
}

////////////////////////////   BENEFITS     ///////////////////////////

// Carousel controls
let currentSlide = 1;
const totalSlides = 3;

function showSlide(slideNumber) {
  for (let i = 1; i <= totalSlides; i++) {
    const slide = document.getElementById(`slide${i}`);
    if (slide) {
      slide.style.display = 'none';
    }
  }
  const activeSlide = document.getElementById(`slide${slideNumber}`);
  if (activeSlide) {
    activeSlide.style.display = 'flex';
  }
}

function nextSlide() {
  currentSlide = currentSlide >= totalSlides ? 1 : currentSlide + 1;
  showSlide(currentSlide);
}

function prevSlide() {
  currentSlide = currentSlide <= 1 ? totalSlides : currentSlide - 1;
  showSlide(currentSlide);
}

showSlide(currentSlide); // Initialize carousel

////////////////////////////   WINE + CHEESE     ///////////////////////////

// Pairing data for each cheese type
const cheeseImage = document.getElementById('cheese-image');
const wineImage = document.getElementById('wine-image');
const cheeseName = document.getElementById('cheese-name');
const wineName = document.getElementById('wine-name');

const pairings = {
  gouda: { cheeseImage: 'gouda', cheeseName: 'Gouda', wineImage: 'pinot_noir', wineName: 'Pinot Noir + Sauvignon Blanc' },
  brie: { cheeseImage: 'brie', cheeseName: 'Brie', wineImage: 'chardonnay', wineName: 'Chardonnay + Champagne' },
  cheddar: { cheeseImage: 'cheddar', cheeseName: 'Cheddar', wineImage: 'cabernet', wineName: 'Cabernet Sauvignon' },
  blue: { cheeseImage: 'blue', cheeseName: 'Blue Cheese', wineImage: 'port', wineName: 'Port + Zinfandel' }
};

function showPairing(cheeseType) {
  const pairing = pairings[cheeseType];
  if (pairing && cheeseImage && wineImage && cheeseName && wineName) {
    cheeseImage.src = document.getElementById(pairing.cheeseImage).src;
    cheeseName.textContent = pairing.cheeseName;
    wineImage.src = document.getElementById(pairing.wineImage).src;
    wineName.textContent = pairing.wineName;

    // Re-apply the animation class to trigger the zoom-in effect
    cheeseImage.classList.remove('animate-zoom');
    wineImage.classList.remove('animate-zoom');
    void cheeseImage.offsetWidth; // Trigger reflow to restart the animation
    void wineImage.offsetWidth;
    cheeseImage.classList.add('animate-zoom');
    wineImage.classList.add('animate-zoom');
  }
}

////////////////////// Tutorials /////////////////////////////////

document.addEventListener("scroll", () => {
  const svgElement = document.querySelector(".brushstroke-svg");
  if (svgElement) {
    const rect = svgElement.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      svgElement.classList.add("visible");
    }
  }
});
