<script lang="ts">
    export let label: string = '';
    export let value: string = '';
</script>

<label data-label-text={label}>
    <div class="pre"><slot name="pre"/></div>
    <input type="text" on:input on:keyup {value}>
    <div class="post"><slot name="post"/></div>
</label>

<style>
    label {
        margin: .6em 0;
        display: grid;
        grid-template-columns: auto 1fr auto;
        grid-template-rows: auto var(--size);
        grid-template-areas: 
            "label label label"
            "pre input post";
    }

    label:last-child {
        margin-bottom: 0;
    }

    label::before {
        grid-area: label;
        content: attr(data-label-text);
        display: block;
        text-transform: uppercase;
        font-size: 0.9em;
        opacity: 0.75;
    }

    .pre {
        grid-area: pre;
    }
    .pre:not(:empty) {
        margin-right: .3em;
    }
    .post {
        grid-area: post;
    }
    .post:not(:empty) {
        margin-left: .3em;
    }

    input {
        grid-area: input;
        background-color: #313131;
        color: inherit;
        border: 0 none;
        border-bottom: 1px solid #595959;
        margin: 0;
    }
</style>