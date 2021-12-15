<script lang="ts">
export let openMenu: () => void;
</script>

<div class="toolbar">

    <button class="tool" style="background-color: transparent" on:click={openMenu}>&bull;&bull;&bull;</button>
    <span class="divider"></span>

    <button class="tool">B</button>
    <button class="tool">I</button>
    <button class="tool">U</button>
    
    <button class="tool">Blah</button>
</div>

<style>
    .toolbar {
        background-color: #2d2d2d;
        height: 2em;
        line-height: 2em;
        padding: .3em;
    }

    .divider {
        margin: 0 .5em;
        border-left: 1px solid;
        opacity: 0.2;
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