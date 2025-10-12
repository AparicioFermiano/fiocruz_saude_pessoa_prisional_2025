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
    <div class="hidden lg:flex w-full flex-wrap">
        <div :class="`w-full lg:w-1/2 bg-[var(${bgColor})]`">
            <div class="mx-auto flex flex-col justify-center h-full max-w-[500px]">
                <h1 class="text-6xl font-black leading-15">{{ titulo }}</h1>
                <div class="py-5">
                    <a :href="redirect" class="btn bg-black text-white">{{ progress ? 'CONTINUAR!' : 'COMEÇAR' }}</a>
                </div>
            </div>
        </div>
        <div class="w-full lg:w-1/2">
            <img class="w-full h-auto object-contain" :src="imgbanner" :alt="alt">
        </div>
    </div>
    <div class="lg:hidden relative w-full max-w-full">
        <div class="w-full h-auto relative">
            <img class="w-full h-auto object-contain" :src="imgbanner" :alt="alt" />
            <div class="absolute inset-0 bg-black opacity-50 z-10"></div>
        </div>

        <div class="absolute inset-0 flex flex-col justify-center py-10 px-5 z-10">
            <h1 class="text-3xl sm:text-5xl font-black leading-[1.15] text-white">{{ titulo }}</h1>
            <div class="py-5">
                <a :href="redirect" class="btn bg-white text-black">
                    {{ progress ? 'CONTINUAR!' : 'COMEÇAR' }}
                </a>
            </div>
        </div>
    </div>

</template>
