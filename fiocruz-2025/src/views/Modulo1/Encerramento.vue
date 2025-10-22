<script setup lang="ts">
import TemplateModulo1 from '@/template/TemplateModulo1.vue';
import TituloCapitulo from '@/components/TituloCapitulo.vue';
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { saveChapterProgress, useProgressoStore, clearAllProgress } from '@/utils/progressService'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'

const progressoStore = useProgressoStore()

const moduloAtual = 1
const capituloAtual = 4

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
                <TituloCapitulo :capitulo="capituloAtual" color="--modulo1-main" titulo="Encerramento da Unidade" />
                <div class="w-full max-w-[800px] mx-auto px-2 py-10 flex flex-col gap-7 text-xl leading-10 font-serif">
                    <p>
                        Finalizamos esta Unidade. Ao longo do conteúdo apresentado, você viu que entender o sistema prisional vai além de conhecer as normas e estruturas. A reflexão sobre a história do aprisionamento, os modelos internacionais e as especificidades do sistema brasileiro é fundamental para compreender como o sistema prisional evoluiu com o passar do tempo.
                    </p>
                    <p>
                        Ao explorar questões como segurança, saúde e desafios enfrentados, reforçamos que o cuidado e o respeito à dignidade são essenciais e devem ser mantidos mesmo no sistema prisional.
                    </p>
                    <p>
                        Esperamos que este conteúdo te inspire a enxergar não apenas funções técnicas, mas oportunidades reais de fazer a diferença na vida de pessoas que, muitas vezes, foram invisibilizadas.
                    </p>
                </div>

                <a href="" class="w-full">
                    <div class="group bg-gray-300 hover:bg-gray-400 p-5">
                        <p class="text-center font-bold group-hover:underline">Lesson 5 - Referências importantes</p>
                        <div class="flex justify-center">
                            <font-awesome-icon :icon="faChevronDown" />
                        </div>
                    </div>
                </a>
            </div>
        </template>
    </TemplateModulo1>
</template>
