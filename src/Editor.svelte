<script lang="ts">
    import Toolbar from "./Toolbar.svelte";
    import EditorInput from "./EditorInput.svelte";

    export let content: string;
    export let openMenu: () => void;
</script>

<div class="editor">
    <Toolbar {openMenu}/>
    <EditorInput {content}/>
</div>

<style>
    .editor {
        display: grid;
        grid-template-rows: auto 1fr;
        grid-template-columns: 1fr;
    }
</style>