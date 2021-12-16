<script>
    import {  onMount } from 'svelte'
    import Quill from "quill";

    // icon overrides
    var icons = Quill.import('ui/icons');
    icons['header']['1'] = 'H1';
    icons['header']['2'] = 'H2';
    icons['header']['3'] = 'H3';
    icons['header']['4'] = 'H4';
    icons['header']['5'] = 'H5';

    onMount(() => { 
        
        let container = document.getElementById('quill');
        quill = new Quill(container, {
            modules: {
                toolbar: '.toolbar',
            },
            placeholder: "Type something...",
            theme: "snow" // or 'bubble'
        });
    })
</script>

<div class="frame">
    <div id="quill"></div>
</div>

<style>
    .frame {
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: 1fr;
    }
</style>
