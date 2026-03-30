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
    }

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

    exercicioFixacao1: function (e) {
        e.preventDefault();
        const feedback = document.getElementById("feedback1");
        const respostas = document.querySelectorAll(
            'input[name="resposta1"]:checked'
        );
        if (respostas.length === 0) {
            feedback.className =
                "mt-6 p-4 rounded-lg bg-yellow-100 text-yellow-800";
            feedback.textContent = "⚠️ Por favor, selecione ao menos uma alternativa.";
            feedback.classList.remove("hidden");
            return;
        }
        const corretas = ["A", "B"];
        const marcadas = Array.from(respostas).map(r => r.value);
        const acertou =
            corretas.every(v => marcadas.includes(v)) &&
            marcadas.every(v => corretas.includes(v));

        feedback.parentElement.querySelectorAll("label").forEach(label => {
            const input = label.querySelector("input");
            if (corretas.includes(input.value)) {
                label.classList.add("bg-green-100", "rounded-md", "px-2");
            } else if (input.checked) {
                label.classList.add("bg-red-100", "rounded-md", "px-2");
            }
        });

        let mensagem = `
            <p><strong>(V)</strong> - A Lei de Execução Penal (LEP), em seu artigo 41,
            assegura ao preso o direito à visita do cônjuge, parentes e amigos,
            justamente para preservar os vínculos afetivos.</p>
            <p class="mt-2"><strong>(V)</strong> - As Regras de Nelson Mandela e as Regras
            de Bangkok (ONU) destacam que manter o contato com a família é essencial
            para a dignidade humana e a reintegração social da pessoa privada de
            liberdade.</p>
            <p class="mt-2"><strong>(F)</strong> - Embora a LEP seja a principal norma
            federal, cada estado brasileiro pode editar normas complementares
            (como portarias e resoluções) para regulamentar o funcionamento dos
            estabelecimentos penais em seu território.</p>
        `;
        feedback.className = `mt-6 p-4 rounded-lg ${
            acertou ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
        }`;
        feedback.innerHTML = mensagem;
        feedback.classList.remove("hidden");
    },

    exercicioFixacao2: function (e) {
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
        const correta = "C";
        feedback.parentElement.querySelectorAll("label").forEach(label => {
            const input = label.querySelector("input");
            if (input.value === correta) {
                label.classList.add("bg-green-100", "rounded-md", "px-2");
            } else if (input.checked) {
                label.classList.add("bg-red-100", "rounded-md", "px-2");
            }
        });
        let mensagem = "";
        let estilo = "";
        switch (resposta.value) {
            case "A":
                mensagem =
                    "❌ Incorreto.";
                    estilo = "bg-red-100 text-red-800";
                break;
            case "B":
                mensagem =
                    "❌ Incorreto.";
                estilo = "bg-red-100 text-red-800";
                break;
            case "C":
                mensagem =
                    "✅ Resposta correta! Esse é um dos princípios centrais da LEP, que busca a ressocialização como forma de prevenir a reincidência.";
                    estilo = "bg-green-100 text-green-800";
                    break;
            case "D":
                mensagem =
                    "❌ Incorreto.";
                estilo = "bg-red-100 text-red-800";
                break;
        }
        feedback.className = `mt-6 text-center p-4 rounded-lg ${estilo}`;
        feedback.textContent = mensagem;
        feedback.classList.remove("hidden");
    },

    exercicioFixacao3: function (e) {
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
        const correta = "D";
        feedback.parentElement.querySelectorAll("label").forEach(label => {
            const input = label.querySelector("input");
            if (input.value === correta) {
                label.classList.add("bg-green-100", "rounded-md", "px-2");
            } else if (input.checked) {
                label.classList.add("bg-red-100", "rounded-md", "px-2");
            }
        });
        let mensagem = "";
        let estilo = "";
        switch (resposta.value) {
            case "A":
                mensagem =
                    "❌ Incorreto.";
                    estilo = "bg-red-100 text-red-800";
                break;
            case "B":
                mensagem =
                    "❌ Incorreto.";
                estilo = "bg-red-100 text-red-800";
                break;
            case "C":
                mensagem =
                    "❌ Incorreto.";
                    estilo = "bg-red-100 text-red-800";
                    break;
            case "D":
                mensagem =
                    "✅ Resposta correta! As famílias enfrentam estigma, limitações financeiras, longas viagens e barreiras institucionais, o que afeta diretamente o vínculo familiar com as PPL.";
                    estilo = "bg-green-100 text-green-800";
                break;
        }
        feedback.className = `mt-6 text-center p-4 rounded-lg ${estilo}`;
        feedback.textContent = mensagem;
        feedback.classList.remove("hidden");
    },

    exercicioFixacao4: function (e) {
        e.preventDefault();
        const feedback = document.getElementById("feedback4");
        const resposta = document.querySelector('input[name="resposta4"]:checked');
        if (!resposta) {
            feedback.className =
                "mt-6 text-center p-4 rounded-lg bg-yellow-100 text-yellow-800";
            feedback.textContent = "⚠️ Por favor, selecione uma alternativa.";
            feedback.classList.remove("hidden");
            return;
        }
        const correta = "B";
        feedback.parentElement.querySelectorAll("label").forEach(label => {
            const input = label.querySelector("input");
            if (input.value === correta) {
                label.classList.add("bg-green-100", "rounded-md", "px-2");
            } else if (input.checked) {
                label.classList.add("bg-red-100", "rounded-md", "px-2");
            }
        });
        let mensagem = "";
        let estilo = "";
        switch (resposta.value) {
            case "A":
                mensagem =
                    "❌ Incorreto.";
                    estilo = "bg-red-100 text-red-800";
                break;
            case "B":
                mensagem =
                    "✅ Resposta correta! A precariedade estrutural e o sucateamento da educação pública.";
                estilo = "bg-green-100 text-green-800";
                break;
            case "C":
                mensagem =
                    "❌ Incorreto.";
                    estilo = "bg-red-100 text-red-800";
                    break;
            case "D":
                mensagem =
                    "❌ Incorreto.";
                    estilo = "bg-red-100 text-red-800";
                break;
        }
        feedback.className = `mt-6 text-center p-4 rounded-lg ${estilo}`;
        feedback.textContent = mensagem;
        feedback.classList.remove("hidden");
    },

    exercicioFixacao5: function (e) {
        e.preventDefault();
        const feedback = document.getElementById("feedback5");
        const resposta = document.querySelector('input[name="resposta5"]:checked');
        if (!resposta) {
            feedback.className =
                "mt-6 text-center p-4 rounded-lg bg-yellow-100 text-yellow-800";
            feedback.textContent = "⚠️ Por favor, selecione uma alternativa.";
            feedback.classList.remove("hidden");
            return;
        }
        const correta = "B";
        feedback.parentElement.querySelectorAll("label").forEach(label => {
            const input = label.querySelector("input");
            if (input.value === correta) {
                label.classList.add("bg-green-100", "rounded-md", "px-2");
            } else if (input.checked) {
                label.classList.add("bg-red-100", "rounded-md", "px-2");
            }
        });
        let mensagem = "";
        let estilo = "";
        switch (resposta.value) {
            case "A":
                mensagem =
                    "❌ Incorreto.";
                    estilo = "bg-red-100 text-red-800";
                break;
            case "B":
                mensagem =
                    "✅ Resposta correta! b) A ausência de políticas públicas de reintegração e o abandono familiar.";
                estilo = "bg-green-100 text-green-800";
                break;
            case "C":
                mensagem =
                    "❌ Incorreto.";
                    estilo = "bg-red-100 text-red-800";
                    break;
            case "D":
                mensagem =
                    "❌ Incorreto.";
                    estilo = "bg-red-100 text-red-800";
                break;
        }
        feedback.className = `mt-6 text-center p-4 rounded-lg ${estilo}`;
        feedback.textContent = mensagem;
        feedback.classList.remove("hidden");
    },

    exercicioFixacao6: function (e) {
        e.preventDefault();
        const feedback = document.getElementById("feedback6");
        const resposta = document.querySelector('input[name="resposta6"]:checked');
        if (!resposta) {
            feedback.className =
                "mt-6 text-center p-4 rounded-lg bg-yellow-100 text-yellow-800";
            feedback.textContent = "⚠️ Por favor, selecione uma alternativa.";
            feedback.classList.remove("hidden");
            return;
        }
        const correta = "A";
        feedback.parentElement.querySelectorAll("label").forEach(label => {
            const input = label.querySelector("input");
            if (input.value === correta) {
                label.classList.add("bg-green-100", "rounded-md", "px-2");
            } else if (input.checked) {
                label.classList.add("bg-red-100", "rounded-md", "px-2");
            }
        });
        let mensagem = "";
        let estilo = "";
        switch (resposta.value) {
            case "A":
                mensagem =
                "✅ Resposta correta! a) Que segurança e educação são funções incompatíveis.";
                estilo = "bg-green-100 text-green-800";
                break;
            case "B":
                mensagem =
                    "❌ Incorreto.";
                    estilo = "bg-red-100 text-red-800";
                    break;
            case "C":
                mensagem =
                    "❌ Incorreto.";
                    estilo = "bg-red-100 text-red-800";
                    break;
            case "D":
                mensagem =
                    "❌ Incorreto.";
                    estilo = "bg-red-100 text-red-800";
                break;
        }
        feedback.className = `mt-6 text-center p-4 rounded-lg ${estilo}`;
        feedback.textContent = mensagem;
        feedback.classList.remove("hidden");
    },

    exercicioFixacao7: function (e) {
        e.preventDefault();
        const feedback = document.getElementById("feedback7");
        const resposta = document.querySelector('input[name="resposta7"]:checked');
        if (!resposta) {
            feedback.className =
                "mt-6 text-center p-4 rounded-lg bg-yellow-100 text-yellow-800";
            feedback.textContent = "⚠️ Por favor, selecione uma alternativa.";
            feedback.classList.remove("hidden");
            return;
        }
        const correta = "C";
        feedback.parentElement.querySelectorAll("label").forEach(label => {
            const input = label.querySelector("input");
            if (input.value === correta) {
                label.classList.add("bg-green-100", "rounded-md", "px-2");
            } else if (input.checked) {
                label.classList.add("bg-red-100", "rounded-md", "px-2");
            }
        });
        let mensagem = "";
        let estilo = "";
        switch (resposta.value) {
            case "A":
                mensagem =
                    "❌ Incorreto.";
                    estilo = "bg-red-100 text-red-800";
                    break;
            case "B":
                mensagem =
                    "❌ Incorreto.";
                    estilo = "bg-red-100 text-red-800";
                    break;
            case "C":
                mensagem =
                "✅ Resposta correta! c) Que muitos privados de liberdade recebem apenas remição da pena, sem compensações financeiras ou previdenciárias.";
                estilo = "bg-green-100 text-green-800";
                break;
            case "D":
                mensagem =
                    "❌ Incorreto.";
                    estilo = "bg-red-100 text-red-800";
                break;
        }
        feedback.className = `mt-6 text-center p-4 rounded-lg ${estilo}`;
        feedback.textContent = mensagem;
        feedback.classList.remove("hidden");
    },

	init: function () {
		personalizado.TooltipsUnit1();
        animacao.initCarousels();
		window.addEventListener("scroll", () => {
			estrutura.eventScroll();
		});
	},
};
