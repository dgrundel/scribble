<script lang="ts">
    import Layout from "./Layout.svelte";
    import ListItem from "./ListItem.svelte";
    import FileText from "tabler-icons-svelte/icons/FileText.svelte";
    import Plus from "tabler-icons-svelte/icons/Plus.svelte";
    import { goToPage } from "./router";
    import NoteListItem from "./NoteListItem.svelte";
    import SwipeActionRow from "./SwipeActionRow.svelte";
    import Icon from "./Icon.svelte";

    export let openMenu: () => void;
</script>

<Layout {openMenu}>
    <svelte:fragment slot="content">
        <h1 class="pad">Hello there!</h1>
        <ListItem icon={Plus} onClick={() => goToPage('editor')}>
            Create New
        </ListItem>

        <h2 class="pad">Recent Items</h2>
        <NoteListItem icon={FileText} on:click={() => goToPage('editor', { content: 'foo' })}>
            Foo
        </NoteListItem>
        <NoteListItem icon={FileText} on:click={() => goToPage('editor', { content: 'bar' })}>
            Bar
        </NoteListItem>
        <NoteListItem icon={FileText} on:click={() => goToPage('editor', { content: 'baz' })}>
            Baz
        </NoteListItem>

        <h2 class="pad">Test</h2>
        <SwipeActionRow>
            <svelte:fragment slot="left">
                hello left!
                <button><Icon icon={FileText}/></button>
            </svelte:fragment>

            hello main!
            
            <svelte:fragment slot="right">
                hello right!
                <button><Icon icon={FileText}/></button>
                <button><Icon icon={FileText}/></button>
                <button><Icon icon={FileText}/></button>
                <button><Icon icon={FileText}/></button>
                <button><Icon icon={FileText}/></button>
            </svelte:fragment>
        </SwipeActionRow>
    </svelte:fragment>
</Layout>

<style>
    .pad {
        padding: 0 var(--padding);
    }
</style>