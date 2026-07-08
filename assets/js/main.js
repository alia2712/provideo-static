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
