<script setup lang="ts">

defineProps<{
    bgColor: string;
    titulo: string;
    imgbanner: string;
    redirect: string;
    alt: string;
    progress: boolean;
}>()

</script>

<template>
    <div class="w-full flex flex-wrap">
        <div :class="`w-full lg:w-1/2 bg-[var(${bgColor})]`">
            <div class="mx-auto flex flex-col justify-center h-full max-w-[500px]">
                <h1 class="text-6xl font-black leading-15">{{ titulo }}</h1>
                <div class="py-5">
                    <a :href="redirect" class="btn">{{ progress ? 'CONTINUAR!' : 'COMEÇAR' }}</a>
                </div>
            </div>
        </div>
        <div class="w-full lg:w-1/2">
            <img class="w-full h-auto object-contain" :src="imgbanner" :alt="alt">
        </div>
    </div>
</template>
