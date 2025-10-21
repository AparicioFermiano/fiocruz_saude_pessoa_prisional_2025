<script setup lang="ts">
import TemplateModulo1 from '@/template/TemplateModulo1.vue';
import TituloCapitulo from '@/components/TituloCapitulo.vue';
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { saveChapterProgress, useProgressoStore, clearAllProgress } from '@/utils/progressService'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'

const progressoStore = useProgressoStore()

const moduloAtual = 1
const capituloAtual = 2

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
                <TituloCapitulo :capitulo="2" color="--modulo1-main" titulo="Apresentação da Unidade" />
                <div class="w-full max-w-[800px] mx-auto px-2 py-10 flex flex-col gap-7 text-xl leading-8">
                    <div class="flex flex-col gap-3">
                        <h2 class="text-2xl md:text-3xl font-bold">Apresentação da Unidade</h2>
                        <h3>Olá, estudante-trabalhador! Seja bem-vindo!</h3>
                    </div>
                    <p>Nesta Unidade, vamos apresentar como se estruturam os sistemas prisionais no Brasil e no mundo.
                        Iniciaremos com um breve panorama histórico do surgimento das instituições penais modernas.</p>
                    <p>Em seguida, abordaremos os diferentes modelos de organização prisional adotados em outros países
                        e exploraremos como o sistema prisional brasileiro está organizado em termos de estrutura,
                        filosofia e objetivos, destacando os tipos de pena existentes, os regimes de cumprimento e as
                        principais características da população privada de liberdade brasileira.</p>
                    <p>Apresentaremos como se dá a gestão do sistema, os diferentes tipos de estabelecimento penal
                        existentes, além de aspectos relacionados à estrutura física (como os projetos arquitetônicos e
                        padrões de segurança), à estrutura jurídica voltada às pessoas privadas de liberdade e às
                        classificações adotadas para os estabelecimentos penais brasileiros.</p>
                    <p>Por fim, discutiremos o direito à saúde nas instituições penais e os desafios enfrentados pelo
                        sistema prisional e apresentaremos uma experiência exitosa brasileira, que oferece caminhos
                        possíveis para a efetivação do acesso à saúde no sistema prisional.</p>
                    <h2 class="text-2xl md:text-3xl font-bold">Objetivos de Aprendizagem da Unidade</h2>
                    <ol class="list-decimal space-y-5 pl-10">
                        <li>
                            <p>Conhecer os principais modelos de organização prisional no mundo;</p>
                        </li>
                        <li>
                            <p>Conhecer a história do sistema prisional no Brasil;</p>
                        </li>
                        <li>
                            <p>Especificar o modelo adotado em território brasileiro;</p>
                        </li>
                        <li>
                            <p>Identificar os tipos de estabelecimento penal os tipos de gestão adotados e as estruturas
                                físicas e jurídicas voltadas às pessoas privadas de liberdade;</p>
                        </li>
                        <li>
                            <p>Apontar as características da população privada de liberdade brasileira;</p>
                        </li>
                        <li>
                            <p>Reconhecer a importância da garantia do direito à saúde dessa população.</p>
                        </li>
                    </ol>
                    <p class="font-bold text-xl md:text-2xl py-10 md:py-20">Carga Horária de Estudo: 5 horas</p>
                </div>

                <a href="" class="w-full">
                    <div class="group bg-gray-300 hover:bg-gray-400 p-5">
                        <p class="text-center font-bold group-hover:underline">Lesson 3 - Unidade 1 - Estrutura e
                            Sistema Prisional</p>
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
