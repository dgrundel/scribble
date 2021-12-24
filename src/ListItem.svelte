<script lang="ts">
    export let badge: string = '';
    export let onClick: (() => void) | undefined = undefined;
</script>

<div class={onClick ? 'clickable' : ''} on:click={onClick}>
    {#if badge}
        <span class="badge">{badge}</span>
    {/if}
    <slot/>
</div>

<style>
    div {
        padding: 1rem;
        border-bottom: 1px solid rgba(255,255,255,0.2);
    }

    .clickable {
        cursor: pointer;
    }

    .badge {
        background-color: rgba(100, 255, 255, 0.7);
        color: #000;
        padding: .1em .3em;
        border-radius: .3em;
        float: right;
    }
</style>