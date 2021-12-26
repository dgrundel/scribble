<script lang="ts">
    import type { SvelteComponent } from "svelte";
    import Icon from "./Icon.svelte";
    import FileText from "tabler-icons-svelte/icons/FileText.svelte";
    import SwipeContainer from "./SwipeContainer.svelte";
    
    export let icon: (typeof SvelteComponent) | undefined = FileText;
    export let onClick: (() => void) | undefined = undefined;

    let showActions = false;

    const onLeftSwipe = () => showActions = true;
    const onRightSwipe = () => showActions = false;
</script>

<div class="note-list-item">
    <div
        class={`${onClick ? 'clickable' : ''}`}
        on:click={onClick}
        style="flex-grow: 1"
    >
        <SwipeContainer onLeft={onLeftSwipe} onRight={onRightSwipe}>
            <div class="pad">
                <span class="note-list-item-icon">
                    <Icon {icon}/>
                </span>
                <slot/>
            </div>
        </SwipeContainer>
    </div>
    {#if showActions}
        <div class="pad red">
            Delete
        </div>    
    {/if}
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
    /* .yellow {
        background-color: #ffff75;
        color: #000;
    } */
    .red {
        background-color: #d91212;
        color: #fff;
    }
</style>