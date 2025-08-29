
// Mobile nav
const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('#site-nav');
if (navToggle){
  navToggle.addEventListener('click', () => {
    const open = siteNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(open));
  });
}

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href').slice(1);
    const el = document.getElementById(id);
    if(el){
      e.preventDefault();
      el.scrollIntoView({behavior:'smooth', block:'start'});
      history.pushState(null, '', '#'+id);
      siteNav && siteNav.classList.remove('open');
      navToggle && navToggle.setAttribute('aria-expanded','false');
    }
  });
});

// Form handling (demo)
const form = document.getElementById('booking-form');
if(form){
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const thanks = document.getElementById('thanks');
    thanks.classList.remove('hidden');
    form.reset();
  });
}

// Dynamic year
document.getElementById('year').textContent = new Date().getFullYear();

// FAQPage JSON-LD from visible FAQs
(function(){
  const faqs = Array.from(document.querySelectorAll('#faqs details')).map(d => ({
    "@type":"Question",
    "name": d.querySelector('summary')?.textContent?.trim() || "",
    "acceptedAnswer": {
      "@type":"Answer",
      "text": d.querySelector('p')?.textContent?.trim() || ""
    }
  }));
  const data = {
    "@context":"https://schema.org",
    "@type":"FAQPage",
    "mainEntity": faqs
  };
  const el = document.getElementById('faq-jsonld');
  if (el) el.textContent = JSON.stringify(data);
})();
