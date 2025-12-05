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

    initCarousels: function() {
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

    initTabs: function() {
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

    switchTab: function(tabsId, index) {
        const tabs = tabsState[tabsId];
    
        tabs.buttons.forEach((button, i) => {
            if (i === index) {
                if (button.classList.contains('border-b-2')) {
                    button.classList.remove('border-transparent');
                    button.classList.add('border-blue-400', 'text-blue-400');
                } else {
                    button.classList.remove('text-gray-700', 'hover:bg-gray-200');
                    button.classList.add('bg-blue-400', 'text-blue-400');
                }
            } else {
                if (button.classList.contains('border-b-2')) {
                    button.classList.remove('border-blue-400', 'text-blue-400');
                    button.classList.add('border-transparent');
                } else {
                    button.classList.remove('bg-blue-400');
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

    updateCarousel: function(carouselId) {
        const carousel = carousels[carouselId];
        carousel.track.style.transform = `translateX(-${carousel.currentIndex * 100
            }%)`;
    },

    nextSlide: function(carouselId) {
        const carousel = carousels[carouselId];
        carousel.currentIndex = (carousel.currentIndex + 1) % carousel.totalSlides;
        animacao.updateCarousel(carouselId);
    },

    prevSlide: function(carouselId) {
        const carousel = carousels[carouselId];
        carousel.currentIndex =
            (carousel.currentIndex - 1 + carousel.totalSlides) %
            carousel.totalSlides;
        animacao.updateCarousel(carouselId);
    }
}

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
}

var personalizado = {
    exercicio1: function () {
        const termosLista = document.getElementById("termos-lista");
        const dropzones = document.querySelectorAll(".dropzone");
        const feedbackDiv = document.getElementById("feedback-final");

        // Nomes dos grupos das definições (IDs das dropzones)
        const definicoesIds = ["def-a", "def-b", "def-c", "def-d"];

        new Sortable(termosLista, {
            group: {
                name: "shared",
                put: false,
            },
            animation: 150,
            ghostClass: "ghost",
            dragoverBubble: true,
            fallbackOnBody: true,
            swapThreshold: 0.65
        });

        // B. Configuração dos Dropzones
        dropzones.forEach((dropzone) => {
            new Sortable(dropzone, {
                group: {
                    name: "shared",
                    pull: "clone",
                    put: true,
                },
                animation: 150,
                ghostClass: "ghost",
                filter: ".termo-item",
                dragoverBubble: true,
                fallbackOnBody: true,
                swapThreshold: 0.65,

                // Apenas 1 item por dropzone
                onMove: function (evt) {
                    return evt.to.children.length < 1;
                },

                onAdd: function (evt) {
                    const dropzone = evt.to;
                    const newItem = evt.item;

                    if (dropzone.children.length > 1) {
                        const oldItem = dropzone.children[0];
                        dropzone.removeChild(oldItem);
                        termosLista.appendChild(oldItem);
                    }

                    newItem.addEventListener("click", function () {
                        dropzone.removeChild(newItem);
                        termosLista.appendChild(newItem);
                    });
                },
            });
        });

        // --- 3. Função de Validação ---
        window.verificarRespostas = function () {
            let acertos = 0;
            const totalQuestoes = definicoesIds.length;

            feedbackDiv.className =
                "px-3 py-2 text-center rounded-lg font-semibold";
            feedbackDiv.textContent = "";

            definicoesIds.forEach((id) => {
                const container = document
                    .getElementById(id)
                    .closest(".dropzone-container");
                const dropzone = document.getElementById(id);

                // Obtém o item solto (deve haver apenas 1)
                const itemSolto = dropzone.querySelector(".termo-item");

                // O data-id do container define o termo CORRETO
                const idCorreto = container.getAttribute("data-id");

                if (itemSolto) {
                    // O data-match do item arrastável define seu valor
                    const valorItem = itemSolto.getAttribute("data-match");
                    if (valorItem === idCorreto) {
                        acertos++;
                        itemSolto.classList.remove("bg-red-500");
                        itemSolto.classList.add("bg-green-500");
                    } else {
                        itemSolto.classList.remove("bg-green-500");
                        itemSolto.classList.add("bg-red-500");
                    }
                }
            })

            // Exibe o resultado final
            if (acertos === totalQuestoes) {
                feedbackDiv.textContent = `Parabéns! Você acertou todas as ${totalQuestoes} questões!`;
                feedbackDiv.classList.add("bg-green-200", "text-green-800");
            } else {
                feedbackDiv.textContent = `Você acertou ${acertos} de ${totalQuestoes}. Revise suas respostas.`;
                feedbackDiv.classList.add("bg-red-200", "text-red-800");
            }
        };
    },

    TooltipsUnit1: function () {
        tippy("#btnInstrucoes", {
            content: 'Instruções para usar o curso.',
            placement: "left",
            animation: "scale",
            touch: ["hold", 500],
            trigger: "mouseenter focus click",
            interactive: true,
            delay: [100, 0],
        });

        tippy("#btnTopo", {
            content: 'Volte para o ínicio.',
            placement: "left",
            animation: "scale",
            touch: ["hold", 500],
            trigger: "mouseenter focus click",
            interactive: true,
            delay: [100, 0],
        });

        tippy("#btnContatar", {
            content: 'Entre em contato.',
            placement: "left",
            animation: "scale",
            touch: ["hold", 500],
            trigger: "mouseenter focus click",
            interactive: true,
            delay: [100, 0],
        });
    },

    init: function () {
        animacao.initCarousels();
        animacao.initTabs();
        personalizado.TooltipsUnit1();
        personalizado.exercicio1();
        window.addEventListener("scroll", () => {
            estrutura.eventScroll();
        });
    }
}
