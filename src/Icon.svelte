<script lang="ts">
    import type { SvelteComponent } from "svelte";

    export let icon: typeof SvelteComponent;
    export let color: string = undefined;
    export let size: number = undefined;
    export let strokeWidth: number = 2;

    const props = {
        color,
        size,
        strokeWidth,
    };
</script>

<svelte:component this={icon} {...props} />
