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
                    "✅ Correto! A abordagem deve ser multiprofissional, centrada no Projeto Terapêutico Singular (PTS), garantindo o controle da infecção, o diagnóstico precoce de lesões potencialmente malignas, o restabelecimento da função bucal e a melhoria da qualidade de vida da PPL.";
                estilo = "bg-green-100 text-green-800";
                break;
            case "B":
                mensagem =
                    "❌ Incorreto. O adiamento da remoção de focos infecciosos e da investigação de lesões pode agravar o quadro clínico e comprometer o cuidado integral.";
                estilo = "bg-red-100 text-red-800";
                break;
            case "C":
                mensagem =
                    "❌ Incorreto. A reabilitação não deve ser realizada antes da resolução dos processos infecciosos e da exclusão de malignidade.";
                estilo = "bg-red-100 text-red-800";
                break;
            case "D":
                mensagem =
                    "❌ Incorreto. A equipe de Saúde Bucal deve atuar de forma integrada com os demais profissionais, sendo parte essencial do cuidado.";
                estilo = "bg-red-100 text-red-800";
                break;
        }
        feedback.className = `mt-6 text-center p-4 rounded-lg ${estilo}`;
        feedback.textContent = mensagem;
        feedback.classList.remove("hidden");
    },

    initMapTooltips: function () {
        tippy("#tooltip_1", {
            content: `<p class="text-2xl"><b>Promotor</b></p><p>Fiscalização das condições sanitárias e de assistência à saúde.<br><br>
            Atuação na judicialização da saúde prisional.<br><br>
            Defesa de políticas públicas e controle social.<br><br>
            Proteção aos grupos vulneráveis no sistema prisional.<br><br>
            Combate a doenças infecciosas e promoção da saúde prisional.</p>`,
            placement: "right",
            allowHTML: true,
            animation: "scale",
            trigger: "click",
            touch: true,
            interactive: true,
            delay: [100, 0],
        });

        tippy("#tooltip_2", {
            content: `<p class="text-2xl"><b>Juiz</b></p><p>
            Garantia do direito à saúde no âmbito da execução penal.<br><br>
            Controle e fiscalização das condições de saúde no sistema prisional.<br><br>
            Decisões judiciais para garantir o tratamento adequado.<br><br>
            Responsabilização do Estado e monitoramento das políticas públicas.</p>`,
            placement: "right",
            allowHTML: true,
            animation: "scale",
            trigger: "click",
            touch: true,
            interactive: true,
            delay: [100, 0],
        });

        tippy("#tooltip_3", {
            content: `<p class="text-2xl"><b>Defensor</b></p><p>
            Fiscalização das condições sanitárias e de assistência à saúde.<br><br>
            Defesa dos direitos individuais ou coletivos das PPL.<br><br>
            Inspeções e fiscalizações.<br><br>
            Promoção de ações coletivas.<br><br>
            Educação em direitos.<br><br>
            Articulação interinstitucional.</p>`,
            placement: "right",
            allowHTML: true,
            animation: "scale",
            trigger: "click",
            touch: true,
            interactive: true,
            delay: [100, 0],
        });

        tippy("#policial_1", {
            content: '<p class="text-2xl">Na minha atuação como policial penal, percebo que a nossa atividade-fim é a reinserção social das PPL. Só que, no meu dia a dia como policial penal, que é a função mais comum no sistema prisional, também sou responsável por conter, vigiar, manter o controle e a disciplina das PPL.</p>',
            placement: "right",
            allowHTML: true,
            animation: "scale",
            trigger: "click",
            touch: true,
            interactive: true,
            delay: [100, 0],
        });

        tippy("#policial_2", {
            content: '<p class="text-2xl">E é justamente aí que a coisa complica: essas funções, embora façam parte da mesma rotina, às vezes parecem caminhar em direções opostas. De um lado, sou cobrado a participar do processo de ressocialização, ajudando na reinserção da pessoa na sociedade. Do outro, preciso garantir a segurança, seguir normas e manter a ordem. Está tudo interligado e eu preciso fazer esse equilíbrio todos os dias.</p>',
            placement: "right",
            allowHTML: true,
            animation: "scale",
            trigger: "click",
            touch: true,
            interactive: true,
            delay: [100, 0],
        });

        tippy("#policial_3", {
            content: '<p class="text-2xl">Por isso, acredito que um dos grandes desafios para avançar em uma mudança na área da Segurança Pública é justamente mudar a forma como ocorre a formação do policial penal e, claro, nossa postura no sistema prisional.</p>',
            placement: "right",
            allowHTML: true,
            animation: "scale",
            trigger: "click",
            touch: true,
            interactive: true,
            delay: [100, 0],
        });

        tippy("#caso_1", {
            content: `<p class="text-2xl"><b>CASO</b>
            <br><br>
            Durante uma consulta psiquiátrica, um privado de liberdade começa a relatar abusos que sofreu 
            na instituição penal. O psiquiatra solicita que o agente de segurança saia da sala 
            para garantir a privacidade, mas o agente se recusa, afirmando que sua presença é 
            obrigatória para evitar riscos, como uma possível agressão ao médico. A consulta é 
            interrompida, e o privado de liberdade se fecha.
            </p>`,
            placement: "right",
            allowHTML: true,
            animation: "scale",
            trigger: "click",
            touch: true,
            interactive: true,
            delay: [100, 0],
        });

        tippy("#caso_2", {
            content: `<p class="text-2xl"><b>CONFLITO</b>
            <br><br>
            A eAPP alega violação da ética médica e do direito do paciente à confidencialidade, enquanto a segurança insiste que sua ausência comprometeria a proteção de todos os envolvidos.
            </p>`,
            placement: "right",
            allowHTML: true,
            animation: "scale",
            trigger: "click",
            touch: true,
            interactive: true,
            delay: [100, 0],
        });

        tippy("#caso_3", {
            content: `<p class="text-2xl"><b>REFLEXÃO</b>
            <br><br>
            Este conflito reflete a tensão estrutural no sistema prisional e requer uma abordagem 
            integrada que supere a dicotomia entre esses campos por meio do estabelecimento 
            de protocolos conjuntos com soluções como avaliações individualizadas de risco e 
            salas adequadas, que garantam a privacidade auditiva, a visibilidade da consulta 
            e o posicionamento estratégico dos agentes. O diálogo interdisciplinar é fundamental e a educação permanente em saúde uma estratégia necessária para construção de confiança entre as equipes de diferentes áreas, na premissa de que o direito à saúde das PPL pode coexistir com práticas de segurança adequadas.
            </p>`,
            placement: "right",
            allowHTML: true,
            animation: "scale",
            trigger: "click",
            touch: true,
            interactive: true,
            delay: [100, 0],
        });

        tippy("#caso2_1", {
            content: `<p class="text-2xl"><b>CASO</b>
            <br><br>
            Uma pessoa privada de liberdade com histórico de transtorno de ansiedade generalizada reiniciou o tratamento recentemente por prescrição médica, com uso diário de psicotrópicos. A eAPP agenda a entrega do medicamento às 8h, mas a equipe de segurança realiza uma revista surpresa na cela nesse horário, bloqueando o acesso da enfermeira no turno da manhã, o que atrasa a administração. A PPL, sem a dose matinal e sentindo-se pressionada pela revista inesperada, entra em crise, tornando-se agressiva e apresentando sintomas de falta de ar e de taquicardia.
            </p>`,
            placement: "right",
            allowHTML: true,
            animation: "scale",
            trigger: "click",
            touch: true,
            interactive: true,
            delay: [100, 0],
        });

        tippy("#caso2_2", {
            content: `<p class="text-2xl"><b>CONFLITO</b>
            <br><br>
            A eAPP afirma que certos procedimentos de segurança não comunicados comprometem o tratamento, enquanto os agentes argumentam que a segurança da instituição penal é prioridade.
            </p>`,
            placement: "right",
            allowHTML: true,
            animation: "scale",
            trigger: "click",
            touch: true,
            interactive: true,
            delay: [100, 0],
        });

        tippy("#caso2_3", {
            content: `<p class="text-2xl"><b>REFLEXÃO</b>
            <br><br>
            O caso evidencia o conflito entre protocolos de segurança e de saúde no sistema prisional. Esta situação demonstra que não se trata apenas de um choque procedimental, mas de um desafio fundamental de integração entre duas missões essenciais: segurança e direito à saúde. A resolução requer fluxos de trabalho integrados que reconheçam a interdependência entre esses campos, incluindo protocolos compartilhados, comunicação intersetorial sistematizada, flexibilidade operacional, capacitação compartilhada e prontuário integrado. Essas estratégias podem transformar a dicotomia em complementaridade, reconhecendo que a medicação adequada reduz riscos de segurança e que um ambiente seguro promove melhores resultados terapêuticos, alinhando-se aos princípios da PNAISP, que preconiza a intersetorialidade e corresponsabilidade entre os sistemas de justiça e saúde.
            </p>`,
            placement: "right",
            allowHTML: true,
            animation: "scale",
            trigger: "click",
            touch: true,
            interactive: true,
            delay: [100, 0],
        });

        tippy("#caso3_1", {
            content: `<p class="text-2xl"><b>CASO</b>
            <br><br>
            Um grupo de privados de liberdade, por decisão da administração da instituição penal, é transferido para outra instituição. Entre eles, está um homem em tratamento para hipertensão (pressão alta). A transferência se deu em um sábado e sem comunicação prévia à eAPP, ocasionando o não envio do prontuário de saúde do privado de liberdade, assim como o não envio das medicações para os próximos dias de tratamento.
            </p>`,
            placement: "right",
            allowHTML: true,
            animation: "scale",
            trigger: "click",
            touch: true,
            interactive: true,
            delay: [100, 0],
        });

        tippy("#caso3_2", {
            content: `<p class="text-2xl"><b>CONFLITO</b>
            <br><br>
            A eAPP preocupa-se com o tempo que vai levar até que esse homem seja atendido na instituição penal para a qual foi transferido, visto que o prontuário e as medicações não o acompanharam nessa transferência.
            </p>`,
            placement: "right",
            allowHTML: true,
            animation: "scale",
            trigger: "click",
            touch: true,
            interactive: true,
            delay: [100, 0],
        });

        tippy("#caso3_3", {
            content: `<p class="text-2xl"><b>REFLEXÃO</b>
            <br><br>
            A transferência do privado de liberdade hipertenso sem comunicação prévia à eAPP representa uma falha crítica na gestão integrada do sistema prisional, evidenciando como decisões administrativas podem comprometer direitos fundamentais e transformar problemas burocráticos em emergências médicas. A resolução desse conflito requer protocolos intersetoriais claros de transferências que estabeleçam procedimentos de notificação obrigatória à eAPP (antes ou após a transferência no primeiro dia útil), de elaboração de resumos clínicos de transferência e de verificação de estoques mínimos de medicamentos essenciais na instituição receptora. Além disso, a implantação de triagem de entrada nas instituições penais mitigaria a preocupação da falta de assistência à saúde em casos como esse. É fundamental também a institucionalização de reuniões periódicas entre as equipes para planejamento conjunto e a capacitação dos agentes sobre a importância da continuidade do tratamento, construindo uma cultura de corresponsabilidade que se alinha aos princípios do SUS e da PNAISP, garantindo que o direito à saúde seja respeitado em todas as etapas da execução penal.
            </p>`,
            placement: "right",
            allowHTML: true,
            animation: "scale",
            trigger: "click",
            touch: true,
            interactive: true,
            delay: [100, 0],
        });

        tippy("#caso4_1", {
            content: `<p class="text-2xl"><b>CASO</b>
            <br><br>
            A equipe de segurança verifica que um homem está passando mal e, de posse de informações recebidas em treinamento específico sobre saúde no sistema prisional, retira-o da cela e o leva para o atendimento em saúde no território. Nessa instituição penal, não há Unidade Básica de Saúde Prisional (UBSP), por isso os atendimentos são feitos no território. Ao chegar com o paciente no posto de saúde, os dois policiais penais percebem que a comunidade não está receptiva. Quando chegam à recepção, é negado o atendimento ao paciente. Segundo a equipe da unidade de saúde do território, ele não reside na área de abrangência e, por isso, não tem direito ao atendimento pretendido.
            </p>`,
            placement: "right",
            allowHTML: true,
            animation: "scale",
            trigger: "click",
            touch: true,
            interactive: true,
            delay: [100, 0],
        });

        tippy("#caso4_2", {
            content: `<p class="text-2xl"><b>CONFLITO</b>
            <br><br>
            Os policiais penais, conhecedores da PNAISP e da rede de atenção em saúde disponibilizada pela gestão de saúde do município para os atendimentos à população privada de liberdade, insistem que o posto de saúde é referência para aquele atendimento, visto que a instituição penal está situada no mesmo bairro da Unidade Básica de Saúde (UBS), e passam a exigir o atendimento ao privado de liberdade.
            </p>`,
            placement: "right",
            allowHTML: true,
            animation: "scale",
            trigger: "click",
            touch: true,
            interactive: true,
            delay: [100, 0],
        });

        tippy("#caso4_3", {
            content: `<p class="text-2xl"><b>REFLEXÃO</b>
            <br><br>
            Fica evidente a tensão entre universalidade e territorialização no SUS quando a uma PPL é negado atendimento em uma UBS do território, apesar da insistência de policiais penais capacitados. Essa situação demonstra simultaneamente um avanço na política de saúde prisional – agentes que reconhecem urgências de saúde – e a fragilidade da rede quando faltam pactuações formais sobre fluxos de atendimento. A resolução requer ações em múltiplos níveis: garantia do atendimento emergencial com base no princípio da universalidade; formalização de pactos intergestores que estabeleçam unidades de referência; educação permanente em saúde para ambas as equipes sobre direitos e necessidades das pessoas privadas de liberdade; e participação das equipes prisionais nas instâncias de gestão do SUS. Esse conflito revela um desafio estrutural que transcende equipes específicas, demandando reconhecimento da saúde prisional como responsabilidade compartilhada entre justiça e saúde, com mecanismos formais de pactuação e fluxos claros que legitimem a população privada de liberdade como usuária do SUS, independentemente de sua condição.
            </p>`,
            placement: "right",
            allowHTML: true,
            animation: "scale",
            trigger: "click",
            touch: true,
            interactive: true,
            delay: [100, 0],
        });

        tippy("#caso5_1", {
            content: `<p class="text-2xl"><b>CASO</b>
            <br><br>
            Jorge tem 42 anos e trabalha como policial penal há 17 anos. Ele atua em uma instituição penal de regime fechado com quadro reduzido de servidores, poucos recursos e em situação de superlotação. Nas últimas semanas, colegas perceberam que Jorge estava mais irritado, isolado e com dificuldades de concentração. Ao ser abordado por um colega, Jorge revelou que tem sofrido de insônia, dores de cabeça frequentes, episódios de ansiedade e pensamentos recorrentes de desistência. Ele sente que está no limite. Relatou também que nunca teve um espaço para falar sobre os efeitos psicológicos do trabalho e que, quando procura ajuda, ouve frases como “isso é frescura” ou “você precisa ser forte”. Além disso, Jorge desconhece os serviços de apoio em saúde mental. A instituição penal em que trabalha nunca ofereceu um plano de ações de promoção da saúde para os servidores. Não há canais estruturados para apoio emocional nem para discussão sobre saúde mental.
            </p>`,
            placement: "right",
            allowHTML: true,
            animation: "scale",
            trigger: "click",
            touch: true,
            interactive: true,
            delay: [100, 0],
        });

        tippy("#caso5_2", {
            content: `<p class="text-2xl"><b>CONFLITO</b>
            <br><br>
            Jorge se vê diante de um dilema silencioso e angustiante: continuar fingindo que está tudo bem para manter a postura de “forte”, o que se espera de quem atua no sistema prisional, ou assumir que precisa de ajuda, enfrentando o medo de ser julgado, rotulado ou até prejudicado profissionalmente. O ambiente ao seu redor normaliza o sofrimento, invisibiliza o desgaste emocional e não oferece suporte. Mesmo ao manifestar sintomas claros de adoecimento, Jorge não encontra acolhimento, apenas reforços culturais que o mandam “aguentar firme”. Sem apoio institucional e com o estigma da saúde mental presente entre colegas, ele começa a se isolar ainda mais, sentindo-se à beira do colapso.
            </p>`,
            placement: "right",
            allowHTML: true,
            animation: "scale",
            trigger: "click",
            touch: true,
            interactive: true,
            delay: [100, 0],
        });

        tippy("#caso5_3", {
            content: `<p class="text-2xl"><b>REFLEXÃO</b>
            <br><br>
            Até onde vai a força de um trabalhador que não tem espaço para sentir, nomear e cuidar do seu sofrimento? O caso de Jorge revela uma realidade comum e preocupante no sistema prisional: a sobrecarga emocional invisível dos trabalhadores. O discurso da força como sinônimo de resistência, quando não vem acompanhado de suporte e acolhimento, pode se transformar em um mecanismo que silencia e adoece. É preciso romper com a lógica do “dar conta de tudo sozinho” e abrir espaço para uma nova cultura institucional, aquela que reconhece que cuidar da saúde mental dos servidores também é um dever coletivo e institucional, não apenas uma responsabilidade individual. O cuidado com quem cuida começa pelo reconhecimento dos riscos psicossociais do trabalho, pela valorização da escuta e pela criação de estratégias concretas de acolhimento e promoção da saúde. Jorge não está sozinho, mas precisa saber e sentir que não está.
            </p>`,
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
        animacao.initCarousels();
        personalizado.TooltipsUnit1();
        personalizado.initMapTooltips();
        animacao.initTabs();
        window.addEventListener("scroll", () => {
            estrutura.eventScroll();
        });
    },
};
