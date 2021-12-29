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

    let tags: { [name: string]: boolean } = note.tags 
        ? note.tags.reduce((map, t) => {
            map[t] = true;
            return map;
        }, {})
        : {};

    getNoteStore().getTags()
        .then(all => all
            .filter(t => !tags.hasOwnProperty(t))
            .forEach(t => tags[t] = false));

    // const updateBodyFromHtml = throttle((html) => {
    //     const md = htmlToMd(html);
    //     note.body = md;

    //     save();
    // }, SAVE_THROTTLE, {
    //     leading: true,
    //     trailing: false,
    // });

    let tagButtonActive = false;
    let newTag = '';

    const updateNoteTags = () => {
        note.tags = Object.keys(tags).filter(t => tags[t]);
        save();
    }

    const addTag = (t: string) => {
        tags[t] = true;
        updateNoteTags();
    };

    const removeTag = (t: string) => {
        tags[t] = false;
        updateNoteTags();
    };
    
    const addTagFromInput = () => {
        addTag(newTag);
        newTag = '';
    };

    const onTagInput = (e: InputEvent) => {
        const t = e.target as HTMLInputElement;
        newTag = t.value;
    };

    const onTagKeyup = (e: KeyboardEvent) => {
        if (e.key === 'Enter' || e.keyCode === 13) {
            addTagFromInput();
        }
    };

    const onTagCheckboxChange = (tag: string, e: Event) => {
        const target = e.target as HTMLInputElement;
        target.checked ? addTag(tag) : removeTag(tag);
    };

    const toggleStar = () => {
        note.starred = !note.starred;
        save();
    };
</script>

<Layout {openMenu}>
    <svelte:fragment slot="toolbar">
        <span class="divider"></span>

        <button class={note.starred ? 'active filled-star' : ''} on:click={toggleStar}><Icon icon={Star}/></button>
        <Flyout onShow={() => tagButtonActive = true} onHide={() => tagButtonActive = false}>
            <svelte:fragment slot="target">
                <button class={tagButtonActive ? 'active' : ''}><Icon icon={Tag}/></button>
            </svelte:fragment>
            <svelte:fragment slot="content">
                {#each Object.keys(tags) as tag}
                    <label>
                        <input type="checkbox" checked={tags[tag]} on:change={e => onTagCheckboxChange(tag, e)}> {tag}
                    </label>
                {/each}
                                
                <TextInput label="New Tag" value={newTag} on:input={onTagInput} on:keyup={onTagKeyup}>
                    <svelte:fragment slot="post">
                        <button on:click={addTagFromInput}><Icon icon={Check}/></button>
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