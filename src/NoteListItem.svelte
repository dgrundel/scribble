<script lang="ts">
    import type { SvelteComponent } from "svelte";
    import Icon from "./Icon.svelte";
    import FileText from "tabler-icons-svelte/icons/FileText.svelte";
    export let icon: (typeof SvelteComponent) | undefined = FileText;
    export let onClick: (() => void) | undefined = undefined;
</script>

<div class="note-list-item" on:click={onClick}>
    <div 
        class={`pad ${onClick ? 'clickable' : ''}`} 
        on:click={onClick}
        style="flex-grow: 1"
    >
        <span class="note-list-item-icon">
            <Icon {icon}/>
        </span>
        <slot/>
    </div>
    <div class="pad yellow">
        Edit
    </div>
    <div class="pad red">
        Delete
    </div>
</div>

<style>
    .note-list-item {
        --svg-size: 1em;

        display: flex;
        align-content: stretch;

        border-bottom: 1px solid rgba(255,255,255,0.2);
    }

    .note-list-item-icon {
        float: left;
        margin-right: var(--padding);
    }

    .clickable {
        cursor: pointer;
    }
    .clickable:hover {
        opacity: 0.75;
    }

    .pad {
        padding: var(--padding);
    }
    .yellow {
        background-color: #ffff75;
        color: #000;
    }
    .red {
        background-color: #d91212;
        color: #fff;
    }
</style>