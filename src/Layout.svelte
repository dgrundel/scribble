<script lang="ts">
    import Menu from "tabler-icons-svelte/icons/Menu.svelte";
import Icon from "./Icon.svelte";
    export let openMenu: () => void;
</script>

<div class="layout">
    <div class="layout-toolbar">
        <button style="background-color: transparent" on:click={openMenu}>
            <Icon icon={Menu} strokeWidth={2} />
        </button>
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
        --svg-size: 1.3em;

        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: auto 1fr;

        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
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

    .layout-content {
        overflow: auto;
    }
</style>