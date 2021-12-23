<script lang="ts">
import Layout from "./Layout.svelte";
import List from "./List.svelte";

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
    let listItems = notes.map(note => ({
        label: note.title,
    }));
</script>

<Layout {openMenu}>
    <svelte:fragment slot="content">
        <List items={listItems}/>
    </svelte:fragment>
</Layout>
