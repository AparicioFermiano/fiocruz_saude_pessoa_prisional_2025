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
                <TituloCapitulo :capitulo="6" color="--modulo1-main" titulo="Referências" />
                <div class="w-full max-w-[800px] mx-auto px-2 py-10 flex flex-col gap-7 text-lg leading-8 font-serif">
                    <p>
                        BARBOSA, A. C. As penitenciárias de segurança máxima. Jusbrasil, 3 out. 2022. Disponível em: <a
                            class="underline text-orange-500"
                            href="https://www.jusbrasil.com.br/artigos/as-penitenciarias-de-seguranca-maxima/1652257134"
                            target="_blank">https://www.jusbrasil.com.br/artigos/as-penitenciarias-de-seguranca-maxima/1652257134</a>.
                        Acesso em: 15 jul. 2025.
                    </p>
                    <p>
                        BRASIL. Secretaria Nacional de Políticas Penais. SISDEPEN. Levantamento de Informações
                        Penitenciárias. 2025a. Disponível em: <a class="underline text-orange-500"
                            href="https://www.gov.br/depen/pt-br/servicos/sisdepen"
                            target="_blank">https://www.gov.br/depen/pt-br/servicos/sisdepen</a>. Acesso em: 6 abr.
                        2025.
                    </p>
                    <p>
                        BRASIL. Secretaria Nacional de Políticas Penais. Penitenciárias Federais. <a
                            class="underline text-orange-500" href="gov.br" target="_blank">gov.br</a>, 2 jun. 2025b.
                        Disponível em: <a href="https://www.gov.br/senappen/pt-br/composicao/penitenciarias-federais"
                            target="_blank"
                            class="underline text-orange-500">https://www.gov.br/senappen/pt-br/composicao/penitenciarias-federais</a>
                        Acesso em: 4 set. 2025.
                    </p>
                    <p>
                        BRASIL. Conselho Nacional de Política Criminal e Penitenciária. Resolução nº 16, de 10 de junho
                        de 2021. Estabelece medidas de eliminação de tomadas e pontos de energia do interior e das
                        proximidades das celas nos estabelecimentos penais. Diário Oficial da União, Brasília, DF, 23
                        jun. 2021. Disponível em:
                        <a class="underline text-orange-500"
                            href="https://www.gov.br/senappen/pt-br/composicao/cnpcp/resolucoes/resolucoes-2021/resolucao-no-16-de-10-de-junho-de-2021.pdf/view"
                            target="_blank">https://www.gov.br/senappen/pt-br/composicao/cnpcp/resolucoes/resolucoes-2021/resolucao-no-16-de-10-de-junho-de-2021.pdf/view</a>.
                        Acesso em: 27 ago. 2025.
                    </p>
                    <p>
                        BRASIL. Lei nº 11.343, de 23 de agosto de 2006. Institui o Sistema Nacional de Políticas
                        Públicas sobre Drogas - Sisnad; prescreve medidas para prevenção do uso indevido, atenção e
                        reinserção social de usuários e dependentes de drogas; estabelece normas para repressão à
                        produção não autorizada e ao tráfico ilícito de drogas; define crimes e dá outras providências.
                        Diário Oficial da União, Brasília, DF, 24 ago. 2006. Disponível em:
                        <a class="underline text-orange-500"
                            href="https://www.planalto.gov.br/ccivil_03/_ato2004-2006/2006/lei/l11343.htm"
                            target="_blank"></a>
                        Acesso em: 17 jul. 2025.
                    </p>
                </div>

                <a href="" class="w-full">
                    <div class="group bg-gray-300 hover:bg-gray-400 p-5">
                        <p class="text-center font-bold group-hover:underline">Lesson 4 - Encerramento da Unidade</p>
                        <div class="flex justify-center">
                            <font-awesome-icon :icon="faChevronDown" />
                        </div>
                    </div>
                </a>
            </div>
        </template>
    </TemplateModulo1>
</template>

<style></style>
