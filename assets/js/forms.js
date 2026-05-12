(function () {
  'use strict';

  var forms = document.querySelectorAll('form[action^="https://api.web3forms.com"]');
  if (!forms.length) return;

  var COPY = {
    submitting: 'Wird gesendet…',
    successTitle: 'Danke für Ihre Nachricht.',
    successBody: 'Wir melden uns innert kurzer Zeit zurück.',
    errorPrefix: 'Senden hat nicht funktioniert. Bitte versuchen Sie es erneut oder kontaktieren Sie uns direkt unter ',
    errorEmail: 'info@garagentor-antriebe.ch'
  };

  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  forms.forEach(function (form) {
    var submitBtn = form.querySelector('button[type="submit"]');
    var statusEl = form.nextElementSibling;
    if (!submitBtn || !statusEl || !statusEl.hasAttribute('data-form-status')) return;

    form.addEventListener('submit', function (event) {
      event.preventDefault();

      var originalLabel = submitBtn.textContent;
      submitBtn.disabled = true;
      submitBtn.setAttribute('aria-busy', 'true');
      submitBtn.textContent = COPY.submitting;

      statusEl.className = 'form-status form-status--loading';
      statusEl.textContent = COPY.submitting;
      statusEl.hidden = false;

      fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      })
        .then(function (res) {
          return res.json().catch(function () { return {}; }).then(function (data) {
            return { ok: res.ok, data: data };
          });
        })
        .then(function (result) {
          if (!result.ok || !result.data || !result.data.success) {
            throw new Error((result.data && result.data.message) || 'Request failed');
          }
          form.hidden = true;
          statusEl.className = 'form-status form-status--success';
          statusEl.innerHTML = '<h3>' + COPY.successTitle + '</h3><p>' + COPY.successBody + '</p>';
          statusEl.hidden = false;
          statusEl.focus();
          statusEl.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'center' });
        })
        .catch(function () {
          submitBtn.disabled = false;
          submitBtn.removeAttribute('aria-busy');
          submitBtn.textContent = originalLabel;
          statusEl.className = 'form-status form-status--error';
          statusEl.innerHTML = COPY.errorPrefix + '<a href="mailto:' + COPY.errorEmail + '">' + COPY.errorEmail + '</a>.';
          statusEl.hidden = false;
          statusEl.focus();
        });
    });
  });
})();
