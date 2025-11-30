function toggleSidebar() {
    const menu = document.getElementById("menu");
    menu.classList.toggle("hidden");
    menu.classList.toggle("flex");
}


window.addEventListener("scroll", () => {
    if (window.scrollY > 200) {
        scrollTopBtn.classList.remove("hidden");
        scrollTopBtn.classList.add("flex");
    } else {
        scrollTopBtn.classList.add("hidden");
        scrollTopBtn.classList.remove("flex");
    }
});

function toggleCard(elemento, card) {
    const conteudo = document.getElementById(card);
    const flipped = conteudo.classList.toggle("is-flipped");
    elemento.setAttribute("aria-pressed", flipped ? "true" : "false");
}

function toggleAccordion(elemento, grupo) {
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
}

function toggleZoom(id) {
    const img = document.getElementById(id);
    img.classList.toggle("zoomed");
}

function openModal(id) {
    const modal = document.getElementById(id);
    modal.classList.remove("hidden");
    document.body.classList.add("overflow-hidden");
}

function closeModal(id) {
    const modal = document.getElementById(id);
    modal.classList.add("hidden");
    document.body.classList.remove("overflow-hidden");
}

function closeOnOverlay(event, modal) {
    if (event.target === modal) {
        closeModal(modal.id);
    }
}

const carousels = {};

// Inicializa todos os carrosséis
function initCarousels() {
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
}

const tabsState = {};

    // Inicializa todos os conjuntos de abas
    function initTabs() {
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
    }

    // Troca de aba
    function switchTab(tabsId, index) {
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
    }

// Atualiza a posição do carrossel
function updateCarousel(carouselId) {
	const carousel = carousels[carouselId];
	carousel.track.style.transform = `translateX(-${
		carousel.currentIndex * 100
	}%)`;
}

// Vai para o próximo slide
function nextSlide(carouselId) {
	const carousel = carousels[carouselId];
	carousel.currentIndex = (carousel.currentIndex + 1) % carousel.totalSlides;
	updateCarousel(carouselId);
}

// Vai para o slide anterior
function prevSlide(carouselId) {
	const carousel = carousels[carouselId];
	carousel.currentIndex =
		(carousel.currentIndex - 1 + carousel.totalSlides) %
		carousel.totalSlides;
	updateCarousel(carouselId);
}


document.addEventListener("DOMContentLoaded", initCarousels);
document.addEventListener('DOMContentLoaded', initTabs);

function TooltipsUnit1() {
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
}

document.addEventListener("click", function (e) {
    const overlay = e.target.closest(".modal-overlay");

    if (!overlay) return;

    const content = overlay.querySelector(".modal-content");

    if (!content.contains(e.target)) {
        closeModal(overlay.id)
    }
});

document.addEventListener("DOMContentLoaded", () => {
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

    document.getElementById("dropdown-toggle").addEventListener("click", function () {
            const menu = document.getElementById("dropdown-menu");
            menu.classList.toggle("hidden");
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
});
