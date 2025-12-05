const navToggle = document.querySelector('.nav-toggle');
const navBurger = document.querySelector('.nav-burger-menu');

navToggle.addEventListener('click', () => {
  navBurger.classList.toggle('open');
});

(() => {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (!filterBtns.length || !projectCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filterValue = btn.getAttribute('data-filter');

      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.classList.remove('hidden');
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

// Contact page interactions: form handling + copy email
(function(){
  const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID'; // replace YOUR_FORM_ID with your Formspree form ID
  const form = document.getElementById('contactForm');
  const statusEl = document.getElementById('formStatus');
  const sendBtn = document.getElementById('sendBtn');
  const clearBtn = document.getElementById('clearBtn');

  function setStatus(text, success){
    statusEl.textContent = text;
    statusEl.style.color = success ? '#bfe7c7' : '#f6b6b6';
  }

  if (form) {
    form.addEventListener('submit', (e)=>{
      e.preventDefault();
      const name = form.querySelector('#name');
      const email = form.querySelector('#email');
      const message = form.querySelector('#message');

      if (!name.value.trim() || !email.value.trim() || !message.value.trim()) {
        setStatus('Please fill all fields.', false);
        return;
      }

      // simple email regex
      const re = /^\S+@\S+\.\S+$/;
      if (!re.test(email.value.trim())) { setStatus('Please enter a valid email.', false); return; }

      // send to Formspree
      sendBtn.disabled = true;
      sendBtn.textContent = 'Sending...';
      setStatus('', true);

      const formData = new FormData(form);
      // If you want to include a subject, uncomment and set
      // formData.append('_subject', `Website contact from ${name.value}`);

      fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      }).then(async response => {
        sendBtn.disabled = false;
        sendBtn.textContent = 'Send message';
        if (response.ok) {
          form.reset();
          form.querySelectorAll('input,textarea').forEach(i=>i.blur());
          setStatus('Message sent — thanks!', true);
        } else {
          let data = {};
          try { data = await response.json(); } catch (e) {}
          const msg = (data && data.error) ? data.error : 'Send failed';
          setStatus(msg, false);
        }
      }).catch(()=>{
        sendBtn.disabled = false;
        sendBtn.textContent = 'Send message';
        setStatus('Send failed — network error.', false);
      });
    });

    if (clearBtn) clearBtn.addEventListener('click', ()=>{ form.reset(); setStatus('', true); });
  }

  // copy email buttons
  document.querySelectorAll('.copy-btn').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const email = btn.getAttribute('data-email');
      navigator.clipboard?.writeText(email).then(()=>{
        const old = btn.textContent;
        btn.textContent = 'Copied';
        setTimeout(()=> btn.textContent = old, 1500);
      }).catch(()=>{
        setStatus('Copy failed — you can select and copy manually.', false);
      });
    });
  });
})();

// WOW: subtle mouse-parallax for the animated orbs in the hero
(function(){
  try {
    const hero = document.querySelector('.wow-hero');
    if (!hero) return;
    const orbs = Array.from(document.querySelectorAll('.wow-bg .orb'));

    // tune movement: each orb has a multiplier
    const multipliers = [0.02, 0.03, 0.018, 0.025];

    function onMove(e){
      const rect = hero.getBoundingClientRect();
      const cx = rect.left + rect.width/2;
      const cy = rect.top + rect.height/2;
      const clientX = e.clientX || (e.touches && e.touches[0].clientX) || cx;
      const clientY = e.clientY || (e.touches && e.touches[0].clientY) || cy;
      const dx = (clientX - cx);
      const dy = (clientY - cy);

      orbs.forEach((orb, i)=>{
        const m = multipliers[i] || 0.02;
        orb.style.transform = `translate3d(${dx*m}px, ${dy*m}px, 0) scale(1)`;
      });
    }

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('touchmove', onMove, { passive: true });
  } catch (e) { /* fail silently */ }
})();