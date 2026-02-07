const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.2 }
);

document.querySelectorAll("section, .project-card, .skill-card").forEach((el) => {
  el.classList.add("fade-in");
  observer.observe(el);
});
