<script lang="ts">
    import Editor from "./Editor.svelte";
import Toolbar from "./Toolbar.svelte";
</script>

<main>
    <Toolbar/>
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
