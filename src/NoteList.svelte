<script lang="ts">
import Layout from "./Layout.svelte";
import ListItem from "./ListItem.svelte";

    export let openMenu: () => void;
    interface Note {
        title: string;
    }
    let notes: Note[] = [
        {
            title: 'Hello',
        },{
            title: 'World',
        },
    ];
</script>

<Layout {openMenu}>
    <svelte:fragment slot="content">
        {#each notes as note}
            <ListItem>
                {note.title}
            </ListItem>
        {/each}
    </svelte:fragment>
</Layout>
