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
            content: '<p class="text-2xl"><b>Policiais Penais</b></p><p>Atuam na manutenção da segurança, organização e administração do ambiente prisional. Por essa razão, toda e qualquer ação em saúde envolvendo a PPL deve ser construída em conjunto com a polícia penal, uma vez que irá interferir diretamente na sua organização e rotinas de trabalho.</p>',
            placement: "right",
            allowHTML: true,
            animation: "scale",
            trigger: "click",
            touch: true,
            interactive: true,
            delay: [100, 0],
        });

        tippy("#tooltip_2", {
            content: '<p class="text-2xl"><b>Profissionais de saúde</b></p><p>Responsáveis por prestar os atendimentos em saúde no ambiente prisional. Atuam na promoção da saúde e na prevenção e controle de agravos e doenças, realizando atendimentos e tratamentos caso a caso.</p>',
            placement: "right",
            allowHTML: true,
            animation: "scale",
            trigger: "click",
            touch: true,
            interactive: true,
            delay: [100, 0],
        });

        tippy("#tooltip_3", {
            content: '<p class="text-2xl"><b>Pessoas privadas de liberdade</b></p><p>Desempenham papel fundamental no direcionamento de estratégias de promoção da saúde e prevenção de agravos e doenças, especialmente na figura de agentes promotores de saúde, conforme veremos a seguir.</p>',
            placement: "right",
            allowHTML: true,
            animation: "scale",
            trigger: "click",
            touch: true,
            interactive: true,
            delay: [100, 0],
        });

        tippy("#tooltip_4", {
            content: '<p class="text-2xl"><b>Profissionais da educação</b></p><p>Atuam na oferta de educação formal para a população privada de liberdade, garantindo a alfabetização, formação em nível fundamental e médio por meio da Educação de Jovens e Adultos (EJA). Apresentam um potencial significativo para a promoção da saúde, principalmente em virtude do vínculo criado em sala de aula.</p>',
            placement: "right",
            allowHTML: true,
            animation: "scale",
            trigger: "click",
            touch: true,
            interactive: true,
            delay: [100, 0],
        });
        tippy("#tooltip_5", {
            content: '<p class="text-2xl"><b>Trabalhadores da justiça</b></p><p>Atuam na execução de leis penais na condução do caso de cada PPL. Podem contribuir com a promoção da saúde propondo projetos e apoiando a realização de ações em saúde promovidas pelas instituições prisionais.</p>',
            placement: "left",
            allowHTML: true,
            animation: "scale",
            trigger: "click",
            touch: true,
            interactive: true,
            delay: [100, 0],
        });
        tippy("#tooltip_6", {
            content: '<p class="text-2xl"><b>Conselhos da comunidade</b></p><p>Representam o controle social no sistema prisional, atuando na representação da comunidade em espaços de decisão; na promoção de atividades educativas; e na fiscalização, monitoramento e avaliação de políticas e recursos implementados no sistema prisional (Conselho Nacional de Justiça, 2021).</p>',
            placement: "left",
            allowHTML: true,
            animation: "scale",
            trigger: "click",
            touch: true,
            interactive: true,
            delay: [100, 0],
        });
        tippy("#tooltip_7", {
            content: '<p class="text-2xl"><b>Familiares e redes de apoio</b></p><p>Constituem a ponte entre o intra e o extramuros durante a privação de liberdade e contribuem, muitas vezes, para a manutenção da saúde da PPL e ressocialização após a liberdade.</p>',
            placement: "left",
            allowHTML: true,
            animation: "scale",
            trigger: "click",
            touch: true,
            interactive: true,
            delay: [100, 0],
        });
        tippy("#tooltip_8", {
            content: '<p class="text-2xl"><b>Organizações da Sociedade Civil</b></p><p>Entidades privadas sem fins lucrativos que promovem ações de interesse público. No sistema prisional, funcionam como rede de apoio às PPL e garantem acesso a lazer, cultura, atividades recreativas e protetivas (exemplos: instituições religiosas, projetos universitários, entre outros).</p>',
            placement: "left",
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

    init: function () {
        personalizado.TooltipsUnit1();
        personalizado.initMapTooltips();
        personalizado.initRelatoTooltips();
        window.addEventListener("scroll", () => {
            estrutura.eventScroll();
        });
    },
};
