import { nanoid } from "nanoid";

export interface Note {
    created: number;
    updated: number;
    title: string;
    id?: string;
    body?: string;
    tags?: string[];
}

export interface NoteStore {
    getNotes: (tag?: string) => Promise<Note[]>;
    getTags: () => Promise<string[]>;
    saveNote: (note: Note) => Promise<Note>;
    deleteNote: (id: string) => Promise<void>;
}

class LocalStorageNoteStore implements NoteStore {
    private getStore(): LocalStorageNoteStore.Store {
        const json = localStorage.getItem(LocalStorageNoteStore.KEY);
        return json ? JSON.parse(json) : {};
    }

    getNotes(tag?: string): Promise<Note[]> {
        return new Promise(resolve => {
            const store = this.getStore();
            const notes = Object.values(store);
            const filtered = tag
                ? notes.filter(n => n.tags && n.tags.includes(tag))
                : notes;
            
            // add artifical delay to simulate network latency
            setTimeout(() => resolve(filtered), Math.floor(Math.random() * 3000));
        });
    }

    getTags(): Promise<string[]> {
        return new Promise(resolve => {
            const store = this.getStore();
            const notes = Object.values(store);
            const tags: Set<string> = notes.reduce((set: Set<string>, note: Note) => {
                if (note.tags) {
                    note.tags.forEach(t => set.add(t));
                }
                return set;
            }, new Set());
            
            // add artifical delay to simulate network latency
            setTimeout(() => resolve([...tags]), Math.floor(Math.random() * 3000));
        });
    }

    saveNote(note: Note): Promise<Note> {
        return new Promise(resolve => {
            const store = this.getStore();
            if (!note.id) {
                note.id = nanoid();
                note.created = Date.now();
            }
            note.updated = Date.now();
            
            store[note.id] = note;

            localStorage.setItem(LocalStorageNoteStore.KEY, JSON.stringify(store));

            // add artifical delay to simulate network latency
            setTimeout(() => resolve(note), Math.floor(Math.random() * 3000));
        });
    }

    deleteNote(id: string): Promise<void> {
        return new Promise(resolve => {
            const store = this.getStore();
            delete store[id];

            localStorage.setItem(LocalStorageNoteStore.KEY, JSON.stringify(store));

            // add artifical delay to simulate network latency
            setTimeout(() => resolve(), Math.floor(Math.random() * 3000));
        });
    }
}

namespace LocalStorageNoteStore {
    export const KEY = 'noteStore';
    export type Store = {
        [noteId: string]: Note
    };
}

export const getStore = () => new LocalStorageNoteStore();