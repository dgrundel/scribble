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
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;

        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: 2fr 1fr;
    }

    .editable {
        outline: none;
        min-height: 1em;
        padding: .75em;
    }
</style>