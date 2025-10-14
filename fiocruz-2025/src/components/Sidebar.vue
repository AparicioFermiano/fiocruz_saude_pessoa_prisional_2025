<script setup lang="ts">

import Sumario from '@/components/Sumario.vue'
import type { Capitulo, Progresso } from '@/utils/Capitulos'
import { sidebarOpen } from '@/utils/sidebar'

defineProps<{
    color: string;
    titulo: string;
    progressoMod: number;
    capitulos?: Capitulo[];
    progressoCap?: Progresso[];
    modulo: number
}>()

</script>

<template>
    <div class="fixed top-0 left-0 h-full w-[280px] bg-white shadow-lg transition-transform duration-500"
        :class="sidebarOpen ? 'translate-x-0' : '-translate-x-full'">
        <div :class="`bg-[var(${color})] p-5 h-[175px] flex flex-col justify-between`">
            <h1 class="text-3xl font-black">{{ titulo }}</h1>
            <div>
                <div class="w-full h-[3px] bg-[rgba(0,0,0,0.3)]">
                    <div class="h-full bg-black transition-all duration-500" :style="{ width: progressoMod + '%' }">
                    </div>
                </div>
                <small class="font-bold text-xs">{{ progressoMod + '% COMPLETADOS' }}</small>
            </div>
        </div>
        <div class="bg-white">
            <Sumario :modulo="modulo" :sidebar="true" :color="color" :capitulos="capitulos" :progresso="progressoCap" />
        </div>
    </div>
</template>
