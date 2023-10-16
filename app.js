
// Existing smooth scroll functionality
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

// Scroll-based animations for project cards
const projectCards = document.querySelectorAll('.project-card');
const options = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1
};

const fadeInObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, options);

projectCards.forEach(card => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(50px)';
  card.style.transition = 'opacity 0.5s, transform 0.5s';
  fadeInObserver.observe(card);
});

// Navbar active state based on scrolling
const sections = document.querySelectorAll('section');
const navbarLinks = document.querySelectorAll('.navbar a');

const activeNavObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const id = entry.target.getAttribute('id');
    const activeLink = document.querySelector(`.navbar a[href="#${id}"]`);
    if (entry.isIntersecting) {
      navbarLinks.forEach(link => link.classList.remove('active'));
      activeLink.classList.add('active');
    }
  });
}, { threshold: 0.7 });

sections.forEach(section => activeNavObserver.observe(section));

// Back to Top Button (to be added later in the HTML)
const backToTopButton = document.querySelector('#back-to-top');
window.addEventListener('scroll', () => {
  if (window.pageYOffset > 500) {
    backToTopButton.style.opacity = '1';
  } else {
    backToTopButton.style.opacity = '0';
  }
});

backToTopButton.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
