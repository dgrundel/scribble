import { nanoid } from "nanoid";

export interface Note {
    created: number;
    updated: number;
    title: string;
    id?: string;
    body?: string;
    tags?: string[];
    starred?: boolean;
}

const NOTE_TITLE_MAX_CHARS = 180;
export const parseNoteTitle = (body?: string): string => {
    const line = body ? body.split('\n', 2)[0] : '';
    // trim leading spaces and `#` chars
    const trimmed = line.replace(/^[\s#]+/, '');

    const shortened = trimmed.length > NOTE_TITLE_MAX_CHARS
        ? trimmed.substring(0, NOTE_TITLE_MAX_CHARS)
        : trimmed;

    const title = shortened.trim();

    return title || 'Untitled';
}

export const createNote = (props?: Partial<Note>): Note => {
    const now = new Date();
    const created = +now;
    const title = now.toLocaleString();
    return {
        created,
        updated: created,
        title,
        ...props,
    };
};

export interface NoteFilters {
    tags?: string[];
    starred?: boolean;
}
export interface NoteStore {
    getNotes: (filters?: NoteFilters) => Promise<Note[]>;
    getTags: () => Promise<string[]>;
    saveNote: (note: Note) => Promise<Note>;
    deleteNote: (id: string) => Promise<void>;
}

class LocalStorageNoteStore implements NoteStore {
    private getStore(): LocalStorageNoteStore.Store {
        const json = localStorage.getItem(LocalStorageNoteStore.KEY);
        return json ? JSON.parse(json) : {};
    }

    getNotes(filters?: NoteFilters): Promise<Note[]> {
        return new Promise(resolve => {
            const store = this.getStore();
            let notes = Object.values(store);
            
            if (filters) {
                if (filters.tags) {
                    notes = notes.filter(n => n.tags && filters.tags.every(t => n.tags.includes(t)));
                }

                if (typeof filters.starred === 'boolean') {
                    notes = notes.filter(n => filters.starred === !!n.starred);
                }
            }
            
            // add artifical delay to simulate network latency
            setTimeout(() => resolve(notes), Math.floor(Math.random() * 3000));
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
            
            // if no id, it's a new note
            if (!note.id) {
                note.id = nanoid();
                note.created = Date.now();
            }

            // update other fields
            note.updated = Date.now();
            note.title = parseNoteTitle(note.body);
            
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

const store = new LocalStorageNoteStore();

export const getNoteStore = (): NoteStore => store;