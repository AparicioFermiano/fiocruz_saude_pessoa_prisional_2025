var animacao = {
    toggleAccordion: function (elemento, grupo) {
        const accordion = document.getElementById(grupo);
        const header = document.getElementById(elemento);
        const content = header.nextElementSibling;
        const icon = header.querySelector("svg");

        accordion.querySelectorAll(".accordion-content").forEach((c) => {
            if (c !== content) c.classList.remove("open");
        });
        accordion.querySelectorAll(".accordion-header svg").forEach((i) => {
            if (i !== icon) i.classList.remove("rotate-180");
        });

        content.classList.toggle("open");
        icon.classList.toggle("rotate-180");
    },
};

var estrutura = {
    eventScroll: function () {
        const shouldShow = window.scrollY > 200;

        scrollTopBtn.classList.toggle("hidden", !shouldShow);
        scrollTopBtn.classList.toggle("flex", shouldShow);
    },

    toggleSidebar: function () {
        const menu = document.getElementById("menu");
        menu.classList.toggle("hidden");
        menu.classList.toggle("flex");
    },

    openModal: function (id) {
        const modal = document.getElementById(id);
        modal.classList.remove("hidden");
        document.body.classList.add("overflow-hidden");
    },

    closeModal: function (id) {
        const modal = document.getElementById(id);
        modal.classList.add("hidden");
        document.body.classList.remove("overflow-hidden");
    },
};

var personalizado = {
    TooltipsUnit1: function () {
        tippy("#btnInstrucoes", {
            content: "Instruções para usar o curso.",
            placement: "left",
            animation: "scale",
            touch: ["hold", 500],
            trigger: "mouseenter focus click",
            interactive: true,
            delay: [100, 0],
        });

        tippy("#btnTopo", {
            content: "Volte para o ínicio.",
            placement: "left",
            animation: "scale",
            touch: ["hold", 500],
            trigger: "mouseenter focus click",
            interactive: true,
            delay: [100, 0],
        });

        tippy("#btnContatar", {
            content: "Entre em contato.",
            placement: "left",
            animation: "scale",
            touch: ["hold", 500],
            trigger: "mouseenter focus click",
            interactive: true,
            delay: [100, 0],
        });
    },

    initMapTooltips: function () {
        tippy("#tooltip_1", {
            content: '<p class="text-2xl"><b>Região Norte</b></p><p>O Norte apresenta a menor proporção, com apenas 0,9%, evidenciando uma lacuna preocupante na inclusão e segurança de pessoas LGBTIA+ privadas de liberdade (Brasil, 2020).</p>',
            placement: "bottom",
            allowHTML: true,
            animation: "scale",
            trigger: "click",
            touch: true,
            interactive: true,
            delay: [100, 0],
        });

        tippy("#tooltip_2", {
            content: '<p class="text-2xl"><b>Região Sudeste</b></p><p>O Sudeste concentra 52,8% dessas celas específicas, demonstrando maior adesão a políticas de segregação para proteção dessa população (Brasil, 2020);</p>',
            placement: "bottom",
            allowHTML: true,
            animation: "scale",
            trigger: "click",
            touch: true,
            interactive: true,
            delay: [100, 0],
        });
    },

    init: function () {
        personalizado.TooltipsUnit1();
        personalizado.initMapTooltips();
        window.addEventListener("scroll", () => {
            estrutura.eventScroll();
        });
    },
};
