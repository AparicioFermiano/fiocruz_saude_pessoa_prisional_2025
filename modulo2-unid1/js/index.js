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

	init: function () {
		personalizado.TooltipsUnit1();
		window.addEventListener("scroll", () => {
			estrutura.eventScroll();
		});
	},
};
