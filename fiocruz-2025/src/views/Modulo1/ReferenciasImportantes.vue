<script setup lang="ts">
import TemplateModulo1 from '@/template/TemplateModulo1.vue';
import TituloCapitulo from '@/components/TituloCapitulo.vue';
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { saveChapterProgress, useProgressoStore, clearAllProgress } from '@/utils/progressService'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'

const progressoStore = useProgressoStore()

const moduloAtual = 1
const capituloAtual = 3

const progressoCapitulo = ref(0)

function atualizarProgresso() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop
    const scrollHeight = document.documentElement.scrollHeight
    const clientHeight = window.innerHeight

    const progressoBruto = (scrollTop / (scrollHeight - clientHeight)) * 100
    const progressoLimitado = Math.min(100, Math.max(0, progressoBruto))
    const progresso = Math.round(progressoLimitado / 5) * 5

    if (progresso > progressoCapitulo.value) {
        progressoCapitulo.value = progresso
        progressoStore.setProgresso(`m${moduloAtual}-c${capituloAtual}`, progresso)
    }
}

onMounted(async () => {
    await progressoStore.carregarDoCache()
    window.addEventListener('scroll', atualizarProgresso)
})

onUnmounted(() => {
    window.removeEventListener('scroll', atualizarProgresso)
})

watch(progressoCapitulo, async (novoValor) => {
    await saveChapterProgress(moduloAtual, capituloAtual, { progressPercent: novoValor })
})
</script>

<template>
    <TemplateModulo1>
        <template v-slot:conteudo-site>
            <div class="flex flex-col justify-between">
                <TituloCapitulo :capitulo="5" color="--modulo1-main" titulo="Referências importantes" />
                <div class="w-full max-w-[800px] mx-auto px-5 py-10 flex flex-col gap-7 text-lg leading-8 font-serif">
                    <p>
                        BRASIL. Secretaria Nacional de Políticas Penais. SISDEPEN. Levantamento de Informações
                        Penitenciárias. 2025a. Disponível em: <a class="underline text-orange-500"
                            href="https://www.gov.br/depen/pt-br/servicos/sisdepen"
                            target="_blank">https://www.gov.br/depen/pt-br/servicos/sisdepen</a>. Acesso em: 6 abr.
                        2025.
                    </p>
                    <p>
                        BRASIL. Lei nº 7.210, de 11 de julho de 1984. Lei de Execução Penal. Diário Oficial da União,
                        Brasília, DF, 13 jul. 1984. Disponível em: <a class="underline text-orange-500"
                            href="http://www.planalto.gov.br/ccivil_03/leis/l7210.htm"
                            target="_blank">http://www.planalto.gov.br/ccivil_03/leis/l7210.htm</a>. Acesso em: 15 jul.
                        2025.
                    </p>
                    <p>
                        BRASIL. Decreto-Lei nº 2.848, de 7 de dezembro de 1940. Código Penal. Diário Oficial da União,
                        Rio de Janeiro, RJ, 31 dez. 1940. Disponível em: <a class="underline text-orange-500"
                            href="https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm"
                            target="_blank">https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm</a>.
                        cesso em: 15 jul. 2025.
                    </p>
                    <p>
                        MURARO, M. Sistema penitenciário e execução penal. Curitiba: InterSaberes, 2017.
                    </p>
                </div>

                <a href="" class="w-full">
                    <div class="group bg-gray-300 hover:bg-gray-400 p-5">
                        <p class="text-center font-bold group-hover:underline">Lesson 6 - Referências</p>
                        <div class="flex justify-center">
                            <font-awesome-icon :icon="faChevronDown" />
                        </div>
                    </div>
                </a>
            </div>
        </template>
    </TemplateModulo1>
</template>
