<script lang="ts">
export let openMenu: () => void;
</script>

<div class="toolbar">

    <button class="tool" style="background-color: transparent" on:click={openMenu}>&bull;&bull;&bull;</button>
    
    <span class="divider"></span>

    <button class="tool ql-bold"></button>
    <button class="tool ql-italic"></button>
    <button class="tool ql-underline"></button>
    <button class="tool ql-strike"></button>
    <button class="tool">test button</button>

    <span class="divider"></span>
    
    <button class="tool ql-code-block"></button>
    <button class="tool ql-blockquote"></button>
    
    <span class="divider"></span>

    <button class="tool ql-list" value="bullet"></button>
    <button class="tool ql-list" value="ordered"></button>
    
    <span class="divider"></span>

    <button class="tool ql-header" value="1"></button>
    <button class="tool ql-header" value="2"></button>
    <button class="tool ql-header" value="3"></button>
    <button class="tool ql-header" value="4"></button>
    <button class="tool ql-header" value="5"></button>
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
        overflow-y: hidden;
        scrollbar-width: none;
    }

    .toolbar:hover {
        scrollbar-width: auto;
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
        cursor: pointer;
    }
</style>