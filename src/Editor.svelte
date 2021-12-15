<script>
    let innerHTML;
</script>

<div class="frame">
    <div class="editable" contenteditable bind:innerHTML>
        Hello, world!
    </div>
    
    <pre>{innerHTML}</pre>    
</div>


<style>
    .frame {
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: 2fr 1fr;
    }

    .editable {
        outline: none;
        min-height: 1em;
        padding: .75em;
        overflow: auto;
    }
</style>