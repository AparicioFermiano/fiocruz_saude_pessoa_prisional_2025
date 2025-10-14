import { getDB } from '@/utils/indexDBcache'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface SaveProgressParams {
    progressPercent: number
    timeWatched?: number
}

function makeId(module: number, chapter: number) {
    return `m${module}-c${chapter}`
}

export async function saveChapterProgress(
    module: number,
    chapter: number,
    { progressPercent, timeWatched = 0 }: SaveProgressParams
) {
    const db = await getDB()
    const id = makeId(module, chapter)
    const completed = progressPercent >= 100

    const record = {
        id,
        module,
        chapter,
        name,
        completed,
        progressPercent: Math.min(100, Math.max(0, Math.round(progressPercent))),
        timeWatched,
        updatedAt: Date.now(),
    }

    await db.put('chapters', record)
    return record
}

export async function getChapter(module: number, chapter: number) {
    const db = await getDB()
    return db.get('chapters', makeId(module, chapter))
}

export async function getAllChapters() {
    const db = await getDB()
    return db.getAll('chapters')
}

export async function getChaptersByModule(moduleNumber: number) {
    const allChapters = await getAllChapters()
    return allChapters.filter(c => c.module === moduleNumber)
}

export async function getModuleChapters(module: number) {
    const db = await getDB()
    return db.getAllFromIndex('chapters', 'by-module', module)
}

export async function getModuleProgress(module: number, totalChapters = 6) {
    const chapters = await getModuleChapters(module)
    if (!chapters.length)
        return { module, percent: 0, inProgress: false, chapters: [] }

    const sum = chapters.reduce((acc, c) => acc + c.progressPercent, 0)
    const percent = Math.round(sum / totalChapters)
    const inProgress = percent > 0 && percent < 100
    return { module, percent, inProgress, chapters }
}

export async function getCourseProgress(totalModules = 6, chaptersPerModule = 6) {
    const results = []
    for (let m = 1; m <= totalModules; m++) {
        results.push(await getModuleProgress(m, chaptersPerModule))
    }
    const sum = results.reduce((acc, mod) => acc + mod.percent, 0)
    const percent = Math.round(sum / totalModules)
    return { percent, modules: results }
}

export async function clearAllProgress() {
    const db = await getDB()
    await db.clear('chapters')
}

export const useProgressoStore = defineStore('progresso', () => {
    const progresso = ref<Record<string, number>>({})

    async function carregarDoCache() {
        const chapters = await getAllChapters()
        progresso.value = {}
        for (const ch of chapters) {
            progresso.value[ch.id] = ch.progressPercent
        }
    }

    function setProgresso(id: string, percent: number) {
        if (!progresso.value[id] || percent > progresso.value[id]) {
            progresso.value[id] = Math.min(100, percent)
        }
    }

    return { progresso, setProgresso, carregarDoCache }
})
