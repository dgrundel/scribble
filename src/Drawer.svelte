<script lang="ts">
    import ListItem from "./ListItem.svelte";
    import Home from "tabler-icons-svelte/icons/Home.svelte";
    import Files from "tabler-icons-svelte/icons/Files.svelte";
    import Plus from "tabler-icons-svelte/icons/Plus.svelte";
    import Star from "tabler-icons-svelte/icons/Star.svelte";
    import Settings from "tabler-icons-svelte/icons/Settings.svelte";
    import Tag from "tabler-icons-svelte/icons/Tag.svelte";
    import X from "tabler-icons-svelte/icons/X.svelte";
    import { goToPage } from "./router";
    import { createNote, getNoteStore } from "./Note";
import Spinner from "./Spinner.svelte";

    export let isOpen: boolean = false;
    export let close: () => void;

    let tagsLoaded = false;
    let tags: string[] = [];
    getNoteStore().getTags()
        .then(t => tags = t)
        .then(() => tagsLoaded = true);

    let overlay;
    const overlayClick = e => {
        if (e.target === overlay) {
            close();
        }
    };
</script>

<div class="overlay {isOpen ? 'open' : ''}" bind:this={overlay} on:click={overlayClick}>
    <div class="drawer">
        <div class="close-button" on:click={close}><X/></div>
        
        <ListItem icon={Home} onClick={() => goToPage('home')}>
            Home
        </ListItem>
        
        <ListItem icon={Plus} onClick={() => goToPage('editor', { note: createNote() })}>
            New
        </ListItem>

        <ListItem
            icon={Files}
            onClick={() => goToPage('noteList')}>
            All
        </ListItem>

        <ListItem
            icon={Star}
            onClick={() => goToPage('noteList', { filters: { starred: true }})}>
            Starred
        </ListItem>

        <div class="section" data-title="Tags">
        {#if tagsLoaded}
            {#each tags as tag}
                <ListItem
                    icon={Tag}
                    onClick={() => goToPage('noteList', { filters: { tags: [tag] }})}>
                    {tag}
                </ListItem>
            {/each}
        {:else}
            <Spinner text="Loading tags..."/>
        {/if}
        </div>

        <ListItem icon={Settings} onClick={() => goToPage('settings')}>
            Settings
        </ListItem>
    </div>
</div>

<style>
    .overlay {
        --transition-duration: 175ms;

        position: fixed;
        top: 0;
        bottom: 0;
        left: -100vw;
        width: 100vw;
        z-index: 9999;
        transition-delay: var(--transition-duration);
        transition-duration: 0;
        transition-property: left;
    }

    .overlay.open {
        left: 0;
        transition-delay: unset;
    }

    .overlay::before {
        content: ' ';
        display: block;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background-color: #000;
        opacity: 0;
        transition-duration: var(--transition-duration);
        transition-property: opacity;
    }

    .overlay.open::before {
        opacity: 0.6;
    }

    .drawer {
        position: absolute;
        top: 0;
        bottom: 0;
        left: -85vw;
        width: 85vw;
        background-color: #282828;
        box-shadow: 0 0 2rem rgba(0,0,0,0.4);
        z-index: 1;
        transition-delay: 0;
        transition-duration: var(--transition-duration);
        transition-property: left;
        transition-timing-function: ease-in-out;
    }

    .open .drawer {
        left: 0;
    }

    .close-button {
        --size: 2rem;
        --gap: .3rem;

        cursor: pointer;
        position: absolute;
        top: var(--gap);
        right: calc(-1 * (var(--size) + var(--gap)));
        width: var(--size);
        height: var(--size);
        line-height: var(--size);
        text-align: center;
        font-size: var(--size);
    }

    .section {
        border-left: var(--padding) solid var(--border-color);
    }

    .section::before {
        display: block;
        content: attr(data-title);
        text-transform: uppercase;
        font-size: 0.85em;
        padding-left: var(--padding);
        /* border-bottom: 1px solid var(--border-color); */
        line-height: 2.2;
    }
</style>