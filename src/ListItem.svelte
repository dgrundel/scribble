<script lang="ts">
import type { SvelteComponent } from "svelte";
import Icon from "./Icon.svelte";


    export let icon: (typeof SvelteComponent) | undefined = undefined;
    export let badge: string = '';
    export let onClick: (() => void) | undefined = undefined;
</script>

<div class={`list-item ${onClick ? 'clickable' : ''}`} on:click={onClick}>
    {#if badge}
        <span class="list-item-badge">{badge}</span>
    {/if}
    {#if icon}
        <span class="list-item-icon">
            <Icon {icon}/>
        </span>
    {/if}
    <slot/>
</div>

<style>
    .list-item {
        --svg-size: 1em;

        padding: var(--padding);
        border-bottom: 1px solid rgba(255,255,255,0.2);
    }

    .list-item.clickable {
        cursor: pointer;
    }

    .list-item-badge {
        background-color: rgba(100, 255, 255, 0.7);
        color: #000;
        padding: .1em .3em;
        border-radius: .3em;
        float: right;
    }

    .list-item-icon {
        margin-right: 1ex;
    }
</style>