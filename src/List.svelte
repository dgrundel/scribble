<script lang="ts">
    interface ListItem {
        label: string;
        badge?: string;
        onClick?: () => void;
    }

    export let items: ListItem[] = [];
</script>

<ul>
    {#each items as item}
        <li class={item.onClick ? 'clickable' : ''} on:click={item.onClick}>
            {#if item.badge}
                <span class="badge">{item.badge}</span>
            {/if}
            {item.label}
        </li>
    {/each}
</ul>

<style>
    ul, li {
        margin: 0;
        padding: 0;
        list-style-type: none;
    }

    li {
        padding: 1rem;
        border-bottom: 1px solid rgba(255,255,255,0.2);
    }

    .clickable {
        cursor: pointer;
    }

    .badge {
        background-color: rgba(255, 238, 100, 0.7);
        color: #333;
        padding: .1em .3em;
        border-radius: .3em;
        float: right;
    }
</style>