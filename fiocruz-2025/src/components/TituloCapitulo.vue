<script setup lang="ts">
import Sumario from '@/components/Sumario.vue'
import type { Capitulo, Progresso } from '@/utils/Capitulos'

defineProps<{
    capitulo: number;
    titulo: string;
    progressoMod: number;
    progressoCap?: Progresso[];
    modulo: number
}>()

</script>

<template>

</template>
