<script lang="ts">
    import Tag from "tabler-icons-svelte/icons/Tag.svelte";
    import Check from "tabler-icons-svelte/icons/Check.svelte";
    import Layout from "./Layout.svelte";
    import Icon from "./Icon.svelte";
    import {  onMount } from 'svelte'
    import Quill from "quill";
    import Flyout from "./Flyout.svelte";
    import TextInput from "./TextInput.svelte";

    export let openMenu: () => void;
    export let content: string = '';

    let tags: string[] = [];
    
    // icon overrides
    var icons = Quill.import('ui/icons');
    icons['header']['1'] = 'H1';
    icons['header']['2'] = 'H2';
    icons['header']['3'] = 'H3';
    icons['header']['4'] = 'H4';
    icons['header']['5'] = 'H5';

    const placeholders = [
        "What's on your mind?",
        "What do you want to accomplish today?",
        "What process can you fix or improve?",
        "What do you need help with?",
        "What's your top priority right now?",
        "What could you have done better in the last week?",
        "What inspires you?",
        "What is the most meaningful part of your life?",
        "What's holding you back?",
        "If you were famous, what would you be famous for?",
        "When is the last time you were out of your comfort zone?",
        "Who do you admire?",
        "What's something you're really good at?",
        "What is your proudest moment?",
    ];

    let quill;
    onMount(() => { 
        let container = document.getElementById('quill');
        quill = new Quill(container, {
            modules: {
                toolbar: '.layout-toolbar',
            },
            placeholder: placeholders[Math.floor(Math.random() * placeholders.length)],
            theme: "snow"
        });
    })

    $: if (quill && content) {
        quill.insertText(0, content);
    }

    let tagButtonActive = false;
    let newTag = '';
    
    const addTagFromInput = () => {
        tags = [...tags, newTag];
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
</script>

<Layout {openMenu}>
    <svelte:fragment slot="toolbar">
        <span class="divider"></span>

        <Flyout onShow={() => tagButtonActive = true} onHide={() => tagButtonActive = false}>
            <svelte:fragment slot="target">
                <button class={tagButtonActive ? 'active' : ''}><Icon icon={Tag}/></button>
            </svelte:fragment>
            <svelte:fragment slot="content">
                {#each tags as tag}
                    <label>
                        <input type="checkbox" checked> {tag}
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
        <div id="quill"></div>
    </svelte:fragment>
</Layout>
