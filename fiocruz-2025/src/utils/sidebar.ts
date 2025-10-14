import { ref } from 'vue'

export const sidebarOpen = ref(true)

export function toggleSidebar() {
    sidebarOpen.value = !sidebarOpen.value
}

export function openSidebar() {
    sidebarOpen.value = true
}

export function closeSidebar() {
    sidebarOpen.value = false
}
