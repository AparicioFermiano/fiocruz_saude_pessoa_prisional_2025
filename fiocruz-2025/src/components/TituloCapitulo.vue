<script setup lang="ts">
import Sumario from '@/components/Sumario.vue'
import type { Capitulo, Progresso } from '@/utils/Capitulos'

defineProps<{
    capitulo?: number;
    titulo: string;
    color: string
}>()

</script>

<template>
    <div class="w-full max-w-[800px] mx-auto flex flex-col gap-5 px-5 pb-10">
        <p class="font-sans-serif text-sm">{{ 'Lesson ' + capitulo + ' of 6' }}</p>
        <h1 class="text-5xl font-bold">{{ titulo }}</h1>
        <div :class="`w-[20%] border-3 border-[var(${color})]`"></div>
    </div>
    <hr :class="`border-2 border-[var(${color})] sticky top-0 z-50 bg-white`">
</template>
