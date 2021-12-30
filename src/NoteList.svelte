<script lang="ts">
    import Layout from "./Layout.svelte";
    import Calendar from "tabler-icons-svelte/icons/Calendar.svelte";
    import FileText from "tabler-icons-svelte/icons/FileText.svelte";
    import Signature from "tabler-icons-svelte/icons/Signature.svelte";
    import SortAscending from "tabler-icons-svelte/icons/SortAscending.svelte";
    import SortDescending from "tabler-icons-svelte/icons/SortDescending.svelte";
    import Tag from "tabler-icons-svelte/icons/Tag.svelte";
    import Star from "tabler-icons-svelte/icons/Star.svelte";
    import X from "tabler-icons-svelte/icons/X.svelte";
    import NoteListItem from "./NoteListItem.svelte";
    import { goToPage } from "./router";
    import { getNoteStore, Note, NoteFilters } from "./Note";
    import Spinner from "./Spinner.svelte";
import Icon from "./Icon.svelte";

    const DEFAULT_FILTERS: NoteFilters = {
        sort: { col: 'title' }
    };

    export let openMenu: () => void;
    export let filters: NoteFilters = {};

    let notes: Note[] = [];
    let loaded;

    $: {
        loaded = false;
        filters = {
            ...DEFAULT_FILTERS,
            ...filters,
        };
        getNoteStore().getNotes(filters)
            .then(n => notes = n)
            .then(() => loaded = true);
    }
</script>

<Layout {openMenu}>
    <svelte:fragment slot="toolbar">
        <span class="divider"></span>

        <button aria-label="Starred" class={filters.starred === true ? 'active' : ''} 
            on:click={() => filters.starred = filters.starred === true ? undefined : true }>
            <Icon icon={Star}/>
        </button>

        <span class="divider"></span>

        {#if filters.tags && filters.tags.length}
            <span class="toolbar-text">
                Tags
            </span>

            <button aria-label="Remove tag filter" class="active" on:click={() => filters.tags = undefined } data-prefix={filters.tags.join(', ')}>
                <Icon icon={X}/>
            </button>

            <span class="divider"></span>
        {/if}

        <span class="toolbar-text">Sort</span>

        <button aria-label="Title" class={filters.sort.col === 'title' ? 'active' : ''} on:click={() => filters.sort.col = 'title'}>
            <Icon icon={Signature}/>
        </button>
        <button aria-label="Updated" class={filters.sort.col === 'updated' ? 'active' : ''} on:click={() => filters.sort.col = 'updated'}>
            <Icon icon={Calendar}/>
        </button>

        <span class="divider"></span>

        <button class={filters.sort.dir !== 'desc' ? 'active' : ''} on:click={() => filters.sort.dir = 'asc'}>
            <Icon icon={SortAscending}/>
        </button>
        <button class={filters.sort.dir === 'desc' ? 'active' : ''} on:click={() => filters.sort.dir = 'desc'}>
            <Icon icon={SortDescending}/>
        </button>
    </svelte:fragment>

    <svelte:fragment slot="content">
        {#if loaded}
            {#each notes as note}
                <NoteListItem icon={FileText} on:click={() => goToPage('editor', { note })}>
                    {note.title}
                </NoteListItem>
            {/each}
            {#if notes.length === 0}
                <p class="no-results">No items.</p>
            {/if}
        {:else}
            <Spinner/>
        {/if}
    </svelte:fragment>
</Layout>

<style>
    .no-results {
        text-align: center;
        padding: 0 var(--padding);
        opacity: 0.8;
    }
</style>