<script setup lang="ts">
import { onMounted, computed } from 'vue'
import HeaderCapa from '@/components/HeaderCapa.vue'
import { useProgress } from '@/utils/useProgress'

const { course, loadAll, saveChapter } = useProgress()

onMounted(async () => {
    await loadAll()
    console.log(modulo1.value)
})

const modulo1 = computed(() =>
    course.modules.find(m => m.module === 1) ?? {
        module: 1,
        percent: 0,
        inProgress: false,
        chapters: []
    }
)

</script>

<template>
    <HeaderCapa bgColor="--modulo1-main" titulo="Módulo 1 - Unidade 1" imgbanner="/src/assets/20_wfh.jpg" redirect=""
        :progress="modulo1?.inProgress ?? false" alt=""></HeaderCapa>
    <div class="w-full max-w-[700px] mx-auto py-10">
        <h2 class="title">Módulo I - Política Nacional de Atenção Integral à Saúde das Pessoas Privadas de Liberdade no
            Sistema
            Prisional
        </h2>
    </div>
</template>

<style></style>
