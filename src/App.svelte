<script lang="ts">
    import type { SvelteComponent } from "svelte";
    import Drawer from "./Drawer.svelte";
    import Home from "./Home.svelte";
    import { onPageChange } from "./router";
    import Spinner from "./Spinner.svelte";

    let page: typeof SvelteComponent = Home;
    let props: { [k: string]: any } = { };
    let ready = false;
    let drawerOpen = false;

    onPageChange((component, componentProps) => {
        drawerOpen = false;
        page = component;
        props = componentProps;
    });

    const isCordova = () => !window.location.protocol.match(/^http[s]?/);

    if (isCordova()) {
        document.addEventListener("deviceready", () => ready = true, false);
    } else {
        ready = true;
    }
</script>

<main>
    {#if ready}
        <Drawer 
            isOpen={drawerOpen}
            close={() => drawerOpen = false}
        />
        
        <svelte:component this={page} {...props} openMenu={() => drawerOpen = true} />
    {:else}
        <Spinner/>
    {/if}
</main>

<style>
    main {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;

        display: grid;
        grid-template-rows: auto 1fr;
        grid-template-columns: 1fr;
    }
</style>
