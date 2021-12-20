<script lang="ts">
    import debounce from 'lodash.debounce';
import Panel from './Panel.svelte';
    import { goToPage } from './router';

    let dropboxApiKey = localStorage.getItem('dropboxApiKey');

    const updateDropboxApiKey = debounce(() => {
        console.log('updating api key', dropboxApiKey);
        localStorage.setItem('dropboxApiKey', dropboxApiKey);
    }, 500);
</script>

<Panel buttons={[{
    label: 'Back',
    onClick: () => goToPage('editor'),
}]}>
    <svelte:fragment slot="content">
        <label data-text="Dropbox API Key">
            <input type="text" bind:value={dropboxApiKey} on:input={updateDropboxApiKey}>
        </label>
    </svelte:fragment>
</Panel>

<style>
    label {
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: auto auto;
        gap: .3em;
        margin: .6em;
    }
    label::before {
        content: attr(data-text);
        display: block;
    }
    input {
        background-color: #313131;
        color: inherit;
        border: 0 none;
        border-bottom: 1px solid #595959;
    }
</style>