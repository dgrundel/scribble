import type { SvelteComponent } from "svelte";
import Editor from "./Editor.svelte";
import Settings from "./Settings.svelte";

const pages: { [pageName: string]: typeof SvelteComponent } = {
    editor: Editor,
    settings: Settings,
};

export type PageName = keyof typeof pages;
export type PageProps = { [name: string]: any };
export type PageChangeListener = (component: typeof SvelteComponent, props: PageProps) => void;

const listeners: PageChangeListener[] = [];

export const onPageChange = (listener: PageChangeListener) => {
    listeners.push(listener);
};

export const goToPage = (pageName: PageName, props: PageProps = {}) => {
    if (pages.hasOwnProperty(pageName)) {
        const page = pages[pageName];
        listeners.forEach(l => l(page, props));
    } else {
        throw new Error(`Unknown page name: ${pageName}`);
    }
};