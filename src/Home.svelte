<script lang="ts">
    import Layout from "./Layout.svelte";
    import ListItem from "./ListItem.svelte";
    import FileText from "tabler-icons-svelte/icons/FileText.svelte";
    import Plus from "tabler-icons-svelte/icons/Plus.svelte";
    import { goToPage } from "./router";
import NoteListItem from "./NoteListItem.svelte";

    export let openMenu: () => void;
</script>

<Layout {openMenu}>
    <svelte:fragment slot="content">
        <h1 class="pad">Hello there!</h1>
        <ListItem icon={Plus} onClick={() => goToPage('editor')}>
            Create New
        </ListItem>

        <h2 class="pad">Recent Items</h2>
        <NoteListItem icon={FileText} onClick={() => goToPage('editor')}>
            Foo
        </NoteListItem>
        <NoteListItem icon={FileText} onClick={() => goToPage('editor')}>
            Bar
        </NoteListItem>
        <NoteListItem icon={FileText} onClick={() => goToPage('editor')}>
            Baz
        </NoteListItem>
    </svelte:fragment>
</Layout>

<style>
    .pad {
        padding: 0 var(--padding);
    }
</style>