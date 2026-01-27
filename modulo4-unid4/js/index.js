const carousels = {};
const tabsState = {};

var animacao = {
    toggleCard: function (elemento, card) {
        const conteudo = document.getElementById(card);
        const flipped = conteudo.classList.toggle("is-flipped");
        elemento.setAttribute("aria-pressed", flipped ? "true" : "false");
    },

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

    toggleDropdown: function () {
        if (window.innerWidth < 768) {
            const menu = document.getElementById("dropdown-menu");
            const arrow = document.getElementById("dropdown-arrow");
            menu.classList.toggle("hidden");
            arrow.classList.toggle("rotate-180");
        }
    },

    closeDropdown: function () {
        if (window.innerWidth < 768) {
            document.getElementById("dropdown-menu").classList.add("hidden");
            document
                .getElementById("dropdown-arrow")
                .classList.remove("rotate-180");
        }
    },

    initCarousels: function () {
        const containers = document.querySelectorAll(".carousel-container");

        containers.forEach((container) => {
            const id = container.dataset.carouselId;
            const track = container.querySelector(".carousel-track");
            const slides = track.querySelectorAll(".min-w-full");

            carousels[id] = {
                currentIndex: 0,
                totalSlides: slides.length,
                track: track,
            };
        });
    },

    updateCarousel: function (carouselId) {
        const carousel = carousels[carouselId];
        carousel.track.style.transform = `translateX(-${carousel.currentIndex * 100
            }%)`;
    },

    nextSlide: function (carouselId) {
        const carousel = carousels[carouselId];
        carousel.currentIndex = (carousel.currentIndex + 1) % carousel.totalSlides;
        animacao.updateCarousel(carouselId);
    },

    prevSlide: function (carouselId) {
        const carousel = carousels[carouselId];
        carousel.currentIndex =
            (carousel.currentIndex - 1 + carousel.totalSlides) %
            carousel.totalSlides;
        animacao.updateCarousel(carouselId);
    },

    initTabs: function () {
        const containers = document.querySelectorAll('.tabs-container');

        containers.forEach(container => {
            const id = container.dataset.tabsId;
            const buttons = container.querySelectorAll('.tab-button');
            const contents = container.querySelectorAll('.tab-content');

            tabsState[id] = {
                currentIndex: 0,
                buttons: buttons,
                contents: contents
            };
        });
    },

    switchTab: function (tabsId, index) {
        const tabs = tabsState[tabsId];

        tabs.buttons.forEach((button, i) => {
            if (i === index) {
                if (button.classList.contains('border-b-2')) {
                    button.classList.remove('border-transparent');
                    button.classList.add('border-[var(--primary)]', 'text-[var(--primary)]');
                } else {
                    button.classList.remove('text-gray-700', 'hover:bg-gray-200');
                    button.classList.add('bg-[var(--primary)]', 'text-[var(--primary)]');
                }
            } else {
                if (button.classList.contains('border-b-2')) {
                    button.classList.remove('border-[var(--primary)]', 'text-[var(--primary)]');
                    button.classList.add('border-transparent');
                } else {
                    button.classList.remove('bg-[var(--primary)]');
                }
            }
        });

        // Mostra apenas o conteúdo selecionado
        tabs.contents.forEach((content, i) => {
            if (i === index) {
                content.classList.remove('hidden');
            } else {
                content.classList.add('hidden');
            }
        });
        tabs.currentIndex = index;
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
            content: '<p class="text-2xl">Garantia de direito às PPL que precisem de cuidado em saúde mental</p>',
            placement: "right",
            allowHTML: true,
            animation: "scale",
            trigger: "click",
            touch: true,
            interactive: true,
            delay: [100, 0],
        });

        tippy("#tooltip_2", {
            content: '<p class="text-2xl">Fortalecimento da desinstitucionalização das PPL, fechamentos dos institutos psiquiátricos</p>',
            placement: "right",
            allowHTML: true,
            animation: "scale",
            trigger: "click",
            touch: true,
            interactive: true,
            delay: [100, 0],
        });

        tippy("#tooltip_3", {
            content: '<p class="text-2xl">Reestruturação da organização dos processos de trabalho em saúde mental</p>',
            placement: "right",
            allowHTML: true,
            animation: "scale",
            trigger: "click",
            touch: true,
            interactive: true,
            delay: [100, 0],
        });

        tippy("#tooltip_4", {
            content: '<p class="text-2xl">Combate ao estigma e preconceito</p>',
            placement: "right",
            allowHTML: true,
            animation: "scale",
            trigger: "click",
            touch: true,
            interactive: true,
            delay: [100, 0],
        });
        tippy("#papel_1", {
            content: '<p class="text-2xl">Identificação precoce de transtornos mentais e do uso problemático de substâncias</p>',
            placement: "left",
            allowHTML: true,
            animation: "scale",
            trigger: "click",
            touch: true,
            interactive: true,
            delay: [100, 0],
        });
        tippy("#papel_2", {
            content: '<p class="text-2xl">Articulação entre todas as instâncias da rede, para um cuidado geral</p>',
            placement: "left",
            allowHTML: true,
            animation: "scale",
            trigger: "click",
            touch: true,
            interactive: true,
            delay: [100, 0],
        });
        tippy("#papel_3", {
            content: '<p class="text-2xl">Ações preventivas de saúde mental no ambiente prisional</p>',
            placement: "left",
            allowHTML: true,
            animation: "scale",
            trigger: "click",
            touch: true,
            interactive: true,
            delay: [100, 0],
        });
        tippy("#papel_4", {
            content: '<p class="text-2xl">Acolhimento e acompanhamento de casos leves e moderados</p>',
            placement: "left",
            allowHTML: true,
            animation: "scale",
            trigger: "click",
            touch: true,
            interactive: true,
            delay: [100, 0],
        });
        tippy("#ponto_1", {
            content: '<p class="text-2xl"><b>Centro de Atenção Psicossocial (Caps)</b><br><br>São centros especializados no cuidado de pessoas em sofrimento mental mais intenso ou persistente. Oferecem acompanhamento terapêutico, oficinas, grupos e atendimento multiprofissional.</p>',
            placement: "left",
            allowHTML: true,
            animation: "scale",
            trigger: "click",
            touch: true,
            interactive: true,
            delay: [100, 0],
        });
        tippy("#ponto_2", {
            content: '<p class="text-2xl"><b>Unidades de Acolhimentos (UAs)</b><br><br>Oferecem acolhimento provisório e suporte para pessoas em sofrimento psíquico que estejam em situação de vulnerabilidade e sem possibilidade de cuidado em casa.</p>',
            placement: "left",
            allowHTML: true,
            animation: "scale",
            trigger: "click",
            touch: true,
            interactive: true,
            delay: [100, 0],
        });
        tippy("#ponto_3", {
            content: '<p class="text-2xl"><b>Leitos de Atenção Integral</b><br><br>Presentes em hospitais gerais e nos CAPS III, são indicados para casos que exigem cuidado intensivo, mas em ambiente acolhedor e conectado à rede de cuidados.</p>',
            placement: "left",
            allowHTML: true,
            animation: "scale",
            trigger: "click",
            touch: true,
            interactive: true,
            delay: [100, 0],
        });
        tippy("#ponto_4", {
            content: '<p class="text-2xl"><b>Serviços Residenciais Terapêuticos (SRT)</b><br><br>Casas onde vivem pessoas que passaram longos períodos internadas em hospitais psiquiátricos e que agora podem reconstruir suas vidas em liberdade, com apoio profissional.</p>',
            placement: "left",
            allowHTML: true,
            animation: "scale",
            trigger: "click",
            touch: true,
            interactive: true,
            delay: [100, 0],
        });
        tippy("#ponto_5", {
            content: '<p class="text-2xl"><b>Centros de Convivência e Cultura</b><br><br>Espaços abertos à comunidade que promovem a inclusão social por meio de atividades culturais, artísticas e de lazer, valorizando a participação e o protagonismo das pessoas.</p>',
            placement: "left",
            allowHTML: true,
            animation: "scale",
            trigger: "click",
            touch: true,
            interactive: true,
            delay: [100, 0],
        });
        tippy("#ponto_6", {
            content: '<p class="text-2xl"><b>Programa de Volta para Casa (PVC)</b><br><br>Apoia financeiramente pessoas que estavam internadas em hospitais psiquiátricos, incentivando sua reintegração social e o exercício da cidadania.</p>',
            placement: "left",
            allowHTML: true,
            animation: "scale",
            trigger: "click",
            touch: true,
            interactive: true,
            delay: [100, 0],
        });
    },

    exercicioCenario1: function (e) {
        e.preventDefault();
        const feedback = document.getElementById("feedback");
        const resposta = document.querySelector('input[name="resposta"]:checked');
        if (!resposta) {
            feedback.className =
                "mt-6 text-center p-4 rounded-lg bg-yellow-100 text-yellow-800";
            feedback.textContent = "⚠️ Por favor, selecione uma alternativa.";
            feedback.classList.remove("hidden");
            return;
        }
        let mensagem = "";
        let estilo = "";

        if (resposta.value == "B") {
            estilo = "bg-green-100 text-green-800";
        }  else {
            estilo = "bg-red-100 text-red-800";
        }

        feedback.className = `mt-6 text-center p-4 rounded-lg ${estilo}`;
        feedback.classList.remove("hidden");
    },

    exercicioCenario2: function (e) {
        e.preventDefault();
        const feedback = document.getElementById("feedback2");
        const resposta = document.querySelector('input[name="resposta2"]:checked');
        if (!resposta) {
            feedback.className =
                "mt-6 text-center p-4 rounded-lg bg-yellow-100 text-yellow-800";
            feedback.textContent = "⚠️ Por favor, selecione uma alternativa.";
            feedback.classList.remove("hidden");
            return;
        }
        let mensagem = "";
        let estilo = "";

        if (resposta.value == "B") {
            estilo = "bg-green-100 text-green-800";
        }  else {
            estilo = "bg-red-100 text-red-800";
        }

        feedback.className = `mt-6 text-center p-4 rounded-lg ${estilo}`;
        feedback.classList.remove("hidden");
    },

    exercicioCenario3: function (e) {
        e.preventDefault();
        const feedback = document.getElementById("feedback3");
        const resposta = document.querySelector('input[name="resposta3"]:checked');
        if (!resposta) {
            feedback.className =
                "mt-6 text-center p-4 rounded-lg bg-yellow-100 text-yellow-800";
            feedback.textContent = "⚠️ Por favor, selecione uma alternativa.";
            feedback.classList.remove("hidden");
            return;
        }
        let mensagem = "";
        let estilo = "";

        if (resposta.value == "B") {
            estilo = "bg-green-100 text-green-800";
        }  else {
            estilo = "bg-red-100 text-red-800";
        }

        feedback.className = `mt-6 text-center p-4 rounded-lg ${estilo}`;
        feedback.classList.remove("hidden");
    },

    init: function () {
        personalizado.TooltipsUnit1();
        personalizado.initMapTooltips();
        animacao.initCarousels();
        window.addEventListener("scroll", () => {
            estrutura.eventScroll();
        });
    },
};
