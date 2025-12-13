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

	init: function () {
		personalizado.TooltipsUnit1();
        animacao.initTabs();
        animacao.initCarousels();
		window.addEventListener("scroll", () => {
			estrutura.eventScroll();
		});
	},
};
