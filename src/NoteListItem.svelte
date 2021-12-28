<script lang="ts">
    import type { SvelteComponent } from "svelte";
    import Icon from "./Icon.svelte";
    import FileText from "tabler-icons-svelte/icons/FileText.svelte";
    import SwipeActionRow from "./SwipeActionRow.svelte";
    
    export let icon: (typeof SvelteComponent) | undefined = FileText;
</script>

<SwipeActionRow>
    <div class="note-list-item-main clickable" on:click>
        <span class="note-list-item-icon">
            <Icon {icon}/>
        </span>
        <slot/>
    </div>

    <div slot="right" class="note-list-item-action clickable">
        Delete
    </div>
</SwipeActionRow>

<style>
    .note-list-item-main {
        --svg-size: 1em;
        
        padding: var(--padding);
        border-bottom: 1px solid var(--border-color);
    }
    
    .note-list-item-action {
        padding: var(--padding);
        background-color: #d91212;
    }
    .note-list-item-action:hover {
        color: #000;
    }

    .note-list-item-icon {
        float: left;
        margin-right: var(--padding);
    }
</style>