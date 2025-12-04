const navToggle = document.querySelector('.nav-toggle');
const navBurger = document.querySelector('.nav-burger-menu');

navToggle.addEventListener('click', () => {
  navBurger.classList.toggle('open');
});

// Projects filter functionality
(() => {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (!filterBtns.length || !projectCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filterValue = btn.getAttribute('data-filter');

      // Update active button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Filter project cards
      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.classList.remove('hidden');
          // Trigger reflow to restart animation
          void card.offsetWidth;
          card.style.animation = 'none';
          setTimeout(() => {
            card.style.animation = 'slideInCard 0.4s ease forwards';
          }, 10);
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
})();