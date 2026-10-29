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
            content: '<p class="text-2xl"><b>Continuidade no cuidado</b></p><p>Diante da ausência de informações formais, a enfermeira da eAPP entrou em contato por telefone com o serviço especializado de nefrologia, no qual o paciente foi atendido, para esclarecer quais condutas deveriam ser seguidas para a continuidade do cuidado no estabelecimento penal. A enfermeira do serviço de nefrologia, após consulta ao prontuário do paciente, informou a enfermeira da eAPP que, naquele momento, estavam indicadas apenas medidas não farmacológicas, como aumento da ingestão hídrica, redução do consumo de sódio e adequação alimentar geral. Tais orientações foram devidamente repassadas ao paciente pela eAPP.</p>',
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
