(function () {
  const GA_ID = 'G-L0G195PP9M';
  function send(eventName, params = {}) {
    if (typeof window.gtag !== 'function') return;
    window.gtag('event', eventName, Object.assign({
      page_path: window.location.pathname,
      page_title: document.title,
      page_location: window.location.href
    }, params));
  }
  window.fcTrack = send;

  document.addEventListener('click', function (event) {
    const link = event.target.closest('a');
    if (!link) return;
    const href = link.getAttribute('href') || '';
    const text = (link.innerText || link.getAttribute('aria-label') || href).trim().slice(0, 120);

    if (href.includes('wa.me') || href.toLowerCase().includes('whatsapp')) {
      send('click_whatsapp', { link_text: text, destination_url: href });
      send('generate_lead', { method: 'whatsapp', link_text: text });
    } else if (href.startsWith('mailto:')) {
      send('click_email', { link_text: text, destination_url: href });
      send('generate_lead', { method: 'email', link_text: text });
    } else if (href.includes('/blog')) {
      send('click_blog', { link_text: text, destination_url: href });
    } else if (href.includes('demo') || href.includes('teste') || href.includes('proposta') || text.toLowerCase().includes('demonstra')) {
      send('click_cta', { link_text: text, destination_url: href });
      send('generate_lead', { method: 'cta', link_text: text });
    } else if (href.startsWith('http') && !href.includes(location.hostname)) {
      send('click_outbound', { link_text: text, destination_url: href });
    }
  });

  document.querySelectorAll('form').forEach(function (form) {
    form.addEventListener('submit', function () {
      send('form_submit', { form_id: form.id || 'contact_form' });
      send('generate_lead', { method: 'form', form_id: form.id || 'contact_form' });
    });
  });

  let scroll25 = false, scroll50 = false, scroll75 = false, scroll90 = false;
  window.addEventListener('scroll', function () {
    const total = document.documentElement.scrollHeight - window.innerHeight;
    if (total <= 0) return;
    const pct = Math.round((window.scrollY / total) * 100);
    if (pct >= 25 && !scroll25) { scroll25 = true; send('scroll_depth', { percent_scrolled: 25 }); }
    if (pct >= 50 && !scroll50) { scroll50 = true; send('scroll_depth', { percent_scrolled: 50 }); }
    if (pct >= 75 && !scroll75) { scroll75 = true; send('scroll_depth', { percent_scrolled: 75 }); }
    if (pct >= 90 && !scroll90) { scroll90 = true; send('scroll_depth', { percent_scrolled: 90 }); }
  }, { passive: true });

  setTimeout(function () { send('engaged_30_seconds'); }, 30000);
})();
