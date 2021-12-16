<script lang="ts">
    import Drawer from "./Drawer.svelte";
    import Editor from "./Editor.svelte";
    import Toolbar from "./Toolbar.svelte";

    let drawerOpen = false;
    let content: string;
</script>

<main>
    <Drawer 
        isOpen={drawerOpen}
        close={() => drawerOpen = false}
        setContent={c => content = c}
    />
    <Toolbar openMenu={() => drawerOpen = true}/>
    <Editor content={content}/>
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
