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
}

var estrutura = {
    eventOverlay: function (e) {
        const overlay = e.target.closest(".modal-overlay");
        if (!overlay) return;

        if (!overlay.querySelector(".modal-content")?.contains(e.target)) {
            closeModal(overlay.id);
        }
    },

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
        const definicoesIds = ["def-a", "def-b", "def-c", "def-d", "def-e", "def-f"];

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
    initMapTooltips: function () {
        tippy("#tooltip_1", {
            content: '<p class="text-2xl"><b>Estados Unidos</b></p><p> 1,8 milhão</p>',
            placement: "right",
            allowHTML: true,
            animation: "scale",
            trigger: "click",
            touch: true,
            interactive: true,
            delay: [100, 0],
        });

        tippy("#tooltip_2", {
            content: '<p class="text-2xl"><b>Brasil</b></p><p>mais de 909 mil</p>',
            placement: "left",
            allowHTML: true,
            animation: "scale",
            trigger: "click",
            touch: true,
            interactive: true,
            delay: [100, 0],
        });

        tippy("#tooltip_3", {
            content: '<p class="text-2xl"><b>Rússia</b></p><p>433 mil</p>',
            placement: "left",
            allowHTML: true,
            animation: "scale",
            trigger: "click",
            touch: true,
            interactive: true,
            delay: [100, 0],
        });

        tippy("#tooltip_4", {
            content: '<p class="text-2xl"><b>China</b></p><p>1,6 milhão</p>',
            placement: "left",
            allowHTML: true,
            animation: "scale",
            trigger: "click",
            touch: true,
            interactive: true,
            delay: [100, 0],
        });

        tippy("#tooltip_5", {
            content: '<p class="text-2xl"><b>Índia</b></p><p>573 mil</p>',
            placement: "left",
            allowHTML: true,
            animation: "scale",
            trigger: "click",
            touch: true,
            interactive: true,
            delay: [100, 0],
        });
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
        personalizado.initMapTooltips();
        personalizado.TooltipsUnit1();
        personalizado.exercicio1();
        window.addEventListener("scroll", () => {
            estrutura.eventScroll();
        });
    }
}
