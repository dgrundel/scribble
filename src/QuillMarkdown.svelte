<script lang="ts">
    import { beforeUpdate, onMount } from 'svelte';
    import Quill from "quill";
    import placeholders from './placeholders.json';
    import { htmlToMarkdown, markdownToHtml } from './markdown';

    export let markdown: string | undefined = undefined;
    export let onChange: (markdown: string) => void = () => {};
    
    let md;
    let quill;
    let element;

    onMount(() => { 
        // select a random placeholder
        const placeholder = placeholders[ Math.floor(Math.random() * placeholders.length) ];

        md = markdown || '';

        quill = new Quill(element, {
            modules: {
                toolbar: '.layout-toolbar',
            },
            placeholder,
            theme: "snow"
        });

        quill.clipboard.dangerouslyPasteHTML(markdownToHtml(md));

        // add listener for change events
        quill.on('text-change', (delta, oldDelta, source) => {
            if (source !== 'user') {
                return;
            }

            const elem = quill.container.querySelector('.ql-editor');
            md = htmlToMarkdown(elem.innerHTML);
            onChange(md);
        });
    });

    beforeUpdate(() => {
        // console.log('beforeUpdate', { markdown, md, eq: markdown === md });
        if (markdown !== md) {
            md = markdown;
            quill && quill.clipboard.dangerouslyPasteHTML(markdownToHtml(md));
        }
    });
</script>

<div bind:this={element}></div>
