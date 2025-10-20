<script setup lang="ts">
import TemplateModulo1 from '@/template/TemplateModulo1.vue';
import TituloCapitulo from '@/components/TituloCapitulo.vue';
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { saveChapterProgress, useProgressoStore, clearAllProgress } from '@/utils/progressService'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'

const progressoStore = useProgressoStore()

const moduloAtual = 1
const capituloAtual = 1

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
                <TituloCapitulo :capitulo="1" color="--modulo1-main" titulo="Minicurrículo do Autor" />
                <div class="w-full max-w-[1100px] mx-auto px-2 py-10">
                    <div class="flex flex-wrap">
                        <div class="w-full md:w-1/2 p-5">
                            <img src="/public/Marianna.jpg" alt="Marianna do Prado Sampaio">
                            <div class="px-3">
                                <p class="font-bold py-2">Marianna do Prado Sampaio</p>
                                <hr>
                            </div>
                        </div>
                        <div class="w-full md:w-1/2 p-5">
                            <p class="text-lg font-sans-serif leading-10">Graduada em Terapia Ocupacional pela
                                Universidade
                                de Brasília
                                e Especialista em Saúde Coletiva pela Escola Superior de Ciências da Saúde do Distrito
                                Federal. Já atuou como
                                Terapeuta Ocupacional na Organização Social Santa Marcelina, em São Paulo, como gerente
                                na
                                Gerência de qualidade da Atenção Primária à Saúde e na Gerência de Atenção à Saúde de
                                Populações em Situação Vulnerável e Programas Especiais da Secretaria de Estado de Saúde
                                do
                                Distrito Federal. Atuou como consultora no Ministério da Saúde na Coordenação-Geral de
                                Programação do Financiamento da Atenção Primária à Saúde e como assessora técnica de
                                saúde
                                prisional na Coordenação de Acesso e Equidade da Secretaria de Atenção Primária. Também
                                atuou como Apoiadora regional do Projeto Implementação e Fortalecimento do Apoio
                                Matricial
                                em Saúde Mental na Atenção Primária à Saúde do Distrito Federal.</p>
                        </div>
                    </div>
                </div>

                <a href="" class="w-full">
                    <div class="group bg-gray-300 hover:bg-gray-400 p-5">
                        <p class="text-center font-bold group-hover:underline">Lesson 2 - Apresentação da Unidade</p>
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
