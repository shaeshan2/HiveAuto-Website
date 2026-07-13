const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");
const navLinks = document.querySelectorAll(".main-nav a");
const revealEls = document.querySelectorAll(".reveal");
const toggleBtns = document.querySelectorAll(".toggle-btn");
const prices = document.querySelectorAll(".price[data-car]");
const bookingForm = document.getElementById("bookingForm");
const feedback = document.getElementById("formFeedback");
const yearEl = document.getElementById("year");

if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", () => {
    mainNav.classList.toggle("is-open");
  });
}

navLinks.forEach((link) => {
  link.addEventListener("click", () => mainNav?.classList.remove("is-open"));
});

const revealOnScroll = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealOnScroll.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

revealEls.forEach((el) => revealOnScroll.observe(el));

toggleBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const size = btn.dataset.size;
    toggleBtns.forEach((other) => other.classList.remove("is-active"));
    btn.classList.add("is-active");

    prices.forEach((price) => {
      const nextValue = price.dataset[size];
      if (nextValue) price.textContent = nextValue;
    });
  });
});

const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const bookingDateTimeInput = document.getElementById("bookingDateTime");
let bookingDateTimePicker;

if (typeof flatpickr !== "undefined" && bookingDateTimeInput) {
  bookingDateTimePicker = flatpickr(bookingDateTimeInput, {
    enableTime: true,
    minDate: "today",
    disable: [(date) => date.getDay() === 0],
    dateFormat: "Y-m-d h:i K",
    altInput: true,
    altFormat: "F j, Y \\at h:i K",
    minTime: "08:00",
    maxTime: "18:00",
    minuteIncrement: 30,
    time_24hr: false,
    allowInput: false,
    clickOpens: true,
  });
}

if (bookingForm && feedback) {
  bookingForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(bookingForm);
    const payload = Object.fromEntries(formData.entries());
    const requiredFields = ["name", "email", "phone", "vehicle", "service", "datetime"];
    const missing = requiredFields.find((key) => !String(payload[key] || "").trim());

    if (missing) {
      feedback.textContent = "Please complete all required fields before submitting.";
      return;
    }

    if (!isValidEmail(String(payload.email))) {
      feedback.textContent = "Please enter a valid email address.";
      return;
    }

    const message = [
      "New booking request from Hive Auto Lab website:",
      `Name: ${payload.name}`,
      `Email: ${payload.email}`,
      `Phone: ${payload.phone}`,
      `Vehicle: ${payload.vehicle}`,
      `Service: ${payload.service}`,
      `Preferred date & time: ${payload.datetime}`,
      `Notes: ${payload.notes || "N/A"}`
    ].join("\n");

    const subject = encodeURIComponent("New Hive Auto Lab Booking Request");
    const body = encodeURIComponent(message);
    const mailToUrl = `mailto:gurtaj.khakh16@gmail.com?subject=${subject}&body=${body}`;
    window.location.href = mailToUrl;

    feedback.textContent =
      "Request drafted in your email client. Send it to complete your booking inquiry.";
    bookingForm.reset();
    bookingDateTimePicker?.clear();
  });
}

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

const gallery = document.querySelector("[data-gallery]");
if (gallery) {
  const cards = [...gallery.querySelectorAll(".gallery-card")];
  const prevBtn = gallery.querySelector("[data-gallery-prev]");
  const nextBtn = gallery.querySelector("[data-gallery-next]");
  const counter = gallery.querySelector("[data-gallery-counter]");
  let index = 0;
  let isAnimating = false;

  const getWrappedOffset = (cardIndex, activeIndex) => {
    const total = cards.length;
    let offset = cardIndex - activeIndex;

    if (offset > total / 2) offset -= total;
    if (offset < -total / 2) offset += total;

    return offset;
  };

  const renderGallery = () => {
    cards.forEach((card, cardIndex) => {
      const offset = getWrappedOffset(cardIndex, index);
      card.dataset.offset = String(offset);
    });

    if (counter) counter.textContent = `${index + 1} / ${cards.length}`;
  };

  const stepGallery = (direction) => {
    if (isAnimating || cards.length < 2) return;

    isAnimating = true;
    index = (index + direction + cards.length) % cards.length;
    renderGallery();

    window.setTimeout(() => {
      isAnimating = false;
    }, 650);
  };

  prevBtn?.addEventListener("click", () => stepGallery(-1));
  nextBtn?.addEventListener("click", () => stepGallery(1));

  gallery.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") stepGallery(-1);
    if (event.key === "ArrowRight") stepGallery(1);
  });

  renderGallery();
}
