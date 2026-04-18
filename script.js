/* ============================================================
   MUNIR MOHAMMED — PORTFOLIO JAVASCRIPT
   script.js
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── CURSOR GLOW ── */
  const glow = document.getElementById('glow');
  if (glow) {
    document.addEventListener('mousemove', (e) => {
      glow.style.left = e.clientX + 'px';
      glow.style.top  = e.clientY + 'px';
    });
  }


  /* ── MOBILE HAMBURGER MENU ── */
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      navLinks.classList.toggle('open');
    });

    // Close menu when a nav link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
      });
    });
  }


  /* ── SCROLL REVEAL ── */
  const revealEls = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target); // animate once
      }
    });
  }, { threshold: 0.1 });

  revealEls.forEach(el => revealObserver.observe(el));


  /* ── SKILL BARS ── */
  const skillsSection = document.getElementById('skills');

  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.skill-fill').forEach(fill => {
          fill.style.width = fill.dataset.width + '%';
        });
        skillObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.25 });

  if (skillsSection) skillObserver.observe(skillsSection);


  /* ── PROJECT FILTER ── */
  const filterBtns   = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;

      // Update active button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Show / hide cards
      projectCards.forEach(card => {
        const category = card.dataset.category;
        if (filter === 'all' || category === filter) {
          card.classList.remove('hidden');
          // Re-trigger reveal animation
          card.classList.remove('visible');
          setTimeout(() => card.classList.add('visible'), 30);
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });


  /* ── CONTACT FORM ── */
  const submitBtn = document.getElementById('submit-btn');

  if (submitBtn) {
    submitBtn.addEventListener('click', () => {
      const name    = document.getElementById('name')?.value.trim();
      const email   = document.getElementById('email')?.value.trim();
      const message = document.getElementById('message')?.value.trim();

      // Basic validation
      if (!name || !email || !message) {
        submitBtn.textContent = 'Please fill all fields';
        submitBtn.style.background = '#5c4d38';
        setTimeout(() => {
          submitBtn.textContent = 'Send Message';
          submitBtn.style.background = '';
        }, 2500);
        return;
      }

      // Simulate sending
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.textContent = 'Message Sent ✓';
        submitBtn.style.background = '#3a4a35';

        // Reset form fields
        ['name', 'email', 'project-type', 'message'].forEach(id => {
          const el = document.getElementById(id);
          if (el) el.value = '';
        });

        // Reset button after delay
        setTimeout(() => {
          submitBtn.textContent = 'Send Message';
          submitBtn.style.background = '';
          submitBtn.disabled = false;
        }, 4000);
      }, 1800);
    });
  }


  /* ── ACTIVE NAV LINK ON SCROLL ── */
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a');

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navAnchors.forEach(a => a.classList.remove('active-nav'));
        const activeLink = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
        if (activeLink) activeLink.classList.add('active-nav');
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(sec => navObserver.observe(sec));


  /* ── SUBTLE NAV SHRINK ON SCROLL ── */
  const nav = document.querySelector('nav');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      nav.style.padding = '0.85rem 3rem';
    } else {
      nav.style.padding = '1.25rem 3rem';
    }
  });

});
