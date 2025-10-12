<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { useProgress } from '@/utils/useProgress'
import { getChaptersByModule } from '@/utils/progressService'
import Sidebar from '@/components/Sidebar.vue'
import { capitulosM1 } from '@/utils/Capitulos'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

const { course, loadAll } = useProgress()

const capitulo1Chapters = ref()

defineSlots<{
    'conteudo-site': () => any;
}>();

const modulo1 = computed(() =>
    course.modules.find(m => m.module === 1) ?? {
        module: 1,
        percent: 0,
        inProgress: false,
        chapters: []
    }
)

onMounted(async () => {
    await loadAll()
    capitulo1Chapters.value = await getChaptersByModule(1)
})

</script>

<template>
    <main class="w-full flex">
        <Sidebar :modulo=1 color="--modulo1-main" titulo="Módulo 1 - Unidade 1" :progressoMod="modulo1?.percent ?? 0"
            :capitulos="capitulosM1" :progressoCap="capitulo1Chapters"></Sidebar>
        <div class="w-full shadow-[-3px_0_10px_rgba(0,0,0,0.2)]">
            <div class="p-5">
                <button class="cursor-pointer">
                    <font-awesome-icon :icon="faBars" />
                </button>
            </div>
            <slot name="conteudo-site" />
        </div>
    </main>
</template>

<style></style>
