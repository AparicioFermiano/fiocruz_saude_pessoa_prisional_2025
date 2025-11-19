// function toggleSidebar(elemento, menu) {
//     const menuToggle = document.getElementById(elemento);
//     const menu = document.getElementById(menu);

//     menu.classList.toggle("hidden");
// }


window.addEventListener('scroll', () => {
    if (window.scrollY > 200) {
        scrollTopBtn.classList.remove('hidden');
        scrollTopBtn.classList.add('flex');
    } else {
        scrollTopBtn.classList.add('hidden');
        scrollTopBtn.classList.remove('flex');
    }
});


function toggleCard(elemento, card) {
    const conteudo = document.getElementById(card)
    const flipped = conteudo.classList.toggle('is-flipped');
    elemento.setAttribute('aria-pressed', flipped ? 'true' : 'false');
}

function toggleAccordion(elemento, grupo) {
    const accordion = document.getElementById(grupo);
    const header = document.getElementById(elemento);
    const content = header.nextElementSibling;
            const icon = header.querySelector("svg");

            accordion.querySelectorAll(".accordion-content").forEach(c => {
              if (c !== content) c.classList.remove("open");
            });
            accordion.querySelectorAll(".accordion-header svg").forEach(i => {
              if (i !== icon) i.classList.remove("rotate-180");
            });

            content.classList.toggle("open");
            icon.classList.toggle("rotate-180");
}

function toggleZoom(id) {
      const img = document.getElementById(id);
      img.classList.toggle('zoomed');
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

function initMapTooltips() {
    tippy('#tooltip_1', {
        content: '<p class="text-2xl"><b>Estados Unidos</b></p><p> 1,8 milhão</p>',
        placement: 'right',
        allowHTML: true,
        animation: 'scale',
        touch: ['hold', 500],
        trigger: 'mouseenter focus click',
        interactive: true,
        delay: [100, 0]
    });

    tippy('#tooltip_2', {
        content: '<p class="text-2xl"><b>Brasil</b></p><p>mais de 909 mil</p>',
        placement: 'left',
        allowHTML: true,
        animation: 'scale',
        touch: ['hold', 500],
        trigger: 'mouseenter focus click',
        interactive: true,
        delay: [100, 0]
    });

    tippy('#tooltip_3', {
        content: '<p class="text-2xl"><b>Rússia</b></p><p>433 mil</p>',
        placement: 'left',
        allowHTML: true,
        animation: 'scale',
        touch: ['hold', 500],
        trigger: 'mouseenter focus click',
        interactive: true,
        delay: [100, 0]
    });

    tippy('#tooltip_4', {
        content: '<p class="text-2xl"><b>China</b></p><p>1,6 milhão</p>',
        placement: 'left',
        allowHTML: true,
        animation: 'scale',
        touch: ['hold', 500],
        trigger: 'mouseenter focus click',
        interactive: true,
        delay: [100, 0]
    });

    tippy('#tooltip_5', {
        content: '<p class="text-2xl"><b>Índia</b></p><p>573 mil</p>',
        placement: 'left',
        allowHTML: true,
        animation: 'scale',
        touch: ['hold', 500],
        trigger: 'mouseenter focus click',
        interactive: true,
        delay: [100, 0]
    });
}

// --- 1. Mapeamento de Elementos e Configurações ---
document.addEventListener('DOMContentLoaded', () => {
    const termosLista = document.getElementById('termos-lista');
    const dropzones = document.querySelectorAll('.dropzone');
    const feedbackDiv = document.getElementById('feedback-final');

    // Nomes dos grupos das definições (IDs das dropzones)
    const definicoesIds = ['def-gene', 'def-celula', 'def-genoma'];

    // --- 2. Configuração do SortableJS ---

    // A. Configuração da Lista de Termos (Fonte dos Itens)
    new Sortable(termosLista, {
        group: {
            name: 'shared',
            put: false // Não pode receber itens de volta (somente arrastar para fora)
        },
        animation: 150,
        ghostClass: 'ghost',
        onEnd: function (evt) {
            // Garante que o item permaneça invisível na lista original se solto em um dropzone
            if (evt.to.classList.contains('dropzone')) {
                evt.item.style.display = 'none'; // Esconde o item na lista original após soltar
            }
        }
    });

    // B. Configuração de Cada Dropzone (Destino dos Itens)
    dropzones.forEach(dropzone => {
        new Sortable(dropzone, {
            group: {
                name: 'shared',
                pull: 'clone', // O item pode ser arrastado de volta para outra dropzone ou para a lista original
                put: true // Pode receber itens
            },
            animation: 150,
            ghostClass: 'ghost',
            filter: '.termo-item', // Apenas permite mover 'termo-item'
            
            // Função para limitar o dropzone a apenas 1 item
            onMove: function (evt) {
                // Se a dropzone de destino já tiver um item, bloqueia o movimento
                return evt.to.children.length < 1;
            },
            onAdd: function (evt) {
                // Remove quaisquer itens excedentes se houver alguma falha no onMove
                if (evt.to.children.length > 1) {
                    evt.to.removeChild(evt.to.children[0]);
                }
            }
        });
    });

    // --- 3. Função de Validação ---
    window.verificarRespostas = function() {
        let acertos = 0;
        const totalQuestoes = definicoesIds.length;

        // Limpa o feedback visual anterior
        document.querySelectorAll('.dropzone-container').forEach(container => {
            container.classList.remove('bg-green-100', 'bg-red-100');
        });
        feedbackDiv.className = 'mt-6 p-4 text-center rounded-lg font-semibold text-lg';
        feedbackDiv.textContent = '';


        definicoesIds.forEach(id => {
            const container = document.getElementById(id).closest('.dropzone-container');
            const dropzone = document.getElementById(id);
            
            // Obtém o item solto (deve haver apenas 1)
            const itemSolto = dropzone.querySelector('.termo-item');
            
            // O data-id do container define o termo CORRETO
            const idCorreto = container.getAttribute('data-id'); 

            if (itemSolto) {
                // O data-match do item arrastável define seu valor
                const valorItem = itemSolto.getAttribute('data-match'); 

                if (valorItem === idCorreto) {
                    acertos++;
                    container.classList.add('bg-green-100');
                    itemSolto.classList.add('bg-green-500');
                } else {
                    container.classList.add('bg-red-100');
                    itemSolto.classList.add('bg-red-500');
                }
            } else {
                 // Tratar o caso de dropzone vazio
                 container.classList.add('bg-yellow-100');
            }
        });

        // Exibe o resultado final
        if (acertos === totalQuestoes) {
            feedbackDiv.textContent = `Parabéns! Você acertou todas as ${totalQuestoes} questões!`;
            feedbackDiv.classList.add('bg-green-200', 'text-green-800');
        } else {
            feedbackDiv.textContent = `Você acertou ${acertos} de ${totalQuestoes}. Revise suas respostas.`;
            feedbackDiv.classList.add('bg-red-200', 'text-red-800');
        }
    }
});