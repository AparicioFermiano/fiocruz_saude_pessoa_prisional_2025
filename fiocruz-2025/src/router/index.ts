import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/modulo1',
            name: 'M1-Capa',
            component: () => import('@/views/Modulo1/Capa.vue'),
        },
        {
            path: '/modulo1/minicurriculo-do-autor',
            name: 'M1-Minicurriculo',
            component: () => import('@/views/Modulo1/Minicurriculo.vue'),
        },
        {
            path: '/modulo1/apresentacao-da-unidade',
            name: 'M1-ApresentacaoUnidade',
            component: () => import('@/views/Modulo1/ApresentacaoUnidade.vue'),
        },
        {
            path: '/modulo1/unidade-1-estrutura-e-sistema-prisional',
            name: 'M1-ApresentacaoUnidade',
            component: () => import('@/views/Modulo1/estruturaSistemaPrisional.vue'),
        },
    ],
})

export default router
