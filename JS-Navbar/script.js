const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("header ul li a");

/**window.addEventListener("scroll", () => {
  let current = "";

  for (const section of sections) {
    const sectionTop = section.offsetTop;
    if (window.pageYOffset >= sectionTop - 60) {
      current = section.getAttribute("id");
    }
  }

  for (const link of navLinks) {
    link.classList.remove("active");
    if (link.classList.contains(current)) {
      link.classList.add("active");
    }
  }
});
 */

// MODERN

const options = {
    rootMargin: "10px"
};

const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting){

            navLinks.forEach(link => {
                console.log(link.className)
                link.classList.remove("active")
                if (e.target.id === link.className){
                    link.classList.add("active");
                }
            });
        }
    });
}, options);

sections.forEach(sect => {
    observer.observe(sect);
});