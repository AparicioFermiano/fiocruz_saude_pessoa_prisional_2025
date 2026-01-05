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

        tippy("#tooltip_rede_alyne", {
            content: "A Rede Alyne foi criada em 2024 para reestruturar a Rede Cegonha, nome de origem da Portaria. Saiba mais sobre a história e a Rede Alyne <a class='text-blue-600 undeline' target='_blank' href='https://www.gov.br/saude/pt-br/assuntos/noticias/2024/setembro/rede-alyne-conheca-a-historia-da-jovem-negra-que-deu-nome-ao-novo-programa-de-cuidado-integral-a-gestante-e-bebe'>clicando aqui!</a>",
            placement: "left",
            animation: "scale",
            touch: ["hold", 500],
            trigger: "mouseenter focus click",
            interactive: true,
            delay: [100, 0],
            allowHTML: true,
            interactive: true
        });
    },

    initMapTooltips: function () {
        tippy("#tooltip_1", {
            content: '<p class="text-2xl"><b>Equipe Base</b></p><p>Médico</p>',
            placement: "bottom",
            allowHTML: true,
            animation: "scale",
            trigger: "click",
            touch: true,
            interactive: true,
            delay: [100, 0],
        });

        tippy("#tooltip_2", {
            content: '<p class="text-2xl"><b>Equipe Base</b></p><p>Enfermeiro Auxiliar e/ou Técnico de Enfermagem</p>',
            placement: "bottom",
            allowHTML: true,
            animation: "scale",
            trigger: "click",
            touch: true,
            interactive: true,
            delay: [100, 0],
        });

        tippy("#tooltip_3", {
            content: '<p class="text-2xl"><b>Equipe Base</b></p><p>Agente Comunitário de Saúde (ACS)</p>',
            placement: "bottom",
            allowHTML: true,
            animation: "scale",
            trigger: "click",
            touch: true,
            interactive: true,
            delay: [100, 0],
        });

        tippy("#tooltip_4", {
            content: '<p class="text-2xl"><b>Profissionais Adicionais</b></p><p>Profissionais de Saúde Bucal</p>',
            placement: "bottom",
            allowHTML: true,
            animation: "scale",
            trigger: "click",
            touch: true,
            interactive: true,
            delay: [100, 0],
        });
        tippy("#tooltip_5", {
            content: '<p class="text-2xl"><b>Profissionais Adicionais</b></p><p>Agente de Combate a Endemias (ACE)</p>',
            placement: "bottom",
            allowHTML: true,
            animation: "scale",
            trigger: "click",
            touch: true,
            interactive: true,
            delay: [100, 0],
        });
    },

    initRelatoTooltips: function () {
        tippy("#relato_1", {
            content: '<p class="text-2xl"><b>Complicações</b></p><p>Com o tempo, o paciente passou a apresentar sinais de complicações relacionadas à diabetes, evidenciadas por alterações nos exames laboratoriais de sangue e urina, que indicaram comprometimento da função renal. Diante desse quadro e considerando os fluxos de referência e contrarreferência da RAS, a eAPP solicitou encaminhamento para avaliação em ambulatório especializado em nefrologia, com equipe capacitada para acompanhamento de disfunções renais.</p>',
            placement: "right",
            allowHTML: true,
            animation: "scale",
            trigger: "click",
            touch: true,
            interactive: true,
            delay: [100, 0],
        });

        tippy("#relato_2", {
            content: '<p class="text-2xl"><b>Encaminhamento</b></p><p>Para viabilizar o encaminhamento, foi emitida uma guia de referência contendo o diagnóstico, os exames realizados e as condutas previamente adotadas na instituição penal. O paciente foi então atendido em consulta nefrológica, durante a qual foram solicitados novos exames e estabelecidas orientações clínicas. No entanto, ao retornar à instituição penal, o paciente não trouxe consigo a guia de contrarreferência nem as receitas médicas, dificultando a continuidade do cuidado.</p>',
            placement: "right",
            allowHTML: true,
            animation: "scale",
            trigger: "click",
            touch: true,
            interactive: true,
            delay: [100, 0],
        });

        tippy("#relato_3", {
            content: '<p class="text-2xl"><b>Continuidade no cuidado</b></p><p>Diante da ausência de informações formais, a enfermeira da eAPP entrou em contato por telefone com o serviço especializado de nefrologia, no qual o paciente foi atendimento, para esclarecer quais condutas deveriam ser seguidas para a continuidade do cuidado no estabelecimento penal. A enfermeira do serviço de nefrologia, após consulta ao prontuário do paciente, informou a enfermeira da eAPP que, naquele momento, estavam indicadas apenas medidas não farmacológicas, como aumento da ingestão hídrica, redução do consumo de sódio e adequação alimentar geral. Tais orientações foram devidamente repassadas ao paciente pela eAPP.</p>',
            placement: "right",
            allowHTML: true,
            animation: "scale",
            trigger: "click",
            touch: true,
            interactive: true,
            delay: [100, 0],
        });
    },

    exercicioFixacao: function (e) {
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
        switch (resposta.value) {
            case "A":
                mensagem =
                    "✅ Resposta correta! O direito à identidade de gênero foi violado, já que a pessoa trans não teve seu nome social e identidade respeitados no sistema prisional, contrariando as garantias legais estabelecidas no Brasil; o direito à assistência à saúde foi violado porque a personagem relatou a dificuldade de acesso a tratamentos médicos adequados, mostrando a violação do direito básico de assistência integral à saúde da pessoa privada de liberdade; o direito à proteção contra violência e discriminação foi violado porque a história evidencia a LGBTfobia sofrida na instituição penal, caracterizando falha na proteção contra violência e discriminação, o que é um direito garantido.";
                estilo = "bg-green-100 text-green-800";
                break;
            case "B":
                mensagem =
                    "❌ Incorreto. Apenas com a ilustração não é possível realizar essa afirmação.";
                estilo = "bg-red-100 text-red-800";
                break;
            case "C":
                mensagem =
                    "❌ Incorreto. Apenas com a ilustração não é possível realizar essa afirmação.";
                estilo = "bg-red-100 text-red-800";
                break;
            case "D":
                mensagem =
                    "❌ Incorreto. O caso apresentado revela a violação de diversos direitos fundamentais, demonstrando a necessidade urgente de avanços na garantia da dignidade e cidadania de pessoas privadas de liberdade.";
                estilo = "bg-red-100 text-red-800";
                break;
        }
        feedback.className = `mt-6 text-center p-4 rounded-lg ${estilo}`;
        feedback.textContent = mensagem;
        feedback.classList.remove("hidden");
    },

    init: function () {
        personalizado.TooltipsUnit1();
        personalizado.initMapTooltips();
        personalizado.initRelatoTooltips();
        window.addEventListener("scroll", () => {
            estrutura.eventScroll();
        });
    },
};
