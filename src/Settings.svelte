<script lang="ts">
    import debounce from 'lodash.debounce';
    import { goToPage } from './router';

    let dropboxApiKey = localStorage.getItem('dropboxApiKey');

    const updateDropboxApiKey = debounce(() => {
        console.log('updating api key', dropboxApiKey);
        localStorage.setItem('dropboxApiKey', dropboxApiKey);
    }, 500);
</script>

<div class="settings">
    <label>
        Dropbox API Key
        <input type="text" bind:value={dropboxApiKey} on:input={updateDropboxApiKey}>
    </label>

    <button on:click={() => goToPage('editor')}>Done</button>
</div>