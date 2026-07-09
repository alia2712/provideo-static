document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.menu-toggle');
  var closeBtn = document.querySelector('.nav-panel .close-btn');
  var panel = document.querySelector('.nav-panel');

  if (toggle && panel) {
    toggle.addEventListener('click', function () {
      panel.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  }
  if (closeBtn && panel) {
    closeBtn.addEventListener('click', function () {
      panel.classList.remove('open');
      document.body.style.overflow = '';
    });
  }

  // "See What They Said" video callouts: play button actually plays the video.
  document.querySelectorAll('.video-callout').forEach(function (callout) {
    var video = callout.querySelector('video');
    var btn = callout.querySelector('.play-btn');
    if (!video || !btn) return;
    btn.addEventListener('click', function () {
      video.muted = false;
      video.currentTime = 0;
      video.play();
      callout.classList.add('playing');
    });
    video.addEventListener('click', function () {
      if (video.paused) {
        video.play();
        callout.classList.add('playing');
      } else {
        video.pause();
        callout.classList.remove('playing');
      }
    });
  });

  // Hero "View Our Work" opens a modal that plays the reel from the start.
  document.querySelectorAll('[data-video-modal-trigger]').forEach(function (trigger) {
    trigger.addEventListener('click', function (e) {
      e.preventDefault();
      var modal = document.querySelector('.video-modal');
      if (!modal) return;
      var video = modal.querySelector('video');
      modal.classList.add('open');
      video.currentTime = 0;
      video.muted = false;
      video.play();
    });
  });
  document.querySelectorAll('.video-modal .modal-close, .video-modal').forEach(function (el) {
    el.addEventListener('click', function (e) {
      if (e.target === el || e.target.closest('.modal-close')) {
        var modal = document.querySelector('.video-modal');
        var video = modal.querySelector('video');
        video.pause();
        modal.classList.remove('open');
      }
    });
  });

  // Testimonials carousel: arrows + dots scroll the card track, dots sync to scroll position.
  document.querySelectorAll('.testimonial-carousel').forEach(function (carousel) {
    var track = carousel.querySelector('.testimonial-track');
    var prev = carousel.querySelector('.prev');
    var next = carousel.querySelector('.next');
    var dotsWrap = carousel.parentElement.querySelector('.carousel-dots');
    var dots = dotsWrap ? Array.prototype.slice.call(dotsWrap.querySelectorAll('.dot')) : [];
    var cards = Array.prototype.slice.call(track.children);
    if (!cards.length) return;

    function cardStep() {
      var card = cards[0];
      var style = getComputedStyle(track);
      var gap = parseFloat(style.columnGap || style.gap || 24);
      return card.getBoundingClientRect().width + gap;
    }
    function setActiveDot(i) {
      dots.forEach(function (d, idx) { d.classList.toggle('active', idx === i); });
    }
    function goTo(i) {
      i = Math.max(0, Math.min(cards.length - 1, i));
      track.scrollTo({ left: cardStep() * i, behavior: 'smooth' });
      setActiveDot(i);
    }
    function currentIndex() {
      return Math.round(track.scrollLeft / cardStep());
    }

    if (prev) prev.addEventListener('click', function () { goTo(currentIndex() - 1); });
    if (next) next.addEventListener('click', function () { goTo(currentIndex() + 1); });
    dots.forEach(function (dot, i) {
      dot.addEventListener('click', function () { goTo(i); });
    });

    var scrollTimer;
    track.addEventListener('scroll', function () {
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(function () { setActiveDot(currentIndex()); }, 80);
    });

    setActiveDot(0);
  });

  // Intro photo slideshow (Home page): cross-fade between event photos,
  // matching the live site's Elementor background slideshow.
  document.querySelectorAll('.intro-slideshow').forEach(function (wrap) {
    var slides = Array.prototype.slice.call(wrap.querySelectorAll('.slide'));
    if (slides.length < 2) return;
    var i = 0;
    setInterval(function () {
      slides[i].classList.remove('active');
      i = (i + 1) % slides.length;
      slides[i].classList.add('active');
    }, 4000);
  });

  // Basic client-side handling for forms that aren't wired to a backend yet.
  document.querySelectorAll('form[data-static-form]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      var action = form.getAttribute('action') || '';
      if (!action || action.indexOf('web3forms') === -1) {
        e.preventDefault();
        alert('This form is not connected to an email service yet. See setup notes from Claude for how to activate it with a free Web3Forms key.');
      }
    });
  });
});
