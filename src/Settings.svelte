<script lang="ts">
    import debounce from 'lodash.debounce';
    import Layout from './Layout.svelte';
    import TextInput from './TextInput.svelte';

    export let openMenu: () => void;

    let dropboxApiKey = localStorage.getItem('dropboxApiKey');

    const updateDropboxApiKey = debounce(() => {
        console.log('updating api key', dropboxApiKey);
        localStorage.setItem('dropboxApiKey', dropboxApiKey);
    }, 500);

    const onUpdate = (e: InputEvent) => {
        const t = e.target as HTMLInputElement;
        dropboxApiKey = t.value;
        updateDropboxApiKey();
    };
</script>

<Layout {openMenu}>
    <svelte:fragment slot="content">
        <div class="pad">
            <TextInput label="Dropbox API Key" value={dropboxApiKey} on:input={onUpdate}/>
        </div>
    </svelte:fragment>
</Layout>

<style>
    .pad {
        padding: var(--padding);
    }
</style>