import { ref, reactive } from 'vue'
import debounce from 'lodash/debounce'
import * as service from '@/utils/progressService'

export function useProgress() {
    const course = reactive({
        percent: 0,
        modules: [] as Awaited<ReturnType<typeof service.getModuleProgress>>[],
    })

    async function loadAll() {
        const data = await service.getCourseProgress()
        course.percent = data.percent
        course.modules = data.modules
    }

    const saveChapter =
        async (module: number, chapter: number, progressPercent: number) => {
            await service.saveChapterProgress(module, chapter, { progressPercent })
            const updatedModule = await service.getModuleProgress(module)
            const index = course.modules.findIndex((m) => m.module === module)
            if (index >= 0) course.modules[index] = updatedModule
            else course.modules.push(updatedModule)

            const overall = await service.getCourseProgress()
            course.percent = overall.percent
        }

    return { course, loadAll, saveChapter }
}
