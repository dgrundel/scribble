<script lang="ts">
    import CircleDashed from "tabler-icons-svelte/icons/CircleDashed.svelte";
    import Icon from "./Icon.svelte";

    export let fullscreen = false;
</script>

<div class={`spinner ${fullscreen ? 'fullscreen' : ''}`}>
    <i><Icon icon={CircleDashed}/></i>
    Just a moment...
</div>

<style>
    .spinner {
        --icon-size: 24px;
        --svg-size: var(--icon-size);

        display: block;
        text-align: center;
        padding: var(--padding);
    }

    .spinner.fullscreen {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 999999;
        width: 100vw;
        height: 100vh;
        line-height: 100vh;
        padding: 0;
    }

    .spinner i {
        display: inline-block;
        width: var(--icon-size);
        height: var(--icon-size);
        line-height: var(--icon-size);
        animation: spin 1s linear infinite;
        margin: 0 .25em 0 0;
        padding: 0;
        vertical-align: middle;
    }

    @keyframes spin {
        from { transform:rotate(0deg); }
        to { transform:rotate(360deg); }
    }
</style>