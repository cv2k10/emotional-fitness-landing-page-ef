const elements = document.querySelectorAll<HTMLElement>("[data-reveal]");

if (!("IntersectionObserver" in window)) {
  elements.forEach((element) => element.classList.add("is-visible"));
} else {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -32px 0px" },
  );

  elements.forEach((element) => observer.observe(element));
}
