import { openDB } from 'idb'
import type { DBSchema, IDBPDatabase } from 'idb'

export interface ChapterRecord {
    id: string
    module: number
    chapter: number
    completed: boolean
    progressPercent: number
    timeWatched: number
    updatedAt: number
}

interface CursoDB extends DBSchema {
    chapters: {
        key: string
        value: ChapterRecord
        indexes: { 'by-module': number }
    }
}

let dbPromise: Promise<IDBPDatabase<CursoDB>>

export function getDB() {
    if (!dbPromise) {
        dbPromise = openDB<CursoDB>('cursoDB', 1, {
            upgrade(db) {
                const store = db.createObjectStore('chapters', { keyPath: 'id' })
                store.createIndex('by-module', 'module')
            },
        })
    }
    return dbPromise
}
