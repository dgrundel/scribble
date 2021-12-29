<script lang="ts">
    import Tag from "tabler-icons-svelte/icons/Tag.svelte";
    import Check from "tabler-icons-svelte/icons/Check.svelte";
    import Star from "tabler-icons-svelte/icons/Star.svelte";
    import Layout from "./Layout.svelte";
    import Icon from "./Icon.svelte";
    import QuillMarkdown from "./QuillMarkdown.svelte";
    import Quill from "quill";
    import Flyout from "./Flyout.svelte";
    import TextInput from "./TextInput.svelte";
    import { getNoteStore, Note } from "./Note";
    
    // toolbar icon overrides
    var icons = Quill.import('ui/icons');
    icons['header']['1'] = 'H1';
    icons['header']['2'] = 'H2';
    icons['header']['3'] = 'H3';
    icons['header']['4'] = 'H4';
    icons['header']['5'] = 'H5';

    export let openMenu: () => void;
    export let note: Note;

    const save = () => {
        getNoteStore().saveNote(note);
    };

    const onMarkdownChange = (md: string) => {
        note.body = md;
        save();
    };

    const toggleStar = () => {
        note.starred = !note.starred;
        save();
    };

    let showTagFlyout = false;
    let newTag = '';
    let otherTags: string[] = [];
    
    $: {
        const selected = new Set(note.tags || []);
        getNoteStore().getTags().then(all => {
            otherTags = all.filter(t => !selected.has(t));
        });
    }

    const createTag = () => {
        const set = new Set(note.tags || []);
        set.add(newTag);
        note.tags = [...set];
        save();
        
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
        const set = new Set(note.tags || []);
        if (target.checked) {
            set.add(tag);
        } else {
            set.delete(tag);
        }
        note.tags = [...set];
        save();
    };
</script>

<Layout {openMenu}>
    <svelte:fragment slot="toolbar">
        <span class="divider"></span>

        <button class={note.starred ? 'active filled-star' : ''} on:click={toggleStar}><Icon icon={Star}/></button>

        <Flyout onShow={() => showTagFlyout = true} onHide={() => showTagFlyout = false}>
            <svelte:fragment slot="target">
                <button class={showTagFlyout ? 'active' : ''}><Icon icon={Tag}/></button>
            </svelte:fragment>
            <svelte:fragment slot="content">
                {#if (note.tags)}
                    {#each note.tags as tag}
                        <label>
                            <input type="checkbox" checked on:change={e => onTagCheckboxChange(tag, e)}> {tag}
                        </label>
                    {/each}
                {/if}
                {#each otherTags as tag}
                    <label>
                        <input type="checkbox" on:change={e => onTagCheckboxChange(tag, e)}> {tag}
                    </label>
                {/each}
                                
                <TextInput label="New Tag" value={newTag} on:input={onTagInput} on:keyup={onTagKeyup}>
                    <svelte:fragment slot="post">
                        <button on:click={createTag}><Icon icon={Check}/></button>
                    </svelte:fragment>
                </TextInput>
            </svelte:fragment>
        </Flyout>
    
        <span class="divider"></span>

        <button class="ql-bold"></button>
        <button class="ql-italic"></button>
        <button class="ql-underline"></button>
        <button class="ql-strike"></button>
    
        <span class="divider"></span>
        
        <button class="ql-code-block"></button>
        <button class="ql-blockquote"></button>
        
        <span class="divider"></span>
        
        <button class="ql-indent" value="+1"></button>
        <button class="ql-indent" value="-1"></button>
        
        <span class="divider"></span>
    
        <button class="ql-list" value="bullet"></button>
        <button class="ql-list" value="ordered"></button>
        
        <span class="divider"></span>
    
        <button class="ql-header" value="1"></button>
        <button class="ql-header" value="2"></button>
        <button class="ql-header" value="3"></button>
        <button class="ql-header" value="4"></button>
        <button class="ql-header" value="5"></button>
    </svelte:fragment>
    <svelte:fragment slot="content">
        <QuillMarkdown markdown={note.body || ''} onChange={onMarkdownChange}/>
    </svelte:fragment>
</Layout>