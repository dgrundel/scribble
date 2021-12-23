<script lang="ts">
    export let openMenu: () => void;
</script>

<div class="layout">
    <div class="layout-toolbar">
        <button style="background-color: transparent" on:click={openMenu}>&bull;&bull;&bull;</button>
        <slot name="toolbar"/>
    </div>
    <div class="layout-content">
        <slot name="content"/>
    </div>
</div>

<style>
    .layout {
        --size: 2.6em;
        --pad: .6em;
        --spacing: calc(var(--pad) / 2);
        --radius: var(--spacing);

        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: auto 1fr;
    }

    .layout-toolbar {
        background-color: #2d2d2d;
        height: var(--size);
        line-height: var(--size);
        padding: var(--spacing);
        display: flex;
        gap: var(--spacing);
        overflow-x: auto;
        overflow-y: hidden;
        scrollbar-width: none;
    }

    .layout-toolbar:hover {
        scrollbar-width: thin;
    }
</style>