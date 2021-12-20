<script lang="ts">
    interface Button {
        label: string;
        onClick: () => void;
    }

    export let buttons: Button[] = [];
</script>

<div class="panel">
    <div class="panel-toolbar">
        {#each buttons as button}
            <button on:click={button.onClick}>{button.label}</button>
        {/each}
    </div>
    <div class="panel-content">
        <slot name="content"/>
    </div>
</div>

<style>
    .panel {
        --size: 2.6em;
        --pad: .6em;
        --spacing: calc(var(--pad) / 2);
        --radius: var(--spacing);

        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: auto 1fr;
    }

    .panel-toolbar {
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

    .panel-toolbar:hover {
        scrollbar-width: thin;
    }

    .panel-toolbar button {
        border: 0 none;
        border-radius: var(--radius);
        margin: 0;
        padding: 0 var(--pad);

        line-height: var(--size);
        height: var(--size);
        min-width: var(--size);
        flex-shrink: 0;
        inline-size: max-content;
        text-align: center;

        background-color: #444444;
        color: rgb(211, 211, 211);
        cursor: pointer;
    }

    .panel-toolbar button:hover {
        background-color: #505050;
    }
</style>