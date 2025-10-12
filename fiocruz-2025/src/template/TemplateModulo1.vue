<script setup lang="ts">
import { onMounted, computed, ref } from 'vue'
import HeaderCapa from '@/components/HeaderCapa.vue'
import Sumario from '@/components/Sumario.vue'
import { useProgress } from '@/utils/useProgress'
import { getChaptersByModule } from '@/utils/progressService'
import { capitulosM1 } from '@/utils/Capitulos'

const { course, loadAll, saveChapter } = useProgress()

const capitulo1Chapters = ref()

onMounted(async () => {
    await loadAll()
    capitulo1Chapters.value = await getChaptersByModule(1)
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

    <div class="w-full max-w-[700px] mx-auto py-10 px-5">
        <h2 class="title">Módulo I - Política Nacional de Atenção Integral à Saúde das Pessoas Privadas de Liberdade no
            Sistema
            Prisional
        </h2>
        <Sumario :sidebar="true" color="--modulo1-main" :capitulos="capitulosM1" :progresso="capitulo1Chapters">
        </Sumario>
    </div>
</template>

<style></style>
