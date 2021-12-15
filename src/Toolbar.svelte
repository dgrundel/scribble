<script lang="ts">
export let openMenu: () => void;
</script>

<div class="toolbar">

    <button class="tool" style="background-color: transparent" on:click={openMenu}>&bull;&bull;&bull;</button>
    
    <span class="divider"></span>

    <button class="tool">B</button>
    <button class="tool">I</button>
    <button class="tool">U</button>

    <span class="divider"></span>
    
    <button class="tool">&lcub; &rcub;</button>
    <button class="tool">&gt;</button>
    
    <span class="divider"></span>

    <button class="tool">H1</button>
    <button class="tool">H2</button>
    <button class="tool">H3</button>
    <button class="tool">H4</button>
    <button class="tool">H5</button>
</div>

<style>
    .toolbar {
        background-color: #2d2d2d;
        height: 2em;
        line-height: 2em;
        padding: .3em;
        display: flex;
        gap: 0.25em;
        overflow-x: auto;
    }

    .divider {
        margin: .2em;
        border-left: 1px solid;
        opacity: 0.15;
    }

    .tool {
        border: 0 none;
        border-radius: .2em;
        margin: 0;
        padding: 0 .3em;

        line-height: 2em;
        height: 2em;
        min-width: 2em;

        overflow: hidden;
        text-align: center;

        background-color: #444444;
        color: rgb(211, 211, 211);
    }
</style>