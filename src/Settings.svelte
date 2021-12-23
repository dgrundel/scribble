<script lang="ts">
    import debounce from 'lodash.debounce';
    import Layout from './Layout.svelte';

    export let openMenu: () => void;

    let dropboxApiKey = localStorage.getItem('dropboxApiKey');

    const updateDropboxApiKey = debounce(() => {
        console.log('updating api key', dropboxApiKey);
        localStorage.setItem('dropboxApiKey', dropboxApiKey);
    }, 500);
</script>

<Layout {openMenu}>
    <svelte:fragment slot="content">
        <label data-text="Dropbox API Key">
            <input type="text" bind:value={dropboxApiKey} on:input={updateDropboxApiKey}>
        </label>
    </svelte:fragment>
</Layout>

<style>
    label {
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: auto auto;
        margin: .6em;
    }
    label::before {
        content: attr(data-text);
        display: block;
        text-transform: uppercase;
        font-size: 0.9em;
        opacity: 0.75;
    }
    input {
        background-color: #313131;
        color: inherit;
        border: 0 none;
        border-bottom: 1px solid #595959;
    }
</style>