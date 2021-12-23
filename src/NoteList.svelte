<script lang="ts">
import List from "./List.svelte";
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

<List items={listItems}/>