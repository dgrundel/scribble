<script lang="ts">
    import Tag from "tabler-icons-svelte/icons/Tag.svelte";
    import Check from "tabler-icons-svelte/icons/Check.svelte";
    import Icon from "./Icon.svelte";
    import Flyout from "./Flyout.svelte";
    import TextInput from "./TextInput.svelte";
    import { getNoteStore } from "./Note";
    import Spinner from "./Spinner.svelte";
    
    export let selected: Set<string>;
    export let onChange: (tags: string[]) => void;

    let isFlyoutActive = false;
    let newTag = '';
    let loaded = false;
    let all: Set<string>;

    getNoteStore().getTags()
        .then(a => all = new Set([
            ...a,
            ...selected,
        ]))
        .then(() => loaded = true);

    const createTag = () => {
        all.add(newTag);
        selected.add(newTag);
        onChange([...selected]);
        newTag = '';
    };

    const onTagInput = (e: InputEvent) => {
        const t = e.target as HTMLInputElement;
        newTag = t.value;
    };

    const onTagKeyup = (e: KeyboardEvent) => {
        if (e.key === 'Enter' || e.keyCode === 13) {
            createTag();
        }
    };

    const onTagCheckboxChange = (tag: string, e: Event) => {
        const target = e.target as HTMLInputElement;
        if (target.checked) {
            selected.add(tag);
        } else {
            selected.delete(tag);
        }
        onChange([...selected]);
    };
</script>

<Flyout onShow={() => isFlyoutActive = true} onHide={() => isFlyoutActive = false}>
    <svelte:fragment slot="target">
        <button class={isFlyoutActive ? 'active' : ''}><Icon icon={Tag}/></button>
    </svelte:fragment>
    <svelte:fragment slot="content">
        {#if loaded}
            {#each [...selected] as tag}
                <label>
                    <input type="checkbox" checked on:change={e => onTagCheckboxChange(tag, e)}> {tag}
                </label>
            {/each}
            {#each [...all] as tag}
                {#if !selected.has(tag)}
                    <label>
                        <input type="checkbox" on:change={e => onTagCheckboxChange(tag, e)}> {tag}
                    </label>
                {/if}
            {/each}
        {:else}
            <Spinner text="Loading tags..."/>
        {/if}
                        
        <TextInput label="New Tag" value={newTag} on:input={onTagInput} on:keyup={onTagKeyup}>
            <svelte:fragment slot="post">
                <button on:click={createTag}><Icon icon={Check}/></button>
            </svelte:fragment>
        </TextInput>
    </svelte:fragment>
</Flyout>
