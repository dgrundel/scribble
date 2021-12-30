<script lang="ts">
    import Layout from "./Layout.svelte";
    import FileText from "tabler-icons-svelte/icons/FileText.svelte";
    import NoteListItem from "./NoteListItem.svelte";
    import { goToPage } from "./router";
    import { getNoteStore, Note, NoteFilters } from "./Note";
    import Spinner from "./Spinner.svelte";

    const DEFAULT_FILTERS: NoteFilters = { sort: { col: 'title' } };

    export let openMenu: () => void;
    export let filters: NoteFilters = {};

    let notes: Note[] = [];
    let loaded;

    $: {
        loaded = false;
        getNoteStore().getNotes({ ...DEFAULT_FILTERS, ...filters, })
            .then(n => notes = n)
            .then(() => loaded = true);
    }
</script>

<Layout {openMenu}>
    <svelte:fragment slot="content">
        {#if loaded}
            {#each notes as note}
                <NoteListItem icon={FileText} on:click={() => goToPage('editor', { note })}>
                    {note.title}
                </NoteListItem>
            {/each}
        {:else}
            <Spinner/>
        {/if}
        
    </svelte:fragment>
</Layout>
