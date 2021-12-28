<script lang="ts">
    import Layout from "./Layout.svelte";
    import ListItem from "./ListItem.svelte";
    import FileText from "tabler-icons-svelte/icons/FileText.svelte";
    import Plus from "tabler-icons-svelte/icons/Plus.svelte";
    import { goToPage } from "./router";
    import NoteListItem from "./NoteListItem.svelte";
    import SwipeActionRow from "./SwipeActionRow.svelte";
    import Icon from "./Icon.svelte";
    import { createNote, getNoteStore, Note } from "./Note";

    export let openMenu: () => void;

    let recents: Note[] = [];
    getNoteStore().getNotes().then(notes => recents = notes);
</script>

<Layout {openMenu}>
    <svelte:fragment slot="content">
        <h1 class="pad">Hello there!</h1>
        <ListItem icon={Plus} onClick={() => goToPage('editor')}>
            Create New
        </ListItem>

        <h2 class="pad">Recent Items</h2>
        {#each recents as note}
            <NoteListItem icon={FileText} on:click={() => goToPage('editor', { note })}>
                {note.title}
            </NoteListItem>
        {/each}
    </svelte:fragment>
</Layout>

<style>
    .pad {
        padding: 0 var(--padding);
    }
</style>