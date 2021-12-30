<script lang="ts">
    import Layout from "./Layout.svelte";
    import ListItem from "./ListItem.svelte";
    import FileText from "tabler-icons-svelte/icons/FileText.svelte";
    import Files from "tabler-icons-svelte/icons/Files.svelte";
    import Plus from "tabler-icons-svelte/icons/Plus.svelte";
    import { goToPage } from "./router";
    import NoteListItem from "./NoteListItem.svelte";
    import { createNote, getNoteStore, Note } from "./Note";
    import Spinner from "./Spinner.svelte";

    export let openMenu: () => void;

    let recents: Note[] = [];
    let recentsLoaded = false;

    getNoteStore().getNotes({ sort: { col: 'updated', dir: 'desc' }, limit: 5 })
        .then(notes => recents = notes)
        .then(() => recentsLoaded = true);
</script>

<Layout {openMenu}>
    <svelte:fragment slot="content">
        <h1 class="pad">Hello there!</h1>

        <h2 class="pad">Quick Actions</h2>
        <ListItem icon={Plus} onClick={() => goToPage('editor', { note: createNote() })}>
            Create new note
        </ListItem>
        <ListItem icon={Files} onClick={() => goToPage('noteList')}>
            See all notes
        </ListItem>

        <h2 class="pad">Recent Items</h2>
        {#if (recentsLoaded)}
            {#each recents as note}
                <NoteListItem icon={FileText} on:click={() => goToPage('editor', { note })}>
                    {note.title}
                </NoteListItem>
            {/each}
        {:else}
            <Spinner/>
        {/if}
        
    </svelte:fragment>
</Layout>

<style>
    h1 {
        padding: 0 var(--padding);
    }

    h2 {
        text-transform: uppercase;
        font-size: .9em;
        padding: var(--padding) var(--padding) 0;
    }
</style>