<script lang="ts">
    import type { SvelteComponent } from "svelte";

    export let icon: typeof SvelteComponent;
    export let strokeWidth: number = 2;

    const props = {
        strokeWidth,
    };
</script>

<svelte:component this={icon} {...props} />
