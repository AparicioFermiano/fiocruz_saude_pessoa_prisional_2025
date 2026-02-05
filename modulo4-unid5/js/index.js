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
            content: '<p class="text-2xl"><b>Maior necessidade de tratamento</b><br><br>A percepção da necessidade de tratamento da população em geral (72,32%) sugere que essa necessidade pode ser ainda maior no sistema prisional, em que o acesso a cuidados odontológicos é limitado e as condições de higiene podem ser precárias.</p>',
            placement: "right",
            allowHTML: true,
            animation: "scale",
            trigger: "click",
            touch: true,
            interactive: true,
            delay: [100, 0],
        });

        tippy("#tooltip_2", {
            content: '<p class="text-2xl"><b>Alta demanda por próteses</b><br><br>A necessidade de próteses dentárias, já significativa na população em geral (15,46%, chegando a mais de 20% no Norte e Nordeste), pode ser ainda maior entre as pessoas presas devido à perda dentária não tratada ao longo da vida e à dificuldade de acesso à reabilitação oral no sistema prisional.</p>',
            placement: "right",
            allowHTML: true,
            animation: "scale",
            trigger: "click",
            touch: true,
            interactive: true,
            delay: [100, 0],
        });

        tippy("#tooltip_3", {
            content: '<p class="text-2xl"><b>Pior autopercepção em grupos vulneráveis:</b><br><br>É provável que a autopercepção da saúde bucal na população privada de liberdade seja ainda pior devido às condições de vida e ao acesso restrito a cuidados.</p>',
            placement: "right",
            allowHTML: true,
            animation: "scale",
            trigger: "click",
            touch: true,
            interactive: true,
            delay: [100, 0],
        });

        tippy("#tooltip_4", {
            content: '<p class="text-2xl"><b>Impacto significativo nas atividades diárias</b><br><br>Se mais da metade da população adulta relata repercussões negativas da saúde bucal na rotina, é provável que isso seja ainda mais prevalente na população privada de liberdade, uma vez que a falta de cuidados agrava dificuldades de alimentação, comunicação e bem-estar. A vergonha de sorrir ou falar pode causar efeitos psicossociais ainda mais profundos na privação de liberdade.</p>',
            placement: "right",
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

        mensagem = "<b>Resposta ideal:</b> Solicitar atendimento imediato da eAPP. <br><br> <b>Por quê?</b><br><br> Crises psíquicas, especialmente as que envolvem sintomas como alucinações auditivas (“ouve vozes”) e ameaças de autoagressão, podem indicar um quadro de psicose ou outra condição psiquiátrica grave que exige intervenção urgente e especializada. Ignorar esses sinais ou tentar um manejo inadequado pode agravar o quadro e representar risco à vida do indivíduo."

        feedback.className = `mt-6 text-center p-4 rounded-lg ${estilo}`;
        feedback.innerHTML = mensagem;
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

        mensagem = "<b>Resposta ideal:</b> Garantir atendimento de eAPP e, caso a equipe julgue necessário, compartilhar o caso ao CAPS AD. <br><br> <b>Por quê?</b><br><br> A atenção deve ser articulada e respeitar o direito à saúde mental, mesmo durante a privação de liberdade. O manejo de indivíduos com transtornos por uso de substâncias que apresentam sinais de abstinência e histórico de uso intenso de álcool e crack exige uma abordagem integrada e humanizada, especialmente em ambientes prisionais. A APS Prisional desempenha dois papeis fundamentais nesse contexto: o cuidado e a coordenação da assistência à saúde mental no sistema prisional."

        feedback.className = `mt-6 text-center p-4 rounded-lg ${estilo}`;
        feedback.innerHTML = mensagem;
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

        mensagem = "<b>Resposta ideal:</b> Orientar a continuidade dos cuidados após a saída e encaminhá-lo para a rede de saúde do território. <br><br> <b>Por quê?</b><br><br> O planejamento da alta e o acompanhamento posterior à soltura são etapas cruciais e legalmente respaldadas para a reintegração social e a continuidade do cuidado de saúde de pessoas egressas do sistema prisional. A interrupção abrupta do acompanhamento da saúde da pessoa egressa do sistema prisional, especialmente em casos de histórico de transtornos mentais ou uso de substâncias, pode ter consequências graves, como recaída no uso de substâncias, reincidência criminal e até elevação da mortalidade pós-aprisionamento."

        feedback.className = `mt-6 text-center p-4 rounded-lg ${estilo}`;
        feedback.innerHTML = mensagem;
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
