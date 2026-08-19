// =========================================================
// PELUQUERÍA — INTERACTIVIDAD COMPARTIDA
// =========================================================

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Menú móvil ---------- */
  const toggle = document.querySelector('.nav-toggle');
  const header = document.querySelector('.site-header');
  if (toggle && header) {
    toggle.addEventListener('click', () => {
      const isOpen = header.classList.toggle('nav-open');
      toggle.classList.toggle('is-open', isOpen);
      toggle.setAttribute('aria-expanded', String(isOpen));
    });
    header.querySelectorAll('.main-nav a').forEach(link => {
      link.addEventListener('click', () => {
        header.classList.remove('nav-open');
        toggle.classList.remove('is-open');
      });
    });
  }

  /* ---------- Pestañas de servicios (servicios.html) ---------- */
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');
  if (tabButtons.length) {
    tabButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.dataset.tab;
        tabButtons.forEach(b => b.classList.toggle('is-active', b === btn));
        tabPanels.forEach(p => p.classList.toggle('is-active', p.id === target));
        history.replaceState(null, '', `#${target}`);
      });
    });
    // Abrir la pestaña indicada en el hash de la URL, si existe
    const initial = window.location.hash.replace('#', '');
    const match = initial && document.getElementById(initial);
    if (match && match.classList.contains('tab-panel')) {
      tabButtons.forEach(b => b.classList.toggle('is-active', b.dataset.tab === initial));
      tabPanels.forEach(p => p.classList.toggle('is-active', p.id === initial));
    }
  }

  /* ---------- Filtros de galería (galeria.html) ---------- */
  const filterButtons = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('[data-category]');
  if (filterButtons.length) {
    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.toggle('is-active', b === btn));
        const cat = btn.dataset.filter;
        galleryItems.forEach(item => {
          const show = cat === 'todos' || item.dataset.category === cat;
          item.style.display = show ? '' : 'none';
        });
      });
    });
  }

  /* ---------- Comparador antes / después (arrastrar) ---------- */
  document.querySelectorAll('.compare-visual').forEach(visual => {
    const after = visual.querySelector('.after');
    const handle = visual.querySelector('.compare-handle');
    if (!after || !handle) return;

    let dragging = false;

    const setPosition = (clientX) => {
      const rect = visual.getBoundingClientRect();
      let pct = ((clientX - rect.left) / rect.width) * 100;
      pct = Math.max(4, Math.min(96, pct));
      after.style.clipPath = `inset(0 0 0 ${pct}%)`;
      handle.style.left = `${pct}%`;
    };

    handle.addEventListener('pointerdown', (e) => {
      dragging = true;
      handle.setPointerCapture(e.pointerId);
    });
    handle.addEventListener('pointermove', (e) => {
      if (dragging) setPosition(e.clientX);
    });
    handle.addEventListener('pointerup', () => { dragging = false; });
    handle.addEventListener('pointercancel', () => { dragging = false; });

    // Accesible con teclado
    handle.setAttribute('tabindex', '0');
    handle.setAttribute('role', 'slider');
    handle.setAttribute('aria-label', 'Comparar antes y después');
    handle.setAttribute('aria-valuemin', '0');
    handle.setAttribute('aria-valuemax', '100');
    handle.addEventListener('keydown', (e) => {
      const rect = visual.getBoundingClientRect();
      let current = parseFloat(handle.style.left) || 50;
      if (e.key === 'ArrowLeft') current -= 5;
      if (e.key === 'ArrowRight') current += 5;
      current = Math.max(4, Math.min(96, current));
      after.style.clipPath = `inset(0 0 0 ${current}%)`;
      handle.style.left = `${current}%`;
    });

    // Also allow click-drag anywhere on the card
    visual.addEventListener('pointerdown', (e) => {
      if (e.target === handle) return;
      setPosition(e.clientX);
    });
  });

  /* ---------- Formulario de reserva (reservar.html) ---------- */
  const bookingForm = document.querySelector('#booking-form');
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!bookingForm.checkValidity()) {
        bookingForm.reportValidity();
        return;
      }
      const data = new FormData(bookingForm);
      const nombre = data.get('nombre');
      const servicio = data.get('servicio');
      const fecha = data.get('fecha');
      const hora = data.get('hora');

      const success = document.querySelector('#booking-success');
      if (success) {
        success.innerHTML = `¡Gracias, <strong>${nombre}</strong>! Hemos recibido tu solicitud para <strong>${servicio}</strong>
          el <strong>${fecha}</strong> a las <strong>${hora}</strong>. Te confirmaremos por teléfono o WhatsApp en breve.`;
        success.classList.add('is-visible');
        success.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      bookingForm.reset();
    });
  }

  /* ---------- Año automático en el footer ---------- */
  document.querySelectorAll('.current-year').forEach(el => {
    el.textContent = new Date().getFullYear();
  });

});
