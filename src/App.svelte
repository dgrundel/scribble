<script lang="ts">
    import Drawer from "./Drawer.svelte";
    import Editor from "./Editor.svelte";
    import Toolbar from "./Toolbar.svelte";

    let showMenu = false;

</script>

<main>
    <Drawer open={showMenu} close={() => showMenu = false}/>
    <Toolbar openMenu={() => showMenu = true}/>
    <Editor/>
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
