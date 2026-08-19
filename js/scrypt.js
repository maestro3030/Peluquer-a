document.addEventListener("DOMContentLoaded", () => {

    /* ==========================================
       AÑO DEL FOOTER
       ========================================== */

    document
        .querySelectorAll("[data-current-year]")
        .forEach(element => {
            element.textContent = new Date().getFullYear();
        });


    /* ==========================================
       MENÚ MÓVIL
       ========================================== */

    const menuToggle =
        document.querySelector(".menu-toggle");

    const mainNav =
        document.querySelector(".main-nav");


    if (menuToggle && mainNav) {

        menuToggle.addEventListener("click", () => {

            const opened =
                mainNav.classList.toggle("open");

            menuToggle.setAttribute(
                "aria-expanded",
                opened
            );

        });


        /*
         * Al pulsar un enlace del menú en móvil,
         * cerramos el menú.
         */

        mainNav
            .querySelectorAll("a")
            .forEach(link => {

                link.addEventListener("click", () => {

                    mainNav.classList.remove("open");

                    menuToggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                });

            });

    }


    /* ==========================================
       HEADER AL HACER SCROLL
       ========================================== */

    const header =
        document.querySelector(".site-header");

    if (header) {

        window.addEventListener(
            "scroll",
            () => {

                if (window.scrollY > 40) {
                    header.classList.add("scrolled");
                } else {
                    header.classList.remove("scrolled");
                }

            },
            { passive: true }
        );

    }


    /* ==========================================
       FILTROS DE SERVICIOS
       ========================================== */

    const filterButtons =
        document.querySelectorAll(".filter-btn");

    const serviceCards =
        document.querySelectorAll(".service-card");


    if (
        filterButtons.length &&
        serviceCards.length
    ) {

        filterButtons.forEach(button => {

            button.addEventListener("click", () => {

                const filter =
                    button.dataset.filter;


                filterButtons.forEach(btn => {
                    btn.classList.remove("active");
                });


                button.classList.add("active");


                serviceCards.forEach(card => {

                    const category =
                        card.dataset.category;


                    if (
                        filter === "todos" ||
                        category === filter
                    ) {

                        card.style.display = "";

                    } else {

                        card.style.display = "none";

                    }

                });

            });

        });

    }


    /* ==========================================
       GALERÍA
       ========================================== */

    const galleryItems =
        document.querySelectorAll(".gallery-item");


    if (galleryItems.length) {

        galleryItems.forEach(item => {

            item.addEventListener("click", () => {

                const title =
                    item.dataset.title ||
                    "Trabajo de Peluquerías Élite";


                alert(title);

            });

        });

    }


    /* ==========================================
       RESERVA
       ========================================== */

    const bookingForm =
        document.querySelector("#booking-form");


    if (bookingForm) {

        const dateInput =
            document.querySelector("#date");


        /*
         * Impide seleccionar fechas anteriores
         * al día actual.
         */

        if (dateInput) {

            const today =
                new Date();

            const year =
                today.getFullYear();

            const month =
                String(
                    today.getMonth() + 1
                ).padStart(2, "0");

            const day =
                String(
                    today.getDate()
                ).padStart(2, "0");


            dateInput.min =
                `${year}-${month}-${day}`;

        }


        /*
         * Servicio recibido desde servicios.html
         *
         * Ejemplo:
         *
         * reservas.html?servicio=degradado
         */

        const params =
            new URLSearchParams(
                window.location.search
            );

        const servicio =
            params.get("servicio");


        const serviceSelect =
            document.querySelector("#service");


        if (
            servicio &&
            serviceSelect
        ) {

            const option =
                serviceSelect.querySelector(
                    `option[value="${servicio}"]`
                );


            if (option) {
                serviceSelect.value =
                    servicio;
            }

        }


        /*
         * Envío de la reserva.
         *
         * Actualmente es una demostración:
         * no existe todavía una base de datos.
         */

        bookingForm.addEventListener(
            "submit",
            event => {

                event.preventDefault();


                const name =
                    document.querySelector("#name");


                const message =
                    document.createElement("div");


                message.className =
                    "form-success";


                message.textContent =
                    `Gracias, ${name.value}. ` +
                    `Hemos recibido tu solicitud de cita. ` +
                    `Te contactaremos para confirmar la reserva.`;


                bookingForm.appendChild(
                    message
                );


                bookingForm.reset();

            }
        );

    }

});
