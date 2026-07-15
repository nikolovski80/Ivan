
// Page preloader
(function(){
  var MIN_VISIBLE_MS = 700; // guaranteed minimum time the loader stays on screen
  var SAFETY_MS = 3000;     // never let it get stuck longer than this
  var shown = Date.now();
  var hidden = false;

  function hideLoader(){
    if(hidden) return;
    hidden = true;
    var elapsed = Date.now() - shown;
    var wait = Math.max(0, MIN_VISIBLE_MS - elapsed);
    setTimeout(function(){
      document.body.classList.add('apg-loaded');
    }, wait);
  }

  if(document.readyState === 'complete'){
    hideLoader();
  } else {
    window.addEventListener('load', hideLoader);
  }
  // safety net so the loader never gets stuck
  setTimeout(hideLoader, SAFETY_MS);
})();

const menu = document.querySelector('.menu');
const links = document.querySelector('.nav-links');
function setMobileMenu(open){
  if(!menu || !links) return;
  links.classList.toggle('open', open);
  menu.setAttribute('aria-expanded', open ? 'true' : 'false');
  document.body.classList.toggle('apg-menu-open', open);
}
if(menu && links){
  menu.addEventListener('click', (e) => {
    e.stopPropagation();
    setMobileMenu(!links.classList.contains('open'));
  });
  document.addEventListener('click', (e) => {
    if(links.classList.contains('open') && !links.contains(e.target) && e.target !== menu){
      setMobileMenu(false);
    }
  });
  document.addEventListener('keydown', (e) => {
    if(e.key === 'Escape' && links.classList.contains('open')){
      setMobileMenu(false);
    }
  });
}

const els = document.querySelectorAll('.card,.city,.member,.gallery img,.content-box');
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if(e.isIntersecting){
      e.target.style.opacity = 1;
      e.target.style.transform = 'translateY(0)';
    }
  });
},{threshold:.12});
els.forEach(el => {
  el.style.opacity = 0;
  el.style.transform = 'translateY(18px)';
  el.style.transition = '.55s ease';
  io.observe(el);
});


// Leistungen mega menu behavior (single source of truth — desktop click + mobile tap)
document.querySelectorAll('.nav-item').forEach(item => {
  const trigger = item.querySelector('.nav-trigger');
  const megaMenu = item.querySelector('.mega-menu');

  if (!trigger || !megaMenu) return;

  trigger.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();

    document.querySelectorAll('.mega-menu.open').forEach(other => {
      if (other !== megaMenu) other.classList.remove('open');
    });

    megaMenu.classList.toggle('open');
  });

  megaMenu.addEventListener('click', (e) => {
    e.stopPropagation();
  });
});

document.addEventListener('click', () => {
  document.querySelectorAll('.mega-menu.open').forEach(m => {
    m.classList.remove('open');
  });
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.mega-menu.open').forEach(m => {
      m.classList.remove('open');
    });
  }
});


// Scroll to top button
const scrollTopBtn = document.createElement('button');
scrollTopBtn.className = 'scroll-top';
scrollTopBtn.innerHTML = '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 15l7-7 7 7"/></svg>';
scrollTopBtn.setAttribute('aria-label', 'Nach oben');

document.body.appendChild(scrollTopBtn);

window.addEventListener('scroll', () => {
  if(window.scrollY > 400){
    scrollTopBtn.classList.add('show');
  } else {
    scrollTopBtn.classList.remove('show');
  }
});

scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});
