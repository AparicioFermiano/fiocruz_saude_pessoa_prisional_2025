<script setup lang="ts">
import { computed, toRefs } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faBarsStaggered, faCheck } from '@fortawesome/free-solid-svg-icons';
import type { Capitulo, Progresso } from '@/utils/Capitulos'
import { useRoute } from 'vue-router'
import { useProgressoStore } from '@/utils/progressService'
import { storeToRefs } from 'pinia'

const route = useRoute()
const url = route.path.split('/').filter(Boolean).pop()

const props = defineProps<{
    color: string;
    capitulos?: Capitulo[];
    progresso?: Progresso[];
    sidebar?: boolean;
    modulo: number
}>()

const progressoStore = useProgressoStore()
const { progresso } = storeToRefs(progressoStore)
const { capitulos } = toRefs(props)

const capitulosWithProgress = computed(() =>
    (capitulos.value ?? []).map(cap => {
        const chapterProgress = progresso.value[cap.id] ?? 0
        return {
            ...cap,
            progressPercent: chapterProgress,
            completed: chapterProgress === 100,
            empty: chapterProgress === 0
        }
    })
)
</script>

<template>
    <div class="flex flex-col my-10">
        <a v-for="(cap, index) in capitulosWithProgress" :key="index" :href="`/modulo${modulo}/${cap.url}`"
            class="group flex gap-2 justify-between items-center  transition-colors duration-200 cursor-pointer"
            :class="[sidebar ? 'p-5' : 'px-3 py-5', cap.url === url ? 'bg-gray-200' : 'hover:bg-gray-200']">
            <div class="flex gap-3 items-center">
                <font-awesome-icon class="text-gray-400  transition-colors duration-200"
                    :class="!sidebar ? 'group-hover:text-black' : ''" :icon="faBarsStaggered" />
                <p class="text-sm font-bold my-auto">{{ cap.title }}</p>
            </div>
            <div class="min-w-5">
                <div v-if="cap.completed" v-tooltip="'Completado'"
                    class="bg-[var(--modulo1-main)] border-3 border-[var(--modulo1-main)] w-5 h-5 flex items-center justify-center rounded-full">
                    <font-awesome-icon class="text-black text-[10px]" :icon="faCheck" />
                </div>

                <div v-else-if="cap.empty" v-tooltip="'Não começado'"
                    class="w-5 h-5 flex border-3 border-gray-300 items-center justify-center rounded-full" />

                <div v-else v-tooltip="cap.progressPercent + '% Completado'"
                    class="w-5 h-5 rounded-full flex items-center justify-center relative" :style="{
                        background: `conic-gradient(var(--modulo1-main) ${cap.progressPercent}%, #d1d5db ${cap.progressPercent}%)`
                    }">
                    <div class="w-[14px] h-[14px] transition-colors duration-200 rounded-full flex items-center justify-center"
                        :class="cap.url === url ? 'bg-gray-200' : 'bg-white group-hover:bg-gray-200'" />
                </div>
            </div>
        </a>
    </div>
</template>
