<script lang="ts">
    import Star from "tabler-icons-svelte/icons/Star.svelte";
    import Layout from "./Layout.svelte";
    import Icon from "./Icon.svelte";
    import QuillMarkdown from "./QuillMarkdown.svelte";
    import Quill from "quill";
    import { getNoteStore, Note } from "./Note";
    import TagEditorFlyout from "./TagEditorFlyout.svelte";
    
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

    const onTagsChange = (tags: string[]) => {
        note.tags = tags;
        save();
    };
</script>

<Layout {openMenu}>
    <svelte:fragment slot="toolbar">
        <span class="divider"></span>

        <button class={note.starred ? 'active filled-star' : ''} on:click={toggleStar}><Icon icon={Star}/></button>

        <TagEditorFlyout selected={new Set(note.tags)} onChange={onTagsChange}/>
    
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