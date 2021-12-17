<script lang="ts">
    import Drawer from "./Drawer.svelte";
    import Editor from "./Editor.svelte";
    import Spinner from "./Spinner.svelte";
    import Toolbar from "./Toolbar.svelte";

    let ready = false;
    let drawerOpen = false;
    let content: string;

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
            setContent={c => content = c}
        />
        <Toolbar openMenu={() => drawerOpen = true}/>
        <Editor content={content}/>
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
