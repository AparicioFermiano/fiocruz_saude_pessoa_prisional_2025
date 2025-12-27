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
            content: '<p class="text-2xl"><b>Tabagismo</b></p><p>É tabagista há 30 anos, com consumo de 2 maços de cigarro por dia (carga tabágica de 60 anos-maço).</p>',
            placement: "bottom",
            allowHTML: true,
            animation: "scale",
            trigger: "click",
            touch: true,
            interactive: true,
            delay: [100, 0],
        });

        tippy("#tooltip_2", {
            content: '<p class="text-2xl"><b>HAS</b></p><p>É portadora de hipertensão arterial sistêmica (HAS) há 10 anos e faz uso irregular de medicação anti-hipertensiva.</p>',
            placement: "bottom",
            allowHTML: true,
            animation: "scale",
            trigger: "click",
            touch: true,
            interactive: true,
            delay: [100, 0],
        });

        tippy("#tooltip_3", {
            content: '<p class="text-2xl"><b>Sobrepeso</b></p><p>Tem sobrepeso e não pratica atividade física.</p>',
            placement: "bottom",
            allowHTML: true,
            animation: "scale",
            trigger: "click",
            touch: true,
            interactive: true,
            delay: [100, 0],
        });

        tippy("#tooltip_4", {
            content: '<p class="text-2xl"><b>Suspeita de IAM</b></p><p>Ao chegar à UBSP, queixa-se de dor de cabeça, dor no peito que irradia para o braço esquerdo e náusea, com um episódio de vômito, e afirma que o início dos sintomas aconteceu há 30 minutos. A pressão arterial (PA) está 200x120 mmHg. O médico levanta a hipótese de infarto agudo do miocárdio (IAM).</p>',
            placement: "bottom",
            allowHTML: true,
            animation: "scale",
            trigger: "click",
            touch: true,
            interactive: true,
            delay: [100, 0],
        });
    },

    initQuadrinhoTooltips: function () {
        tippy("#quadrinho_1", {
            content: '<p class="text-2xl"><b>UBSP</b></p><p>J.M.A.R., 59 anos, sexo masculino, custodiado em um Centro de Detenção Provisória (CDP), é encaminhado pelo agente de segurança prisional para a UBSP do CDP. O paciente é avaliado pelo enfermeiro, que identifica sinais sugestivos de um Acidente Vascular Cerebral (AVC) e aciona o Serviço de Atendimento Móvel de Urgência (SAMU) para transporte à Unidade de Pronto Atendimento (UPA) com uma ficha de encaminhamento (guia de referência) que descreve o que ocorreu com o paciente e quais condutas foram tomadas na UBSP.</p>',
            placement: "bottom",
            allowHTML: true,
            animation: "scale",
            trigger: "click",
            touch: true,
            interactive: true,
            delay: [100, 0],
        });

        tippy("#quadrinho_2", {
            content: '<p class="text-2xl"><b>UPA</b></p><p>Ao chegar à UPA, J.M.A.R. passa por avaliação médica, cujo resultado é suspeita de AVC. É então inserido no sistema da Central de Regulação para solicitar uma vaga no hospital e é encaminhado para internação hospitalar também com uma guia de referência.</p>',
            placement: "bottom",
            allowHTML: true,
            animation: "scale",
            trigger: "click",
            touch: true,
            interactive: true,
            delay: [100, 0],
        });

        tippy("#quadrinho_3", {
            content: '<p class="text-2xl"><b>Internação Hospitalar</b></p><p>Após a estabilização do quadro agudo, o paciente tem alta hospitalar e retorna ao CDP com uma guia de contrarreferência, que descreve a evolução do caso, as condutas tomadas no hospital e o necessário para a continuidade do cuidado no âmbito prisional.</p>',
            placement: "bottom",
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
        animacao.initTabs();
        personalizado.initMapTooltips();
        animacao.initCarousels();
        personalizado.initQuadrinhoTooltips();
        window.addEventListener("scroll", () => {
            estrutura.eventScroll();
        });
    },
};
