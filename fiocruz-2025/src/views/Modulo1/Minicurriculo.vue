<script setup lang="ts">
import TemplateModulo1 from '@/template/TemplateModulo1.vue';
import TituloCapitulo from '@/components/TituloCapitulo.vue';
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { saveChapterProgress, useProgressoStore, clearAllProgress } from '@/utils/progressService'

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
    console.log(novoValor)
    await saveChapterProgress(moduloAtual, capituloAtual, { progressPercent: novoValor })
})
</script>

<template>
    <TemplateModulo1>
        <template v-slot:conteudo-site>
            <TituloCapitulo :capitulo="1" color="--modulo1-main" titulo="Minicurrículo do Autor" />
            <div class="w-full max-w-[1100px] mx-auto px-2 py-10">
                <div class="flex">
                    <p class="p-3">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Autem similique praesentium
                        incidunt
                        laborum numquam qui maxime dolores, nulla explicabo maiores eaque quidem ab nobis commodi
                        consectetur nihil, iure quibusdam fuga!</p>
                    <p class="p-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae sed eos
                        dignissimos, aliquam
                        perspiciatis, temporibus ipsam modi aperiam officia ad, necessitatibus neque delectus accusamus
                        harum eum inventore dolore iure earum!</p>
                </div>
                <div class="flex">
                    <p class="p-3">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Autem similique praesentium
                        incidunt
                        laborum numquam qui maxime dolores, nulla explicabo maiores eaque quidem ab nobis commodi
                        consectetur nihil, iure quibusdam fuga!</p>
                    <p class="p-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae sed eos
                        dignissimos, aliquam
                        perspiciatis, temporibus ipsam modi aperiam officia ad, necessitatibus neque delectus accusamus
                        harum eum inventore dolore iure earum!</p>
                </div>
                <div class="flex">
                    <p class="p-3">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Autem similique praesentium
                        incidunt
                        laborum numquam qui maxime dolores, nulla explicabo maiores eaque quidem ab nobis commodi
                        consectetur nihil, iure quibusdam fuga!</p>
                    <p class="p-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae sed eos
                        dignissimos, aliquam
                        perspiciatis, temporibus ipsam modi aperiam officia ad, necessitatibus neque delectus accusamus
                        harum eum inventore dolore iure earum!</p>
                </div>
                <div class="flex">
                    <p class="p-3">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Autem similique praesentium
                        incidunt
                        laborum numquam qui maxime dolores, nulla explicabo maiores eaque quidem ab nobis commodi
                        consectetur nihil, iure quibusdam fuga!</p>
                    <p class="p-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae sed eos
                        dignissimos, aliquam
                        perspiciatis, temporibus ipsam modi aperiam officia ad, necessitatibus neque delectus accusamus
                        harum eum inventore dolore iure earum!</p>
                </div>
                <div class="flex">
                    <p class="p-3">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Autem similique praesentium
                        incidunt
                        laborum numquam qui maxime dolores, nulla explicabo maiores eaque quidem ab nobis commodi
                        consectetur nihil, iure quibusdam fuga!</p>
                    <p class="p-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae sed eos
                        dignissimos, aliquam
                        perspiciatis, temporibus ipsam modi aperiam officia ad, necessitatibus neque delectus accusamus
                        harum eum inventore dolore iure earum!</p>
                </div>
                <div class="flex">
                    <p class="p-3">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Autem similique praesentium
                        incidunt
                        laborum numquam qui maxime dolores, nulla explicabo maiores eaque quidem ab nobis commodi
                        consectetur nihil, iure quibusdam fuga!</p>
                    <p class="p-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae sed eos
                        dignissimos, aliquam
                        perspiciatis, temporibus ipsam modi aperiam officia ad, necessitatibus neque delectus accusamus
                        harum eum inventore dolore iure earum!</p>
                </div>
                <div class="flex">
                    <p class="p-3">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Autem similique praesentium
                        incidunt
                        laborum numquam qui maxime dolores, nulla explicabo maiores eaque quidem ab nobis commodi
                        consectetur nihil, iure quibusdam fuga!</p>
                    <p class="p-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae sed eos
                        dignissimos, aliquam
                        perspiciatis, temporibus ipsam modi aperiam officia ad, necessitatibus neque delectus accusamus
                        harum eum inventore dolore iure earum!</p>
                </div>
                <div class="flex">
                    <p class="p-3">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Autem similique praesentium
                        incidunt
                        laborum numquam qui maxime dolores, nulla explicabo maiores eaque quidem ab nobis commodi
                        consectetur nihil, iure quibusdam fuga!</p>
                    <p class="p-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae sed eos
                        dignissimos, aliquam
                        perspiciatis, temporibus ipsam modi aperiam officia ad, necessitatibus neque delectus accusamus
                        harum eum inventore dolore iure earum!</p>
                </div>
                <div class="flex">
                    <p class="p-3">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Autem similique praesentium
                        incidunt
                        laborum numquam qui maxime dolores, nulla explicabo maiores eaque quidem ab nobis commodi
                        consectetur nihil, iure quibusdam fuga!</p>
                    <p class="p-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae sed eos
                        dignissimos, aliquam
                        perspiciatis, temporibus ipsam modi aperiam officia ad, necessitatibus neque delectus accusamus
                        harum eum inventore dolore iure earum!</p>
                </div>
                <div class="flex">
                    <p class="p-3">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Autem similique praesentium
                        incidunt
                        laborum numquam qui maxime dolores, nulla explicabo maiores eaque quidem ab nobis commodi
                        consectetur nihil, iure quibusdam fuga!</p>
                    <p class="p-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae sed eos
                        dignissimos, aliquam
                        perspiciatis, temporibus ipsam modi aperiam officia ad, necessitatibus neque delectus accusamus
                        harum eum inventore dolore iure earum!</p>
                </div>
            </div>
        </template>
    </TemplateModulo1>
</template>

<style></style>
