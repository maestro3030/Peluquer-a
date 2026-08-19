/* =========================================================
   PELUQUERÍAS ÉLITE
   script.js
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
    "use strict";

    /* =====================================================
       1. MENÚ MÓVIL
       ===================================================== */

    const menuToggle = document.querySelector(".menu-toggle");
    const mainNav = document.querySelector(".main-nav");

    if (menuToggle && mainNav) {
        menuToggle.addEventListener("click", () => {
            const isOpen = mainNav.classList.toggle("active");

            menuToggle.classList.toggle("active", isOpen);
            menuToggle.setAttribute("aria-expanded", String(isOpen));
            document.body.classList.toggle("menu-open", isOpen);
        });

        // Cerrar el menú al pulsar un enlace
        mainNav.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", () => {
                mainNav.classList.remove("active");
                menuToggle.classList.remove("active");
                menuToggle.setAttribute("aria-expanded", "false");
                document.body.classList.remove("menu-open");
            });
        });
    }


    /* =====================================================
       2. HEADER AL HACER SCROLL
       ===================================================== */

    const header = document.querySelector(".site-header");

    const updateHeader = () => {
        if (!header) return;

        if (window.scrollY > 40) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    };

    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });


    /* =====================================================
       3. AÑO AUTOMÁTICO DEL FOOTER
       ===================================================== */

    document.querySelectorAll("[data-current-year]").forEach((element) => {
        element.textContent = new Date().getFullYear();
    });


    /* =====================================================
       4. SCROLL SUAVE
       ===================================================== */

    document.querySelectorAll('a[href^="#"]').forEach((link) => {
        link.addEventListener("click", (event) => {
            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const target = document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();

            const headerHeight = header
                ? header.getBoundingClientRect().height
                : 0;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                headerHeight -
                15;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });
        });
    });


    /* =====================================================
       5. FILTROS DE SERVICIOS
       
       HTML esperado:

       <button class="filter-btn active" data-filter="todos">
       <button class="filter-btn" data-filter="mujer">

       <article class="service-card" data-category="mujer">
       ===================================================== */

    const filterButtons = document.querySelectorAll(".filter-btn");
    const serviceCards = document.querySelectorAll(".service-card");

    if (filterButtons.length && serviceCards.length) {

        filterButtons.forEach((button) => {
            button.addEventListener("click", () => {

                const filter = button.dataset.filter;

                filterButtons.forEach((btn) => {
                    btn.classList.remove("active");
                    btn.setAttribute("aria-selected", "false");
                });

                button.classList.add("active");
                button.setAttribute("aria-selected", "true");

                serviceCards.forEach((card) => {
                    const category = card.dataset.category;

                    const show =
                        filter === "todos" ||
                        category === filter;

                    if (show) {
                        card.hidden = false;

                        requestAnimationFrame(() => {
                            card.classList.add("visible");
                        });
                    } else {
                        card.classList.remove("visible");

                        setTimeout(() => {
                            card.hidden = true;
                        }, 180);
                    }
                });
            });
        });
    }


    /* =====================================================
       6. ACORDEONES / FAQ
       ===================================================== */

    const accordionItems = document.querySelectorAll(".accordion-item");

    accordionItems.forEach((item) => {
        const button = item.querySelector(".accordion-question");
        const content = item.querySelector(".accordion-answer");

        if (!button || !content) return;

        button.addEventListener("click", () => {

            const isOpen = item.classList.contains("open");

            // Cerrar los demás
            accordionItems.forEach((otherItem) => {
                if (otherItem !== item) {
                    otherItem.classList.remove("open");

                    const otherButton =
                        otherItem.querySelector(".accordion-question");

                    if (otherButton) {
                        otherButton.setAttribute("aria-expanded", "false");
                    }
                }
            });

            item.classList.toggle("open", !isOpen);
            button.setAttribute("aria-expanded", String(!isOpen));
        });
    });


    /* =====================================================
       7. ANIMACIONES AL ENTRAR EN PANTALLA
       ===================================================== */

    const animatedElements = document.querySelectorAll(
        ".reveal, .service-card, .gallery-item, .brand-card, .review-card"
    );

    if ("IntersectionObserver" in window) {

        const observer = new IntersectionObserver(
            (entries, observerInstance) => {
                entries.forEach((entry) => {

                    if (!entry.isIntersecting) return;

                    entry.target.classList.add("visible");

                    observerInstance.unobserve(entry.target);
                });
            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -40px 0px"
            }
        );

        animatedElements.forEach((element) => {
            observer.observe(element);
        });

    } else {
        animatedElements.forEach((element) => {
            element.classList.add("visible");
        });
    }


    /* =====================================================
       8. GALERÍA / MODAL
       ===================================================== */

    const galleryItems = document.querySelectorAll(".gallery-item");
    const galleryModal = document.querySelector(".gallery-modal");
    const galleryModalImage = document.querySelector(".gallery-modal img");
    const galleryModalTitle = document.querySelector(".gallery-modal-title");
    const galleryModalClose = document.querySelector(".gallery-modal-close");

    if (galleryItems.length && galleryModal) {

        galleryItems.forEach((item) => {

            item.addEventListener("click", () => {

                const image = item.querySelector("img");

                if (!image) return;

                if (galleryModalImage) {
                    galleryModalImage.src = image.src;
                    galleryModalImage.alt =
                        image.alt || "Trabajo de Peluquerías Élite";
                }

                if (galleryModalTitle) {
                    galleryModalTitle.textContent =
                        item.dataset.title || image.alt || "Trabajo realizado";
                }

                galleryModal.classList.add("active");
                galleryModal.setAttribute("aria-hidden", "false");
                document.body.classList.add("modal-open");
            });
        });

        const closeGallery = () => {
            galleryModal.classList.remove("active");
            galleryModal.setAttribute("aria-hidden", "true");
            document.body.classList.remove("modal-open");
        };

        if (galleryModalClose) {
            galleryModalClose.addEventListener("click", closeGallery);
        }

        galleryModal.addEventListener("click", (event) => {
            if (event.target === galleryModal) {
                closeGallery();
            }
        });

        document.addEventListener("keydown", (event) => {
            if (
                event.key === "Escape" &&
                galleryModal.classList.contains("active")
            ) {
                closeGallery();
            }
        });
    }


    /* =====================================================
       9. FORMULARIO DE RESERVA
       ===================================================== */

    const bookingForm = document.querySelector("#booking-form");

    if (bookingForm) {

        bookingForm.addEventListener("submit", (event) => {
            event.preventDefault();

            const name = bookingForm.querySelector("#name");
            const phone = bookingForm.querySelector("#phone");
            const email = bookingForm.querySelector("#email");
            const service = bookingForm.querySelector("#service");
            const date = bookingForm.querySelector("#date");
            const time = bookingForm.querySelector("#time");
            const message = bookingForm.querySelector("#message");

            const values = {
                name: name ? name.value.trim() : "",
                phone: phone ? phone.value.trim() : "",
                email: email ? email.value.trim() : "",
                service: service ? service.value : "",
                date: date ? date.value : "",
                time: time ? time.value : "",
                message: message ? message.value.trim() : ""
            };

            // Validación
            if (!values.name || !values.phone || !values.service ||
                !values.date || !values.time) {

                showFormMessage(
                    bookingForm,
                    "Por favor, completa todos los campos obligatorios.",
                    "error"
                );

                return;
            }

            // Comprobar fecha
            const selectedDate = new Date(values.date + "T00:00:00");
            const today = new Date();

            today.setHours(0, 0, 0, 0);

            if (selectedDate < today) {
                showFormMessage(
                    bookingForm,
                    "La fecha seleccionada no puede ser anterior a hoy.",
                    "error"
                );

                return;
            }

            /*
             * DEMO:
             * Este formulario todavía no está conectado a una
             * base de datos ni a un sistema real de reservas.
             *
             * Aquí simulamos una solicitud correcta.
             */

            const submitButton = bookingForm.querySelector(
                'button[type="submit"]'
            );

            if (submitButton) {
                submitButton.disabled = true;
                submitButton.dataset.originalText =
                    submitButton.textContent;

                submitButton.textContent = "Enviando...";
            }

            setTimeout(() => {

                showFormMessage(
                    bookingForm,
                    `Gracias, ${values.name}. Hemos recibido tu solicitud para ${formatDate(values.date)} a las ${values.time}. Te contactaremos en el teléfono indicado para confirmar la cita.`,
                    "success"
                );

                bookingForm.reset();

                if (submitButton) {
                    submitButton.disabled = false;
                    submitButton.textContent =
                        submitButton.dataset.originalText ||
                        "Solicitar cita";
                }

            }, 700);
        });
    }


    /* =====================================================
       10. FECHA MÍNIMA DEL FORMULARIO
       ===================================================== */

    const dateInput = document.querySelector("#date");

    if (dateInput) {

        const now = new Date();

        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, "0");
        const day = String(now.getDate()).padStart(2, "0");

        dateInput.min = `${year}-${month}-${day}`;
    }


    /* =====================================================
       11. TELÉFONO
       ===================================================== */

    document.querySelectorAll("[data-phone]").forEach((element) => {

        element.addEventListener("click", () => {

            const phone =
                element.dataset.phone || "979000000";

            window.location.href = `tel:${phone}`;
        });
    });


    /* =====================================================
       12. COPIAR TELÉFONO
       ===================================================== */

    const copyPhoneButton = document.querySelector("[data-copy-phone]");

    if (copyPhoneButton) {

        copyPhoneButton.addEventListener("click", async () => {

            const phone =
                copyPhoneButton.dataset.copyPhone ||
                "979 000 000";

            try {

                await navigator.clipboard.writeText(phone);

                const originalText =
                    copyPhoneButton.textContent;

                copyPhoneButton.textContent =
                    "✓ Teléfono copiado";

                setTimeout(() => {
                    copyPhoneButton.textContent = originalText;
                }, 1800);

            } catch (error) {
                console.warn(
                    "No se pudo copiar el teléfono.",
                    error
                );
            }
        });
    }


    /* =====================================================
       13. BOTÓN VOLVER ARRIBA
       ===================================================== */

    const backToTop = document.querySelector(".back-to-top");

    if (backToTop) {

        const updateBackToTop = () => {

            if (window.scrollY > 500) {
                backToTop.classList.add("visible");
            } else {
                backToTop.classList.remove("visible");
            }
        };

        updateBackToTop();

        window.addEventListener(
            "scroll",
            updateBackToTop,
            { passive: true }
        );

        backToTop.addEventListener("click", () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });
    }


    /* =====================================================
       14. SELECTOR DE SERVICIO EN RESERVAS
       ===================================================== */

    const serviceLinks =
        document.querySelectorAll("[data-book-service]");

    const bookingService =
        document.querySelector("#service");

    if (serviceLinks.length && bookingService) {

        serviceLinks.forEach((link) => {

            link.addEventListener("click", () => {

                const selectedService =
                    link.dataset.bookService;

                if (!selectedService) return;

                const options =
                    Array.from(bookingService.options);

                const matchingOption =
                    options.find(
                        (option) =>
                            option.value === selectedService
                    );

                if (matchingOption) {
                    bookingService.value =
                        matchingOption.value;
                }
            });
        });
    }


    /* =====================================================
       15. VALIDACIÓN DEL TELÉFONO
       ===================================================== */

    const phoneInput = document.querySelector("#phone");

    if (phoneInput) {

        phoneInput.addEventListener("input", () => {

            // Permitir solamente números, espacios y símbolos comunes
            phoneInput.value =
                phoneInput.value.replace(
                    /[^0-9+\s()-]/g,
                    ""
                );
        });
    }


    /* =====================================================
       16. NAVBAR: PÁGINA ACTUAL
       ===================================================== */

    const currentPage =
        window.location.pathname.split("/").pop() ||
        "index.html";

    document.querySelectorAll(".main-nav a").forEach((link) => {

        const href =
            link.getAttribute("href");

        if (!href) return;

        const cleanHref =
            href.split("#")[0];

        if (
            cleanHref === currentPage ||
            (currentPage === "" && cleanHref === "index.html")
        ) {
            link.classList.add("current");
            link.setAttribute("aria-current", "page");
        }
    });


    /* =====================================================
       17. BOTONES CON CONFIRMACIÓN
       ===================================================== */

    document.querySelectorAll("[data-confirm]").forEach((button) => {

        button.addEventListener("click", (event) => {

            const message =
                button.dataset.confirm;

            if (!message) return;

            const confirmed =
                window.confirm(message);

            if (!confirmed) {
                event.preventDefault();
            }
        });
    });


    /* =====================================================
       18. HORARIO ACTUAL
       ===================================================== */

    const openingStatus =
        document.querySelector("[data-opening-status]");

    if (openingStatus) {

        const now = new Date();

        const day = now.getDay();
        const minutes =
            now.getHours() * 60 +
            now.getMinutes();

        /*
         * Horario ficticio:
         *
         * Lunes-Viernes:
         * 09:30 - 14:00
         * 16:00 - 20:00
         *
         * Sábado:
         * 09:30 - 14:00
         *
         * Domingo cerrado
         */

        let open = false;

        if (day >= 1 && day <= 5) {

            const morning =
                minutes >= 570 && minutes < 840;

            const afternoon =
                minutes >= 960 && minutes < 1200;

            open = morning || afternoon;

        } else if (day === 6) {

            open =
                minutes >= 570 &&
                minutes < 840;
        }

        if (open) {

            openingStatus.textContent =
                "Abierto ahora";

            openingStatus.classList.add("open");

        } else {

            openingStatus.textContent =
                "Cerrado ahora";

            openingStatus.classList.add("closed");
        }
    }


    /* =====================================================
       19. PRELOADER
       ===================================================== */

    const preloader =
        document.querySelector(".preloader");

    if (preloader) {

        window.addEventListener("load", () => {

            preloader.classList.add("loaded");

            setTimeout(() => {
                preloader.remove();
            }, 600);

        });
    }


    /* =====================================================
       20. DETECTAR REDUCED MOTION
       ===================================================== */

    const prefersReducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

    if (prefersReducedMotion) {

        document.documentElement.classList.add(
            "reduced-motion"
        );
    }

});


/* =========================================================
   FUNCIONES AUXILIARES
   ========================================================= */

/**
 * Muestra un mensaje debajo del formulario.
 */
function showFormMessage(form, text, type) {

    let message =
        form.querySelector(".form-message");

    if (!message) {

        message =
            document.createElement("div");

        message.className =
            "form-message";

        message.setAttribute(
            "role",
            "alert"
        );

        form.appendChild(message);
    }

    message.textContent = text;

    message.classList.remove(
        "success",
        "error"
    );

    message.classList.add(type);

    message.scrollIntoView({
        behavior: "smooth",
        block: "nearest"
    });
}


/**
 * Convierte YYYY-MM-DD en una fecha legible.
 */
function formatDate(dateString) {

    if (!dateString) return "";

    const date =
        new Date(dateString + "T00:00:00");

    return new Intl.DateTimeFormat(
        "es-ES",
        {
            day: "numeric",
            month: "long",
            year: "numeric"
        }
    ).format(date);
}
